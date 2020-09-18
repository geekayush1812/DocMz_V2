import React, {useEffect} from 'react';
import {Text, View, Modal, Image} from 'react-native';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import {SECONDARY_COLOR} from '../../../styles/colors';
import {cos} from 'react-native-reanimated';
import ConfirmAppointment from '../ConfirmAppointment/ConfirmAppointment';
import BlurModal from './BlurModal';

const ConfirmAppointmentModel = ({visible, onYes, onNo}) => {
  return (
    <BlurModal backgroundColor="#ffffff" visible={visible} animationType="fade">
      <View
        style={{
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5%',
          borderRadius: 0,
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 18,
            textAlign: 'center',
            marginTop: '5%',
            marginBottom: '12%',
          }}>
          Are you sure you wish to pay and confirm{'\n'}the appointment?
        </Text>

        <View style={{flexDirection: 'row'}}>
          <DmzButton
            onPress={onNo}
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              },
              Container: {
                width: '60%',
                height: 46,
                borderRadius: 25,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                elevation: 3,
                marginHorizontal: '5%',
              },
            }}
            text="NO"
          />
          <DmzButton
            onPress={onYes}
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              },
              Container: {
                width: '60%',
                height: 46,
                borderRadius: 25,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                elevation: 3,
                marginHorizontal: '5%',
              },
            }}
            text="YES"
          />
        </View>
      </View>
    </BlurModal>
  );
};
export default ConfirmAppointmentModel;
