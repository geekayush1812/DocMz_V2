import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {NEW_PRIMARY_LIGHT_BG, NEW_PRIMARY_COLOR} from '../../../styles/colors';
import Feather from 'react-native-vector-icons/Feather';

const NewItem = ({onPress = () => {}}) => {
  return (
    <TouchableOpacity {...{onPress}}>
      <View
        style={{
          backgroundColor: NEW_PRIMARY_LIGHT_BG,
          paddingVertical: '4%',
          marginVertical: '2%',
          marginHorizontal: '2%',
          marginTop: '5%',
          borderRadius: 13,
          elevation: 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Feather name="plus" size={30} color={NEW_PRIMARY_COLOR} />
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
            paddingVertical: 4,
            marginLeft: 10,
          }}>
          Add New
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewItem;
