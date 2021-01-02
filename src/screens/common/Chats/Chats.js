import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {SocketContext} from '../../../utils/socketContext';
import {Host} from '../../../utils/connection';

function ChatsComponent({navigation, route}) {
  console.log('ChatsRendered');
  const {Chats, fromWhom, User, type} = route.params;
  const [textMessage, setTextMessage] = useState('');
  const socket = useContext(SocketContext);
  const [Messages, setMessages] = useState([]);
  const [pushedNewMessage, setPushedNewMessage] = useState(0);
  const {userData, isDoctor} = useSelector((state) => state.AuthReducer);
  const textInputRef = useRef();

  const to = fromWhom;
  const from = userData._id;

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
    setMessages(Chats);
  }, [Chats]);
  const onChangeText = (text) => {
    setTextMessage(text.trim());
  };
  const sendMessage = (textMessage) => {
    socket.emit('send_message', {
      from,
      to,
      message: textMessage,
      toType: type === 'Practise' ? 'doctor' : 'patient',
      fromType: isDoctor ? 'doctor' : 'patient',
    });
  };
  const handleSendMessage = () => {
    const chatMessage = {
      timestamp: new Date().toISOString(),
      _id: `${Date.now()}`,
      message: textMessage,
      fromWhom: from,
      readReceipt: 1,
    };
    // const messages = Messages;
    // messages.unshift(chatMessage);
    setMessages([chatMessage, ...Messages]);
    setPushedNewMessage(pushedNewMessage + 1);
    textInputRef.current.clear();
    textInputRef.current.focus();
    sendMessage(textMessage);
  };
  useEffect(() => {
    socket.on('receive_message', function messageReceived({from, message}) {
      console.log('received_message');
      console.log(from, message);

      const chatMessage = {
        timestamp: new Date().toISOString(),
        _id: `${Date.now()}`,
        message,
        fromWhom: from,
        readReceipt: 1,
      };
      setMessages([chatMessage, ...Messages]);
      // setPushedNewMessage(pushedNewMessage + 1);
    });
  }, []);

  return (
    <View style={styles.Container}>
      <TopNavBar
        style={{
          Container: {
            backgroundColor: '#fff',
            marginTop: 0,
            paddingVertical: '2%',
          },
        }}
        navigation={navigation}
        headerText={'Chat'}
      />
      <View style={{flex: 1, backgroundColor: '#fcfcfc', marginBottom: 10}}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#047b7b',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 1.5,
              paddingVertical: '3%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: 45,
                width: 45,
                borderRadius: 45,
                margin: 0,
              }}
              loadingIndicatorSource={require('../../../assets/images/dummy_profile.png')}
              source={imageSource}
            />
          </View>
          <View
            style={{
              flex: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#fff',
              }}>{`${User.firstName} ${User.lastName}`}</Text>
          </View>
          <View
            style={{
              flex: 2,
              // backgroundColor: 'red',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('videoCall', {
                  mode: 'thisSide',
                  User,
                  type,
                });
              }}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <FeatherIcon name={'video'} size={28} color={'#fafafa'} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={Messages}
          showsVerticalScrollIndicator={false}
          // stickyHeaderIndices={[0]}
          inverted
          contentContainerStyle={{}}
          extraData={pushedNewMessage}
          fadingEdgeLength={10}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => {
            return <Message chat={item} to={to} from={from} />;
          }}></FlatList>
      </View>
      <View
        style={{
          width: '92%',
          backgroundColor: '#fff',
          elevation: 6,
          borderRadius: 15,
          // height: 45,
          alignSelf: 'center',
          // position: 'absolute',
          bottom: 10,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            // backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FeatherIcon name={'smile'} size={17} color={'#a09e9e'} />
        </TouchableOpacity>
        <View
          style={{
            flex: 5,
            // backgroundColor: 'yellow',
          }}>
          <TextInput
            placeholder={'Type a message…'}
            placeholderTextColor={'#8e9393'}
            multiline
            style={{maxHeight: 100}}
            ref={textInputRef}
            onChangeText={onChangeText}
          />
        </View>
        <View
          style={{
            flex: 2.4,
            // backgroundColor: 'red',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          {textMessage === '' ? (
            <>
              <TouchableOpacity style={{paddingHorizontal: '3%'}}>
                <FeatherIcon name={'paperclip'} size={17} color={'#a09e9e'} />
              </TouchableOpacity>
              <TouchableOpacity style={{paddingHorizontal: '3%'}}>
                <FeatherIcon name={'camera'} size={17} color={'#a09e9e'} />
              </TouchableOpacity>
              <TouchableOpacity style={{paddingHorizontal: '3%'}}>
                <FeatherIcon name={'mic'} size={17} color={'#a09e9e'} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={handleSendMessage}
              style={{
                backgroundColor: '#047b7b',
                height: 40,
                width: 40,
                alignSelf: 'center',
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FeatherIcon
                name={'send'}
                style={{
                  transform: [
                    {
                      rotate: '45deg',
                    },
                  ],
                }}
                color={'#fafafa'}
                size={20}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

const Message = ({chat, to, from}) => {
  const {message, fromWhom} = chat;
  return (
    <View
      style={{
        width: '100%',
        // backgroundColor: 'red',
        paddingVertical: '2%',
        paddingHorizontal: '3%',
      }}>
      <View
        style={{
          backgroundColor: fromWhom === to ? '#e6f7f5' : '#fff',
          elevation: 2,
          borderRadius: 12,
          maxWidth: '80%',
          padding: '2%',
          paddingHorizontal: '4%',
          marginBottom: '1%',
          alignSelf: fromWhom === to ? 'flex-start' : 'flex-end',
        }}>
        <Text>{message}</Text>
      </View>
      <Text
        style={{
          color: '#a09e9e',
          fontSize: 11,
          marginHorizontal: '4%',
          alignSelf: fromWhom === to ? 'flex-start' : 'flex-end',
        }}>
        11:07
      </Text>
    </View>
  );
};

export default ChatsComponent;
