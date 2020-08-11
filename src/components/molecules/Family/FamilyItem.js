import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import Entypo from 'react-native-vector-icons/Entypo';

const FamilyItem = ({data}) => (
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
    <View style={{justifyContent: 'center'}}>
      <Image
        source={require('../../../assets/jpg/person2.jpg')}
        style={{height: 40, width: 40, borderRadius: 20, marginRight: 15}}
      />
    </View>
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 17,
            paddingVertical: 2,
            marginRight: 10,
          }}>
          {data.firstName + ' ' + data.lastName}
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: 11,
            paddingVertical: 2,
          }}>
          {`(${
            new Date().getFullYear() - new Date(data.birthdate).getFullYear()
          } yrs)`}
        </Text>
      </View>

      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: 13,
          paddingVertical: 2,
          color: NEW_PRIMARY_BACKGROUND,
        }}>
        {data.relationship}
      </Text>

      <View style={{flexDirection: 'row', marginRight: 10}}>
        {data?.problems?.map((problem, i) => (
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 11,
              paddingRight: 5,
              paddingLeft: i === 0 ? 0 : 5,
              borderColor: 'black',
              color: INPUT_PLACEHOLDER,
              borderLeftWidth: i === 0 ? 0 : 1,
            }}>
            {problem}
          </Text>
        ))}
      </View>
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

export default FamilyItem;
