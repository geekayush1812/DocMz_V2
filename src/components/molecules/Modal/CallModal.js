import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import BlurModal from './BlurModal';
import {
  NEW_HEADER_TEXT,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CallModal = ({visible, onCancel, onVoiceCall, onVideoCall}) => (
  <BlurModal {...{visible, onCancel}}>
    <Text
      style={{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 23,
        color: NEW_HEADER_TEXT,
      }}>
      Call Now?
    </Text>

    <Text
      style={{
        fontFamily: 'Montserrat-Regular',
        fontSize: 18,
        color: NEW_HEADER_TEXT,
        marginTop: 3,
      }}>
      Start your appointment
    </Text>

    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        marginTop: 25,
      }}>
      <TouchableOpacity onPress={onVoiceCall}>
        <View
          style={{
            backgroundColor: NEW_PRIMARY_BACKGROUND,
            borderRadius: 35,
            height: 65,
            width: 65,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome name="phone" color="white" size={40} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onVideoCall}>
        <View
          style={{
            backgroundColor: NEW_PRIMARY_BACKGROUND,
            borderRadius: 35,
            height: 65,
            width: 65,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome5 name="video" color="white" size={35} />
        </View>
      </TouchableOpacity>
    </View>
  </BlurModal>
);

export default CallModal;
