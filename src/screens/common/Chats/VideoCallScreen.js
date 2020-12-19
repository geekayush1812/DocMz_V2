import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import {SocketContext} from '../../../utils/socketContext';
import {
  RTCView,
  mediaDevices,
  RTCPeerConnection,
  MediaStreamTrack,
  MediaStream,
  RTCSessionDescription,
  RTCIceCandidate,
  registerGlobals,
} from 'react-native-webrtc';
import {useSelector} from 'react-redux';

import InCallManager from 'react-native-incall-manager';
import {Host} from '../../../utils/connection';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const DEFAULT_ICE = {
  // we need to fork react-native-webrtc for relay-only to work.
  //  iceTransportPolicy: "relay",
  iceServers: [
    {
      url: 'stun:stun.l.google.com:19302',
    },
  ],
};
let isFront = true;
const {width, height} = Dimensions.get('screen');
export default function VideoCallScreen({route, navigation}) {
  const {mode, User, type} = route.params;
  const socket = useContext(SocketContext);
  const {userData, isDoctor} = useSelector((state) => state.AuthReducer);

  const [localStreamURL, setLocalStreamURL] = useState({toURL: () => null});
  const [remoteStreamURL, setRemoteStreamURL] = useState({toURL: () => null});

  const [offerDetails, setOfferDetails] = useState({
    offer_received: false,
    offer_answered: false,
    offer: {},
  });
  const [answer_details, setAnswerDetails] = useState({
    answer_recevied: false,
  });
  const pendingCandidates = useRef([]);
  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const peer = useRef(null);
  const Offer = useRef(null);

  let imageSource = require('../../../assets/images/dummy_profile.png');
  if (Array.isArray(User.picture)) {
    if (User.picture.length !== 0)
      imageSource = {
        uri: `${Host}${User.picture[0]
          .replace('public', '')
          .replace('\\\\', '/')}`,
      };
  } else {
    if (User.picture && User.picture !== '')
      imageSource = {
        uri: `${Host}${User.picture
          .replace('public', '')
          .replace('\\\\', '/')}`,
      };
  }
  useEffect(() => {
    // Setup Socket

    // offer received
    // on_offer_received
    // socket.on('call-made', on_Offer_Received);

    // answer received
    // on_Answer_Received
    socket.on('answer-made', on_Answer_Received);

    mediaDevices.enumerateDevices().then((sourceInfos) => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (isFront ? 'front' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: width,
              minHeight: height,
              minFrameRate: 60,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        })
        .then((stream) => {
          console.log(userData.firstName, ' got stream ', stream);
          setLocalStreamURL(stream);
          localStream.current = stream;
          if (mode === 'thatSide') {
            const {offer, fromSocket} = route.params;
            console.log(
              userData.firstName,
              ' called after call-made received with ',
              offer,
              fromSocket,
            );
            on_Offer_Received({offer, fromSocket});
          }
          if (mode === 'thisSide') {
            handleConnect();
          }
        })
        .catch((e) => {
          console.error('Failed to setup stream:', e);
        });
    });
  }, []);

  const setupWebRTC = async () => {
    console.log(userData.firstName, ' setupWebRTC called');
    const pc = new RTCPeerConnection(DEFAULT_ICE);
    pc.oniceconnectionstatechange = on_ICE_Connection_State_Change;
    pc.onaddstream = on_Add_Stream;
    pc.onicecandidate = on_ICE_Candiate;

    console.info(userData.firstName, ' localStream:', localStream.current);
    pc.addStream(localStream.current);
    peer.current = pc;
    // try {
    //   InCallManager.start({media: 'video', ringback: '_DEFAULT_'});
    //   InCallManager.setForceSpeakerphoneOn(true);
    //   InCallManager.setSpeakerphoneOn(true);
    // } catch (err) {
    //   console.log('InApp Caller ---------------------->', err);
    // }
  };

  const handleConnect = async (e) => {
    await setupWebRTC();

    try {
      // Create Offer
      const offer = await peer.current.createOffer();
      console.info(userData.firstName, ' Offer Created:', offer);
      Offer.current = offer;
      console.info(userData.firstName, ' offer:', offer);

      await peer.current.setLocalDescription(offer);
      console.info(userData.firstName, ' localDescription set!');
    } catch (e) {
      console.error(userData.firstName, ' Failed to setup local offer');
      console.error(e);
      return;
    }
  };

  const on_ICE_Connection_State_Change = (e) => {
    console.info(
      userData.firstName,
      ' ICE Connection State Changed:',
      e.target.iceConnectionState,
    );

    switch (e.target.iceConnectionState) {
      case 'closed':
      case 'disconnected':
      case 'failed':
        if (peer.current) {
          peer.current.close();
          setRemoteStreamURL({toURL: () => null});
          remoteStream.current = null;
          navigation.goBack();
          // busy sound
        }
        break;
    }
  };

  const on_ICE_Candiate = (e) => {
    const {candidate} = e;

    if (candidate) {
      console.info(userData.firstName, ' ICE Candidate Found:', candidate);
      let pendingRemoteIceCandidates = pendingCandidates.current;
      if (Array.isArray(pendingRemoteIceCandidates)) {
        console.info(userData.firstName, 'pendingRemoteIceCandidates is array');
        pendingCandidates.current = [...pendingRemoteIceCandidates, candidate];
      } else {
        console.info(
          userData.firstName,
          'pendingRemoteIceCandidates is not array',
        );
        pendingCandidates.current = [candidate];
      }
    } else {
      // Candidate gathering complete
      console.info(
        userData.firstName,
        'candidate gathering is complete ',
        pendingCandidates.current,
      );
      if (pendingCandidates.current.length > 1) {
        if (offerDetails.offer_received) {
          //answer
          console.log(userData.firstName, ' make-user');
          console.log(peer.current.localDescription);
          console.log(pendingCandidates.current);
          console.log(offerDetails.offer.fromSocket);
          socket.emit('make-answer', {
            answer: {
              answer: peer.current.localDescription,
              candidates: pendingCandidates.current,
            },
            to: offerDetails.offer.fromSocket,
          });
        } else {
          // offer
          console.log(userData.firstName, ' call-user');
          socket.emit('call-user', {
            offer: {
              offer: peer.current.localDescription,
              candidates: pendingCandidates.current,
            },
            to: User._id,
            type: type === 'Practise' ? 'doctor' : 'patient',
            User: {
              firstName: userData.firstName,
              lastName: userData.lastName,
              picture: userData.picture,
              _id: userData.id,
            },
            UserType: isDoctor ? 'doctor' : 'patient',
          });
        }
      } else {
        console.error(
          userData.firstName,
          ' Failed to send an offer/answer: No candidates',
        );
      }
    }
  };

  const on_Add_Stream = (e) => {
    console.info(userData.firstName, ' Remote Stream Added:', e.stream);
    setLocalStreamURL(e.stream);
    setRemoteStreamURL(localStream.current);
    remoteStream.current = e.stream;
  };

  const on_Offer_Received = (data) => {
    console.log(userData.firstName, ' on_call-made');
    setOfferDetails({
      ...offerDetails,
      offer_received: true,
      offer_answered: false,
      offer: data,
    });
  };

  const on_Answer_Received = async (data) => {
    const {answer} = data;
    await peer.current.setRemoteDescription(
      new RTCSessionDescription(answer.answer),
    );
    answer.candidates.forEach((c) =>
      peer.current.addIceCandidate(new RTCIceCandidate(c)),
    );
    setAnswerDetails({
      ...answer_details,
      answer_recevied: true,
    });
  };

  const handleAnswer = async () => {
    console.log(userData.firstName, ' answered');
    const {offer} = offerDetails.offer; // candidate is not available , need to send along with offer
    console.log(offer);
    await setupWebRTC();

    await peer.current.setRemoteDescription(
      new RTCSessionDescription(offer.offer),
    );

    if (Array.isArray(offer.candidates)) {
      offer.candidates.forEach((c) =>
        peer.current.addIceCandidate(new RTCIceCandidate(c)),
      );
    }
    const answer = await peer.current.createAnswer();
    await peer.current.setLocalDescription(answer);
    setOfferDetails({
      ...offerDetails,
      offer_answered: true,
    });
  };

  const onHangUp = () => {
    peer.current.close();
    navigation.goBack();
  };

  return (
    <>
      <StatusBar backgroundColor={'rgba(0,0,0,0)'} translucent />
      <View style={{flex: 1}}>
        <RTCView
          objectFit={'cover'}
          style={{
            height: height,
            width: width,
            marginBottom: 10,
          }}
          mirror
          streamURL={localStreamURL.toURL()}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.65)',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={imageSource}
              style={{height: 95, width: 95, borderRadius: 100}}
            />
            <Text
              style={{
                color: '#999',
                fontSize: 24,
                lineHeight: 70,
              }}>{`${User.firstName} ${User.lastName}`}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            {(offerDetails.offer_answered || !offerDetails.offer_received) && (
              <TouchableOpacity
                onPress={onHangUp} // on press hangup
                style={{
                  backgroundColor: '#ef0000',
                  padding: '3%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  zIndex: 999,
                }}>
                <MaterialIcon name="call" size={32} color={'#bbb'} />
              </TouchableOpacity>
            )}
            <RTCView
              objectFit={'cover'}
              style={{
                height: height * 0.27,
                width: width * 0.42,
                backgroundColor: 'transparent',
                position: 'absolute',
                bottom: 32,
                right: 16,
              }}
              mirror
              streamURL={remoteStreamURL.toURL()}
            />

            {offerDetails.offer_received && !offerDetails.offer_answered && (
              <TouchableOpacity
                onPress={handleAnswer} // on press hangup
                style={{
                  backgroundColor: '#1f912a',
                  padding: '3%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  zIndex: 999,
                }}>
                <MaterialIcon name="call" size={32} color={'#bbb'} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
