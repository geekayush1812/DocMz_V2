import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  VirtualizedList,
} from 'react-native';
import {useSelector, connect} from 'react-redux';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {SocketContext} from '../../../utils/socketContext';
import {Host} from '../../../utils/connection';

class ChatsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textMessage: '',
      Messages: [],
    };
    this.from = this.props.userData._id;
    this.to = this.props.route.params.fromWhom;
    this.User = this.props.route.params.User;
    this.type = this.props.route.params.type;
    this.Chats = this.props.route.params.Chats;
    if (Array.isArray(this.User.picture)) {
      if (this.User.picture.length !== 0)
        this.imageSource = {
          uri: `${Host}${this.User.picture[0]
            .replace('public', '')
            .replace('\\\\', '/')}`,
        };
    } else {
      if (this.User.picture && this.User.picture !== '')
        this.imageSource = {
          uri: `${Host}${this.User.picture
            .replace('public', '')
            .replace('\\\\', '/')}`,
        };
    }
    console.log(this.props);
  }
  // const {userData, isDoctor} = useSelector((state) => state.AuthReducer);
  // console.log(userData.firstName, 'ChatsRendered');
  // const socket = useContext(SocketContext);
  // const {Chats, fromWhom, User, type} = route.params;
  // const [textMessage, setTextMessage] = useState('');
  // const [Messages, setMessages] = useState([]);

  // const to = fromWhom;
  // const from = userData._id;
  setTextMessage = (text) => {
    this.setState({
      textMessage: text,
    });
  };
  sendMessage = (message) => {
    this.socket.emit('send_message', {
      from: this.from,
      to: this.to,
      message: message,
      toType: this.type === 'Practise' ? 'doctor' : 'patient',
      fromType: this.props.isDoctor ? 'doctor' : 'patient',
    });
  };
  handleSendMessage = () => {
    const trimmedMessage = this.state.textMessage.trim();

    // const messages = Array.from(Messages);
    // messages.unshift(chatMessage);
    console.log(this.state.Messages);
    this.setState({
      Messages: [
        {
          timestamp: Date.now().toString(),
          _id: `${Date.now().toString()}`,
          message: trimmedMessage,
          fromWhom: this.from,
          readReceipt: 1,
        },
        ...this.state.Messages,
      ],
      textMessage: '',
    });

    // setPushedNewMessage(pushedNewMessage + 1);

    // textInputRef.current.clear();
    // textInputRef.current.focus();
    this.sendMessage(trimmedMessage);
  };
  onReceiveMessage = ({from, message}) => {
    console.log(this.props.userData.firstName, ' receive_message');
    if (from == this.props.route.params.fromWhom) {
      // const messages = Array.from(Messages);
      // messages.unshift(chatMessage);
      console.log(this.state.Messages);
      this.setState({
        Messages: [
          {
            timestamp: Date.now().toString(),
            _id: `${Date.now().toString()}`,
            message,
            fromWhom: from,
            readReceipt: 1,
          },
          ...this.state.Messages,
        ],
      });
      // setPushedNewMessage(pushedNewMessage + 1);
    }
  };
  componentDidMount() {
    this.socket = this.context;
    this.socket.on('receive_message', this.onReceiveMessage);
  }
  componentWillUnmount() {
    this.socket.off('receive_message', this.onReceiveMessage);
  }
  // useEffect(() => {
  //   socket.on('receive_message', onReceiveMessage);
  //   return () => socket.off('receive_message', onReceiveMessage);
  // }, [socket]);

  // useEffect(() => {
  //   console.log('messages array ', Messages);
  // }, [Messages]);
  render() {
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
          navigation={this.navigation}
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
                source={this.imageSource}
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
                }}>{`${this.User.firstName} ${this.User.lastName}`}</Text>
            </View>
            <View
              style={{
                flex: 2,
                // backgroundColor: 'red',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.navigation.navigate('videoCall', {
                    mode: 'thisSide',
                    User: this.User,
                    type: this.type,
                  });
                }}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FeatherIcon name={'video'} size={28} color={'#fafafa'} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={[...this.state.Messages, ...this.Chats]}
            showsVerticalScrollIndicator={false}
            // stickyHeaderIndices={[0]}
            inverted
            // initialNumToRender={15}
            // contentContainerStyle={{}}
            // fadingEdgeLength={10}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => {
              return <Message chat={item} to={this.to} from={this.from} />;
            }}
          />
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
              // ref={textInputRef}
              value={this.state.textMessage}
              onChangeText={this.setTextMessage}
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
            {this.state.textMessage === '' ? (
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
                onPress={this.handleSendMessage}
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
}
ChatsComponent.contextType = SocketContext;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

const Message = React.memo(({chat, to, from}) => {
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
});

function mapStateToProps(state) {
  return state.AuthReducer;
}

export default connect(mapStateToProps)(ChatsComponent);
