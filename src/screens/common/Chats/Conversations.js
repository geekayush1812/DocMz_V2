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
import {
  SEARCH_PLACEHOLDER_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {SocketContext} from '../../../utils/socketContext';
import {Host} from '../../../utils/connection';
import {useNavigation} from '@react-navigation/native';

function ConversationsScreen({navigation}) {
  console.log('Conversations');
  const socket = useContext(SocketContext);
  const [conversations, setConversations] = useState([]);
  const {userData, isDoctor} = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    socket.emit('set_online', {
      id: userData._id,
      type: isDoctor ? 'doctor' : 'patient',
    });
    socket.on('call-made', function ({offer, fromSocket, User, type}) {
      navigation.navigate('videoCall', {
        offer,
        fromSocket,
        mode: 'thatSide',
        User,
        type,
      });
    });
    socket.on('fetch_conversations', function (convo) {
      console.log('fetched conversations');
      console.log(convo.conversations);
      setConversations(convo.conversations);
    });
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
              // newMessages={newMessages[item.User._id]}
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

const Convo = ({
  conversation,
  //  newMessages
}) => {
  console.log('convo');
  const navigation = useNavigation();
  const {Chats, User, fromWhom} = conversation;
  // const [lastMessage, setLastMessage] = useState({});
  // const {userData, isDoctor} = useSelector((state) => state.AuthReducer);
  // const handleSetLastMessage = (chats) => {
  //   if (chats.length !== 0) {
  //     const last = chats[0];
  //     setLastMessage(last);
  //   }
  // };
  // useEffect(() => {
  //   handleSetLastMessage(Chats);
  // }, [Chats]);
  // useEffect(() => {
  //   if (newMessages) handleSetLastMessage(newMessages);
  //   console.log('a new message arrived ', newMessages);
  //   //set current count of newMessages and set active/unread messages
  //   //read about setParams for not to use function as a prop,,or just updating any param of another screeen
  // }, [newMessages]);

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
          {/* {lastMessage && lastMessage.message} */}{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConversationsScreen;
