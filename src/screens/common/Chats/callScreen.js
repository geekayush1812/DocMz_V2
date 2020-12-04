import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  AppState,
  useWindowDimensions,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {
  RTCView,
  mediaDevices,
  RTCPeerConnection,
  MediaStreamTrack,
  MediaStream,
  RTCSessionDescription,
  RTCIceCandidate,
} from 'react-native-webrtc';
import {useSelector} from 'react-redux';
import {SocketContext} from '../../../utils/socketContext';

export default function CallScreen() {
  const [localStream, setLocalStream] = useState({toURL: () => null});
  const {height, width} = useWindowDimensions();
  const socket = useContext(SocketContext);
  const {userData, isDoctor} = useSelector((state) => state.AuthReducer);

  let name;
  let connectedUser;
  const [userId, setUserId] = useState('');
  const [socketActive, setSocketActive] = useState(false);
  const [calling, setCalling] = useState(false);
  // Video Scrs
  const [remoteStream, setRemoteStream] = useState({toURL: () => null});
  const [pc, setPc] = useState(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    }),
  );

  const callUser = async () => {
    // console.log('called');
    const offer = await pc.createOffer();
    await pc.setLocalDescription(new RTCSessionDescription(offer));
    socket.emit('call-user', {
      offer,
      // to: userData._id, //this should be the next person whom this current user wants to call
      to: '5fa290afa2535e308000c47e', //this should be the next person whom this current user wants to call
      type: 'doctor',
    });
    console.log('with offer ', offer, ' to ', '5fa290afa2535e308000c47e');
  };
  useEffect(() => {
    socket.on('call-made', async (data) => {
      console.log('call-made received');
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(new RTCSessionDescription(answer));

      console.log('make-answer emited ', answer, ' to ', data.fromSocket);
      socket.emit('make-answer', {
        answer,
        to: data.fromSocket,
      });
    });
  }, []);
  useEffect(() => {
    socket.on('answer-made', async (data) => {
      console.log('answer-made received with data ', data);
      await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
    });
    socket.on('candidateReceived', function ({candidate}) {
      console.log('candidateReceived with ', candidate);
      pc.addIceCandidate(new RTCIceCandidate(candidate));
    });
  }, []);

  useEffect(() => {
    const exec = async () => {
      /**
       *
       * Sockets Signalling
       */
      // conn.onopen = () => {
      //   console.log('Connected to the signaling server');
      //   setSocketActive(true);
      // };
      //when we got a message from a signaling server
      // conn.onmessage = (msg) => {
      //   let data;
      //   if (msg.data === 'Hello world') {
      //     data = {};
      //   } else {
      //     data = JSON.parse(msg.data);
      //     console.log('Data --------------------->', data);
      //     switch (data.type) {
      //       case 'login':
      //         console.log('Login');
      //         break;
      //       //when somebody wants to call us
      //       case 'offer':
      //         handleOffer(data.offer, data.name);
      //         console.log('Offer');
      //         break;
      //       case 'answer':
      //         handleAnswer(data.answer);
      //         console.log('Answer');
      //         break;
      //       //when a remote peer sends an ice candidate to us
      //       case 'candidate':
      //         handleCandidate(data.candidate);
      //         console.log('Candidate');
      //         break;
      //       case 'leave':
      //         handleLeave();
      //         console.log('Leave');
      //         break;
      //       default:
      //         break;
      //     }
      //   }
      // };
      // conn.onerror = function (err) {
      //   console.log('Got error', err);
      // };
      /**
       * Socjket Signalling Ends
       */
      // console.log('called');
      // const offer = await pc.createOffer();
      // await pc.setLocalDescription(new RTCSessionDescription(offer));

      // socket.emit('call-user', {
      //   offer,
      //   to: '5fa290afa2535e308000c47e', //this should be the next person whom this current user wants to call
      //   type: 'doctor',
      // });
      // console.log('with offer ', offer, ' to ', userData._id);

      let isFront = false;
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
                minWidth: width, // Provide your own width, height and frame rate here
                minHeight: 300,
                minFrameRate: 60,
              },
              facingMode: isFront ? 'user' : 'environment',
              optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
            },
          })
          .then((stream) => {
            // Got stream!
            // console.log(stream.getAudioTracks());
            setLocalStream(stream);
            // stream.getTracks().then((tracks) => {
            //   tracks.forEach((track) => pc.addStream(track));
            // });
            // setup stream listening
            pc.addStream(stream);
          })
          .catch((error) => {
            // Log error
            console.log(error);
          });
      });
    };
    exec();
  }, []);
  useEffect(() => {
    pc.onaddstream = ({stream}) => {
      console.log('On Add Stream', stream);
      setRemoteStream(stream);
    };

    // Setup ice handling
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('on icecandidate emited');
        socket.emit('icecandidate', {
          candidate: event.candidate,
          type: 'doctor',
          to: '5fa290afa2535e308000c47e',
        });
      }
    };
  }, []);

  return (
    <View>
      <RTCView
        mirror={true}
        streamURL={remoteStream.toURL()}
        style={{
          height: 500,
          width: width,
          marginBottom: 10,
        }}
      />
      <Button
        title="Call"
        onPress={() => {
          callUser();
        }}
      />
      <RTCView
        mirror={true}
        streamURL={localStream.toURL()}
        style={{
          height: 500,
          width: width,
          marginBottom: 10,
        }}
      />
    </View>
  );
}

