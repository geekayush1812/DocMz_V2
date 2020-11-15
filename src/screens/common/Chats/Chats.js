import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import {useSelector} from 'react-redux';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {useWindowDimensions} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {SocketContext} from '../../../utils/socketContext';
function Chats({navigation, route}) {
  const {Chats, fromWhom} = route.params;
  const [textMessage, setTextMessage] = useState('');
  const socket = useContext(SocketContext);
  const [Messages, setMessages] = useState([]);
  const [pushedNewMessage, setPushedNewMessage] = useState(0);
  const {userData, isDoctor} = useSelector((state) => state.AuthReducer);
  const textInputRef = useRef();
  const messageFlatlistRef = useRef();

  const to = fromWhom;
  const from = userData._id;

  // {
  //   timestamp: '2020-11-10T19:01:10.119Z', //new Date().toISOString()
  //   _id: '5faae3910fedeb207897dcc8', // uuid
  //   message: 'have you seen ayush?',
  //   fromWhom: '5f9033aa48f5d430608a3b7c',
  //   readReceipt: 1,
  //   __v: 0,
  // },
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
      toType: 'doctor',
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
    const messages = Messages;
    messages.push(chatMessage);
    setMessages(messages);
    setPushedNewMessage(pushedNewMessage + 1);
    textInputRef.current.clear();
    textInputRef.current.focus();
    sendMessage(textMessage);
  };

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
        <FlatList
          data={Messages}
          ref={messageFlatlistRef}
          onContentSizeChange={() =>
            messageFlatlistRef.current.scrollToEnd({animated: false})
          }
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{}}
          extraData={pushedNewMessage}
          fadingEdgeLength={10}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={
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
                  source={require('../../../assets/jpg/person2.jpg')}
                />
              </View>
              <View
                style={{
                  flex: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18, color: '#fff'}}>Allen Paul</Text>
              </View>
              <View style={{flex: 2}}></View>
            </View>
          }
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

export default Chats;
