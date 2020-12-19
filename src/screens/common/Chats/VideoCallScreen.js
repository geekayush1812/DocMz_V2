import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
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
export default function VideoCallScreen({route}) {
  const {mode, User, type} = route.params;
  const socket = useContext(SocketContext);
  const {userData, isDoctor} = useSelector((state) => state.AuthReducer);
  const {width} = useWindowDimensions();

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
              minHeight: 300,
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
    setRemoteStreamURL(e.stream);
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

  return (
    <ScrollView style={{flex: 1}}>
      <RTCView
        style={{
          height: 500,
          width: width,
          marginBottom: 10,
        }}
        mirror
        streamURL={localStreamURL.toURL()}
      />
      {mode === 'thisSide' && <Button title={'call'} onPress={handleConnect} />}
      <RTCView
        style={{
          height: 500,
          width: width,
          marginBottom: 10,
        }}
        mirror
        streamURL={remoteStreamURL.toURL()}
      />

      {offerDetails.offer_received && (
        <Button title={'answer call'} onPress={handleAnswer} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