// export default function CallScreen({navigation, ...props}) {
//   let name;
//   let connectedUser;
//   const [userId, setUserId] = useState('');
//   const [socketActive, setSocketActive] = useState(false);
//   const [calling, setCalling] = useState(false);
//   // Video Scrs
//   const [localStream, setLocalStream] = useState({toURL: () => null});
//   const [remoteStream, setRemoteStream] = useState({toURL: () => null});
//   const [conn, setConn] = useState(new WebSocket('ws://3.20.188.26:8080'));
//   const [yourConn, setYourConn] = useState(
//     //change the config as you need
//     new RTCPeerConnection({
//       iceServers: [
//         {
//           urls: 'stun:stun.l.google.com:19302',
//         },
//         {
//           urls: 'stun:stun1.l.google.com:19302',
//         },
//         {
//           urls: 'stun:stun2.l.google.com:19302',
//         },
//       ],
//     }),
//   );

//   const [offer, setOffer] = useState(null);

//   const [callToUsername, setCallToUsername] = useState(null);

//   useFocusEffect(
//     useCallback(() => {
//       AsyncStorage.getItem('userId').then((id) => {
//         console.log(id);
//         if (id) {
//           setUserId(id);
//         } else {
//           setUserId('');
//           navigation.push('Login');
//         }
//       });
//     }, [userId]),
//   );

//   useEffect(() => {
//     navigation.setOptions({
//       title: 'Your ID - ' + userId,
//       headerRight: () => (
//         <Button mode="text" onPress={onLogout} style={{paddingRight: 10}}>
//           Logout
//         </Button>
//       ),
//     });
//   }, [userId]);

//   /**
//    * Calling Stuff
//    */

//   useEffect(() => {
//     if (socketActive && userId.length > 0) {
//       try {
//         InCallManager.start({media: 'audio'});
//         InCallManager.setForceSpeakerphoneOn(true);
//         InCallManager.setSpeakerphoneOn(true);
//       } catch (err) {
//         console.log('InApp Caller ---------------------->', err);
//       }

//       console.log(InCallManager);

//       send({
//         type: 'login',
//         name: userId,
//       });
//     }
//   }, [socketActive, userId]);

//   const onLogin = () => {};

