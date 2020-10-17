/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import {
  PRIMARY_COLOR,
  TERTIARY_TEXT,
  NEW_PRIMARY_BACKGROUND,
  SEARCH_PLACEHOLDER_COLOR,
  NEW_HEADER_TEXT,
  SECONDARY_COLOR,
} from '../../../styles/colors';
function SignupSplash({onPress, signupAs, setSignupAs}) {
  return (
    <View style={{justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
      <DmzText text="Welcome!" style={styles.HeaderText} />
      <DmzText style={styles.HeaderDesc} text="Choose your account type" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 50,
        }}>
        <TouchableOpacity
          onPress={() => {
            setSignupAs('patient');
            onPress();
          }}>
          <Image
            source={require('../../../assets/icons/patienticon.png')}
            style={{height: 140, width: 140}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSignupAs('doctor');
            onPress();
          }}>
          <Image
            source={require('../../../assets/icons/doctoricon.png')}
            style={{height: 140, width: 140}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderText: {
    fontSize: 35,
    fontFamily: 'Montserrat-Bold',
    color: NEW_HEADER_TEXT,
    marginTop: 40,
    width: '100%',
    textAlign: 'center',
    lineHeight: 50,
  },
  HeaderDesc: {
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 22,
    color: NEW_HEADER_TEXT,
    marginTop: 5,
    width: '100%',
    textAlign: 'center',
    opacity: 1,
    letterSpacing: 0.8,
  },
});

export default SignupSplash;
