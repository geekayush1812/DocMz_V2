import React, {useContext, useEffect} from 'react';
import {Button, View} from 'react-native';
import {useSelector} from 'react-redux';
import {SocketContext} from '../../../utils/socketContext';
export default function Testing({navigation}) {
  const socket = useContext(SocketContext);
  const {userData} = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    console.log('set online ', userData._id);
    socket.emit('set_online', {
      id: userData._id,
      type: 'doctor',
    });
  }, []);
  return (
    <View>
      <Button
        title={'go to call'}
        onPress={() => {
          navigation.navigate('videoCall');
        }}></Button>
    </View>
  );
}
