import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  AppState,
} from 'react-native';
import {useSelector} from 'react-redux';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
// import io from 'socket.io-client';
import {
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {SocketContext} from '../../../utils/socketContext';
import {Host} from '../../../utils/connection';

// const socket = io(Host);

function Conversations({navigation}) {
  const [conversations, setConversations] = useState([]);
  const [newMessages, setNewMessages] = useState({});
  const socket = useContext(SocketContext);
  // const toDoctor1 = '5f8ddcc849673739d463ff91';
  // const toDoctor2 = '5f9033aa48f5d430608a3b7c';
  const {userData, isDoctor} = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    socket.emit('set_online', {
      id: userData._id,
      type: isDoctor ? 'doctor' : 'patient',
    });
  }, []);
  useEffect(() => {
    socket.on('call-made', function ({offer, fromSocket}) {
      navigation.navigate('videoCall', {
        offer,
        fromSocket,
        mode: 'thatSide',
        User: {
          _id: 'abcdefghij',
          firstName: 'XYZ',
          lastName: 'ABC',
          picture: [],
        },
        type: 'doctor',
      });
    });
  }, []);
  useEffect(() => {
    socket.on('fetch_conversations', function (convo) {
      setConversations(convo.conversations);
      console.log(convo.conversations);
    });
  }, []);
  useEffect(() => {
    socket.on('receive_message', function ({from, message}) {
      console.log('received');
      console.log(from, message);
      const chatMessage = {
        timestamp: new Date().toISOString(),
        _id: `${Date.now()}`,
        message,
        fromWhom: from,
        readReceipt: 1,
      };
      if (!newMessages[from]) {
        const chat = {
          [`${from}`]: [chatMessage],
        };
        setNewMessages({...newMessages, ...chat});
      } else {
        const messages = newMessages[from];
        messages.push(chatMessage);
        const chat = {
          [`${from}`]: messages,
        };
        setNewMessages({...newMessages, ...chat});
      }
    });
  }, []);
  useEffect(() => {
    console.log(newMessages);
  }, [newMessages]);
  useEffect(() => {
    socket.on('receive_conversation', function ({conversation}) {
      setConversations([...conversations, conversation]);
    });
  }, []);

  return (
    <View style={styles.Container}>
      <TopNavBar
        style={{Container: {backgroundColor: '#fff', marginTop: 0}}}
        navigation={navigation}
        headerText={'Conversations'}
      />
      <FlatList
        data={conversations}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{}}
        fadingEdgeLength={30}
        centerContent
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: '5%',
              backgroundColor: '#fff',
            }}>
            <SearchBarSolid
              withIcon
              placeholder={'Search Chat...'}
              placeholderTextColor={SEARCH_PLACEHOLDER_COLOR}
              searchIcon={
                <AntIcon
                  name={'search1'}
                  size={24}
                  color={SEARCH_PLACEHOLDER_COLOR}
                />
              }
              //   onEndEditing={onEndEditing}
              style={{
                backgroundColor: SECONDARY_BACKGROUND,
                borderRadius: 10,
                elevation: 2,
              }}
            />
          </View>
        }
        renderItem={({item}) => {
          return (
            <Convo
              conversation={item}
              navigation={navigation}
              newMessages={newMessages[item.User._id]}
            />
          );
        }}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const Convo = ({conversation, navigation, newMessages}) => {
  const [lastMessage, setLastMessage] = useState({});
  const {userData, isDoctor} = useSelector((state) => state.AuthReducer);
  const {Chats, User, fromWhom} = conversation;
  const handleSetLastMessage = (chats) => {
    if (chats.length !== 0) {
      const last = chats[chats.length - 1];
      setLastMessage(last);
    }
  };
  useEffect(() => {
    handleSetLastMessage(Chats);
  }, [Chats]);
  useEffect(() => {
    if (newMessages) handleSetLastMessage(newMessages);
    console.log('a new message arrived ', newMessages);
    //set current count of newMessages and set active/unread messages
    //read about setParams for not to use function as a prop,,or just updating any param of another screeen
  }, [newMessages]);

  const onPressConvo = () => {
    navigation.navigate('Chats', {
      Chats,
      fromWhom: User._id,
      User,
      type: fromWhom,
    });
  };
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

  return (
    <View
      style={{
        width: '100%',
        marginVertical: '0.5%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: '2%',
        paddingRight: '3%',
      }}>
      <View
        style={{
          flex: 1,
          //   backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          paddingRight: '1.5%',
        }}>
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 80,
          }}
          loadingIndicatorSource={require('../../../assets/images/dummy_profile.png')}
          source={imageSource}
        />
      </View>
      <TouchableOpacity
        onPress={onPressConvo}
        style={{
          flex: 5,
          padding: '2%',
          borderBottomColor: '#dddbdb',
          borderBottomWidth: 0.5,
          paddingVertical: '4%',
        }}>
        <Text
          style={{color: '#222'}}>{`${User.firstName} ${User.lastName}`}</Text>
        <Text style={{color: '#666'}}>
          {lastMessage && lastMessage.message}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Conversations;
