/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import StepsTracker from '../../../components/atoms/StepsTracker/StepsTracker';
import TextInputIcon from '../../../components/atoms/TextInputCustom/TextInputIcon';
import {
  TERTIARY_TEXT,
  HEADER_TEXT,
  PRIMARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
  NEW_PRIMARY_COLOR,
  NEW_HEADER_TEXT,
  SECONDARY_COLOR,
  INPUT_PLACEHOLDER,
} from '../../../styles/colors';

const height = Dimensions.get('screen').height;

export default function SignUpStep4Screen(props) {
  const {credential, setCredential, isLoading} = props;
  const handlePhone = (phone) => {
    setCredential({...credential, phone});
  };
  const handleCity = (city) => {
    setCredential({...credential, city});
  };
  const handleCountry = (country) => {
    setCredential({...credential, country});
  };
  const reg = new RegExp(/^([0-9]{10})$/);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
        }}
        contentContainerStyle={{flex: 1, backgroundColor: 'white'}}>
        <StepsTracker
          text="Step 4"
          textStyle={{
            fontSize: 16,
            color: NEW_HEADER_TEXT,
          }}
          completed={100}
          completedColor={NEW_PRIMARY_COLOR}
          incompletedColor={'#F8F7FF'}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'white',
            overflow: 'hidden',
          }}>
          <Text
            style={{
              fontSize: 30,
              color: NEW_HEADER_TEXT,
              marginBottom: 20,
              alignSelf: 'center',
              fontFamily: 'Montserrat-Bold',
            }}>
            Contact Details
          </Text>

          <TextInputIcon
            placeholder="Phone Number"
            inputHandler={handlePhone}
            keyboardType="number-pad"
            placeholderTextColor={INPUT_PLACEHOLDER}
            style={styles.inputStyle}
            textStyle={styles.textStyle}
            maxLength={10}
            validationCallback={() => reg.test(credential.phone)}
            value={credential.phone}
          />
          <TextInputIcon
            placeholder="City of Residence"
            inputHandler={handleCity}
            placeholderTextColor={INPUT_PLACEHOLDER}
            style={styles.inputStyle}
            textStyle={styles.textStyle}
            validationCallback={() => credential.city.length > 0}
            value={credential.city}
          />
          <TextInputIcon
            placeholder="Country"
            inputHandler={handleCountry}
            placeholderTextColor={INPUT_PLACEHOLDER}
            style={styles.inputStyle}
            textStyle={styles.textStyle}
            validationCallback={() => credential.country.length > 0}
            value={credential.country}
          />
          <DmzButton
            onPress={props.onPress}
            style={{
              Text: {
                width: '100%',
                textAlign: 'center',
                color: 'white',
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
              },
              Container: {
                width: 250,
                height: 46,
                borderRadius: 26,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                marginTop: 60,
                elevation: 2,
                marginBottom: 10,
              },
            }}
            text="SUBMIT"
            isLoading={isLoading}
            disabled={isLoading}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            paddingTop: 5,
            paddingBottom: 15,
          }}>
          <Image
            source={require('../../../assets/icons/docmz.png')}
            style={{height: 21, width: 91}}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    width: '65%',
    borderBottomColor: NEW_PRIMARY_COLOR,
    borderBottomWidth: 1,
    height: 'auto',
    alignSelf: 'center',
  },
  textStyle: {
    color: NEW_HEADER_TEXT,
    fontSize: 13,
    marginTop: 20,
    fontFamily: 'Montserrat-Medium',
  },
});