//   useEffect(() => {
//     /**
//      *
//      * Sockets Signalling
//      */
//     conn.onopen = () => {
//       console.log('Connected to the signaling server');
//       setSocketActive(true);
//     };
//     //when we got a message from a signaling server
//     conn.onmessage = (msg) => {
//       let data;
//       if (msg.data === 'Hello world') {
//         data = {};
//       } else {
//         data = JSON.parse(msg.data);
//         console.log('Data --------------------->', data);
//         switch (data.type) {
//           case 'login':
//             console.log('Login');
//             break;
//           //when somebody wants to call us
//           case 'offer':
//             handleOffer(data.offer, data.name);
//             console.log('Offer');
//             break;
//           case 'answer':
//             handleAnswer(data.answer);
//             console.log('Answer');
//             break;
//           //when a remote peer sends an ice candidate to us
//           case 'candidate':
//             handleCandidate(data.candidate);
//             console.log('Candidate');
//             break;
//           case 'leave':
//             handleLeave();
//             console.log('Leave');
//             break;
//           default:
//             break;
//         }
//       }
//     };
//     conn.onerror = function (err) {
//       console.log('Got error', err);
//     };
//     /**
//      * Socjket Signalling Ends
//      */

//     let isFront = false;
//     mediaDevices.enumerateDevices().then((sourceInfos) => {
//       let videoSourceId;
//       for (let i = 0; i < sourceInfos.length; i++) {
//         const sourceInfo = sourceInfos[i];
//         if (
//           sourceInfo.kind == 'videoinput' &&
//           sourceInfo.facing == (isFront ? 'front' : 'environment')
//         ) {
//           videoSourceId = sourceInfo.deviceId;
//         }
//       }
//       mediaDevices
//         .getUserMedia({
//           audio: true,
//           video: {
//             mandatory: {
//               minWidth: 500, // Provide your own width, height and frame rate here
//               minHeight: 300,
//               minFrameRate: 30,
//             },
//             facingMode: isFront ? 'user' : 'environment',
//             optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
//           },
//         })
//         .then((stream) => {
//           // Got stream!
//           setLocalStream(stream);

//           // setup stream listening
//           yourConn.addStream(stream);
//         })
//         .catch((error) => {
//           // Log error
//         });
//     });

//     yourConn.onaddstream = (event) => {
//       console.log('On Add Stream', event);
//       setRemoteStream(event.stream);
//     };

//     // Setup ice handling
//     yourConn.onicecandidate = (event) => {
//       if (event.candidate) {
//         send({
//           type: 'candidate',
//           candidate: event.candidate,
//         });
//       }
//     };
//   }, []);

//   const send = (message) => {
//     //attach the other peer username to our messages
//     if (connectedUser) {
//       message.name = connectedUser;
//       console.log('Connected iser in end----------', message);
//     }

//     conn.send(JSON.stringify(message));
//   };

//   const onCall = () => {
//     setCalling(true);

//     connectedUser = callToUsername;
//     console.log('Caling to', callToUsername);
//     // create an offer

//     yourConn.createOffer().then((offer) => {
//       yourConn.setLocalDescription(offer).then(() => {
//         console.log('Sending Ofer');
//         console.log(offer);
//         send({
//           type: 'offer',
//           offer: offer,
//         });
//         // Send pc.localDescription to peer
//       });
//     });
//   };

//   //when somebody sends us an offer
//   const handleOffer = async (offer, name) => {
//     console.log(name + ' is calling you.');

//     console.log('Accepting Call===========>', offer);
//     connectedUser = name;

//     try {
//       await yourConn.setRemoteDescription(new RTCSessionDescription(offer));

//       const answer = await yourConn.createAnswer();

//       await yourConn.setLocalDescription(answer);
//       send({
//         type: 'answer',
//         answer: answer,
//       });
//     } catch (err) {
//       console.log('Offerr Error', err);
//     }
//   };

//   //when we got an answer from a remote user
//   const handleAnswer = (answer) => {
//     yourConn.setRemoteDescription(new RTCSessionDescription(answer));
//   };

//   //when we got an ice candidate from a remote user
//   const handleCandidate = (candidate) => {
//     setCalling(false);
//     console.log('Candidate ----------------->', candidate);
//     yourConn.addIceCandidate(new RTCIceCandidate(candidate));
//   };

//   //hang up
//   const hangUp = () => {
//     send({
//       type: 'leave',
//     });

//     handleLeave();
//   };

//   const handleLeave = () => {
//     connectedUser = null;
//     setRemoteStream({toURL: () => null});

