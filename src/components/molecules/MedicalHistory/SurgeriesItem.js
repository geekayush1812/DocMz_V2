import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {INPUT_PLACEHOLDER, NEW_PRIMARY_COLOR} from '../../../styles/colors';
import Entypo from 'react-native-vector-icons/Entypo';

const SurgeriesItem = ({data}) => (
  <View
    style={{
      backgroundColor: 'white',
      paddingHorizontal: 20,
      borderRadius: 13,
      marginVertical: 10,
      elevation: 2,
      flexDirection: 'row',
      paddingVertical: 15,
    }}>
    <View style={{flex: 1}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 17,
          paddingVertical: 2,
        }}>
        {data.name}
      </Text>
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: 13,
          paddingVertical: 2,
        }}>
        {data.doctor}
      </Text>
    </View>

    <View style={{justifyContent: 'center', paddingLeft: 10, marginRight: 20}}>
      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 11,
        }}>
        {data.date}
      </Text>
    </View>

    <View style={{justifyContent: 'center'}}>
      <TouchableOpacity>
        <Image
          source={require('../../../assets/icons/back.png')}
          style={{
            height: 17,
            width: 17,
            transform: [{rotateZ: '180deg'}],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default SurgeriesItem;
