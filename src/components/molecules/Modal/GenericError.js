import React, {useEffect} from 'react';
import {Text, View, Modal, Image} from 'react-native';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import {SECONDARY_COLOR} from '../../../styles/colors';
import {cos} from 'react-native-reanimated';

const GenericError = ({visible, onCancel}) => {
  return (
    <Modal backgroundColor="#ffffff" visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
        <Image
          source={require('../../../assets/icons/error2.png')}
          style={{height: 70, width: 70, marginBottom: 20}}
        />

        <Text style={{fontSize: 28, fontFamily: 'Montserrat-Bold'}}>Oops!</Text>

        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 18,
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 30,
            paddingHorizontal: 20,
          }}>
          There seems to be a{'\n'}problem with that!
        </Text>

        <DmzButton
          onPress={onCancel}
          style={{
            Text: {
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            },
            Container: {
              width: 250,
              height: 46,
              borderRadius: 25,
              backgroundColor: SECONDARY_COLOR,
              alignSelf: 'center',
              elevation: 3,
            },
          }}
          text="OKAY"
        />
      </View>
    </Modal>
  );
};
export default GenericError;