//     yourConn.close();
//     // yourConn.onicecandidate = null;
//     // yourConn.onaddstream = null;
//   };

//   const onLogout = () => {
//     // hangUp();

//     AsyncStorage.removeItem('userId').then((res) => {
//       navigation.push('Login');
//     });
//   };

//   const acceptCall = async () => {
//     console.log('Accepting Call===========>', offer);
//     connectedUser = offer.name;

//     try {
//       await yourConn.setRemoteDescription(new RTCSessionDescription(offer));

//       const answer = await yourConn.createAnswer();

//       await yourConn.setLocalDescription(answer);

//       send({
//         type: 'answer',
//         answer: answer,
//       });
//     } catch (err) {
//       console.log('Offerr Error', err);
//     }
//   };
//   const rejectCall = async () => {
//     send({
//       type: 'leave',
//     });
//     ``;
//     setOffer(null);

//     handleLeave();
//   };

//   /**
//    * Calling Stuff Ends
//    */

//   return (
//     <View style={styles.root}>
//       <View style={styles.inputField}>
//         <TextInput
//           label="Enter Friends Id"
//           mode="outlined"
//           style={{marginBottom: 7}}
//           onChangeText={(text) => setCallToUsername(text)}
//         />
//         <Button
//           mode="contained"
//           onPress={onCall}
//           loading={calling}
//           //   style={styles.btn}
//           contentStyle={styles.btnContent}
//           disabled={!(socketActive && userId.length > 0)}>
//           Call
//         </Button>
//       </View>

//       <View style={styles.videoContainer}>
//         <View style={[styles.videos, styles.localVideos]}>
//           <Text>Your Video</Text>
//           <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />
//         </View>
//         <View style={[styles.videos, styles.remoteVideos]}>
//           <Text>Friends Video</Text>
//           <RTCView
//             streamURL={remoteStream.toURL()}
//             style={styles.remoteVideo}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

{
  /* <TouchableOpacity style={{paddingVertical: '2%'}} onPress={putNotif}>
        <Text>Launch notification</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{paddingVertical: '2%'}}
        onPress={cancelNotification}>
        <Text>cancel notification</Text>
      </TouchableOpacity> */
}

// const createChannel = () => {
//   PushNotification.createChannel(
//     {
//       channelId: 'jjip', // (required)
//       channelName: 'app notif', // (required)
//       channelDescription: 'test channel', // (optional) default: undefined.
//       soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
//       importance: 4, // (optional) default: 4. Int value of the Android notification importance
//       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//     },
//     (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
//   );
// };
// const putNotif = () => {
//   createChannel();
//   PushNotification.localNotification({
//     /* Android Only Properties */
//     channelId: 'jjip', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
//     ticker: 'My Notification Ticker', // (optional)
//     showWhen: true, // (optional) default: true
//     autoCancel: true, // (optional) default: true
//     largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
//     largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
//     smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
//     bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
//     subText: 'This is a subText', // (optional) default: none
//     bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
//     color: 'red', // (optional) default: system default
//     vibrate: true, // (optional) default: true
//     vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
//     tag: 'some_tag', // (optional) add tag to message
//     group: 'group', // (optional) add group to message
//     groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
//     ongoing: false, // (optional) set whether this is an "ongoing" notification
//     priority: 'high', // (optional) set notification priority, default: high
//     visibility: 'private', // (optional) set notification visibility, default: private
//     ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
//     shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
//     onlyAlertOnce: true, // (optional) alert will open only once with sound and notify, default: false

//     when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
//     usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
//     timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

//     messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

//     //   actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
//     invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

//     /* iOS only properties */
//     alertAction: 'view', // (optional) default: view
//     category: '', // (optional) default: empty string

//     /* iOS and Android properties */
//     id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
//     title: 'My Notification Title', // (optional)
//     message: 'My Notification Message', // (required)
//     userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
//     playSound: false, // (optional) default: true
//     soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
//     number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
//     repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
//   });
// };
// const cancelNotification = (id) => {
//   PushNotification.cancelLocalNotifications({id: '0'});
// };
