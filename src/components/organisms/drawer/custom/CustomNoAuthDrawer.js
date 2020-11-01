import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {NEW_PRIMARY_COLOR} from '../../../../styles/colors';
function CustomNoAuthDrawer({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{resizeMode: 'contain', width: '80%'}}
        source={require('../../../../assets/images/logo.png')}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('Auth');
        }}
        style={{
          height: 40,
          width: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: NEW_PRIMARY_COLOR,
          borderRadius: 12,
        }}>
        <Text style={{color: '#fff', fontSize: 14}}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CustomNoAuthDrawer;
