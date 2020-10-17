/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import StepsTracker from '../../../components/atoms/StepsTracker/StepsTracker';
import TextInputIcon from '../../../components/atoms/TextInputCustom/TextInputIcon';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import ImagePlaceholder from '../../../assets/svg/imagePlaceholder.svg';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import {
  TERTIARY_TEXT,
  HEADER_TEXT,
  PRIMARY_COLOR,
  NEW_PRIMARY_COLOR,
  NEW_HEADER_TEXT,
  SECONDARY_COLOR,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';

const height = Dimensions.get('screen').height;

export default function SignUpStep2Screen(props) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [validated, setValidated] = useState([true, true, true, true]);
  const inputRefs = [null, null, null, null];
  const {signupAs} = props;
  let timeout = null;

  useEffect(() => {
    if (otp.join('').length > 0) {
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        let newValidated = [...validated];
        otp.forEach((letter, i) => (newValidated[i] = letter?.length === 1));
        setValidated(newValidated);
      }, 500);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [otp]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
        contentContainerStyle={{alignItems: 'center', flex: 1}}>
        <StepsTracker
          text="Step 2"
          textStyle={{
            fontSize: 16,
            color: NEW_HEADER_TEXT,
          }}
          completed={signupAs === 'doctor' ? 50 : 100}
          mode={signupAs === 'doctor' ? [25, 50, 75, 100] : [50, 100]}
          completedColor={NEW_PRIMARY_COLOR}
          incompletedColor={'#F8F7FF'}
        />

        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
          <View style={{margin: 40, alignItems: 'center'}}>
            <Text
              style={{
                color: NEW_HEADER_TEXT,
                fontSize: 30,
                fontFamily: 'Montserrat-Bold',
              }}>
              Verify your email
            </Text>
            <Text
              style={{
                color: NEW_HEADER_TEXT,
                fontSize: 18,
                textAlign: 'center',
                marginHorizontal: 30,
                letterSpacing: 0.3,
                fontFamily: 'Montserrat-Regular',
                marginTop: 10,
              }}>
              Please enter the 4 digit OTP sent to you
            </Text>
          </View>

          <View style={{flexDirection: 'row', marginTop: 15}}>
            {[0, 1, 2, 3].map((i) => (
              <TextInput
                //   maxLength={1}
                style={[
                  styles.inputStyle,
                  !validated[i] && {borderBottomColor: 'red'},
                ]}
                keyboardType="number-pad"
                value={otp[i]}
                onChangeText={(text) => {
                  inputRefs[i + 1]?.focus();
                  const newOtp = [...otp];
                  newOtp[i] = text[0];
                  setOtp(newOtp);
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace' && i > 0) {
                    inputRefs[i - 1].focus();
                    const newOtp = [...otp];
                    newOtp[i - 1] = '';
                    setOtp(newOtp);
                  }
                }}
                ref={(ref) => (inputRefs[i] = ref)}
                textStyle={styles.textStyle}
              />
            ))}
          </View>

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
                borderRadius: 23,
                backgroundColor: SECONDARY_COLOR,
                alignSelf: 'center',
                marginTop: 40,
                elevation: 2,
                marginBottom: 5,
              },
            }}
            text={signupAs === 'doctor' ? 'Next' : 'CONFIRM'}
          />
          <View
            style={{
              flexDirection: 'row',
              margin: 15,
              marginBottom: 10,
            }}>
            <Text style={{fontFamily: 'Montserrat-Regular'}}>
              Didn't recieve OTP?{' '}
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: NEW_PRIMARY_BACKGROUND,
                  fontFamily: 'Montserrat-Bold',
                }}>
                {'  '}Resend
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                color: NEW_PRIMARY_BACKGROUND,
                fontSize: 12,
                fontFamily: 'Montserrat-Medium',
              }}>
              Change email address
            </Text>
          </TouchableOpacity>
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
    width: 50,
    borderBottomColor: NEW_HEADER_TEXT,
    borderBottomWidth: 1,
    height: 'auto',
    alignSelf: 'center',
    marginHorizontal: 5,
    textAlign: 'center',
  },
  textStyle: {
    color: NEW_HEADER_TEXT,
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
});
