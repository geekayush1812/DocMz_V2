import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import BlurModal from './BlurModal';
import {
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_BACKGROUND,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import DmzButton from '../../atoms/DmzButton/DmzButton';

const AddHealthCare = ({visible, onCancel, onUpdate = () => {}}) => {
  const [details, setDetails] = useState({
    doctorName: '',
  });
  const [error, setError] = useState({
    doctorName: true,
  });

  const SetDetails = (detailName, value) => {
    const reg = /^[a-zA-Z]+\s?[a-zA-Z]+$/;
    const match = reg.test(value);
    setError({...error, [`${detailName}`]: match});
    setDetails({...details, [`${detailName}`]: value});
  };

  const onPressUpdate = () => {
    let flag = false;

    for (let e in error) {
      if (!error[`${e}`]) {
        flag = true;
        break;
      }
    }
    if (flag) {
      console.log('invalid input');
    } else {
      onUpdate(details);
    }
  };
  return (
    <BlurModal {...{visible, onCancel}}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 20,
          marginBottom: 15,
        }}>
        Add Doctor
      </Text>
      <TextInput
        value={details.doctorName}
        onChangeText={(text) => SetDetails('doctorName', text)}
        placeholderTextColor={INPUT_PLACEHOLDER}
        placeholder="Doctor's name"
        style={[styles.text, !error.doctorName && {borderBottomColor: 'red'}]}
      />

      <DmzButton
        onPress={() => {
          onPressUpdate();
        }}
        style={{
          Text: {
            width: '100%',
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Montserrat-SemiBold',
          },
          Container: {
            width: '100%',
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            marginTop: 30,
            elevation: 3,
          },
        }}
        text="UPDATE"
      />
      <View style={{marginTop: '15%'}}>
        <Text style={{textAlign: 'center'}}>
          Concerned Doctor not available?
        </Text>
        <Text style={{textAlign: 'center', color: '#37acac'}}>
          Invite them to join DocEz
        </Text>
      </View>
      <DmzButton
        onPress={() => {
          onPressUpdate();
        }}
        style={{
          Text: {
            width: '100%',
            textAlign: 'center',
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Montserrat-SemiBold',
          },
          Container: {
            width: '100%',
            height: 46,
            borderRadius: 25,
            backgroundColor: SECONDARY_COLOR,
            alignSelf: 'center',
            marginTop: 30,
            elevation: 3,
          },
        }}
        text="UPDATE"
      />
    </BlurModal>
  );
};

export default AddHealthCare;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    alignSelf: 'stretch',
    borderBottomWidth: 1.5,
    borderColor: NEW_PRIMARY_BACKGROUND,
    padding: 5,
    marginBottom: 7,
  },
});
