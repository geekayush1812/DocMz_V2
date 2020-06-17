/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-root-toast';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import TextInputIcon from '../../../components/atoms/TextInputCustom/TextInputIcon';
import LoginAsPatient from '../../../assets/svg/LoginAsPatient.svg';
import LoginAsDoctor from '../../../assets/svg/LoginAsDoctor.svg';
import Check from '../../../assets/svg/check.svg';
import {useDispatch} from 'react-redux/lib/hooks/useDispatch';
import {LoginDoctor, LoginPatient} from '../../../redux/action/auth';
import {call} from 'react-native-reanimated';
import {useSelector} from 'react-redux/lib/hooks/useSelector';

export default function DmzLoginV2(props) {
  const [credential, setCredential] = useState({email: '', password: ''});
  const [loginAs, setLoginAs] = useState('patient');
  const {isLoading} = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const handleEmail = (email) => {
    setCredential({...credential, email});
  };
  const handlePassword = (pass) => {
    setCredential({...credential, password: pass});
  };

  const handlePatientLogin = () => {
    dispatch(LoginPatient(credential, successCallback, errorCallback));
  };
  const handleDoctorLogin = () => {
    dispatch(LoginDoctor(credential, successCallback, errorCallback));
  };

  const handleLogin = () => {
    const reg = new RegExp(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    );
    const {email, password} = credential;
    if (email !== '' && password !== '' && reg.test(email)) {
      loginAs === 'patient' && handlePatientLogin();
      loginAs === 'doctor' && handleDoctorLogin();
    } else {
      Alert.alert('input in not correct');
    }
  };
  const successCallback = (successResponce) => {
    showTost(successResponce.message.toString(), () => {
      props.navigation.navigate('pageNavigation');
    });
  };

  const errorCallback = (faildResponce) => {
    Alert.alert(faildResponce.message);
    showTost(faildResponce.message, () => {});
    console.log(`PatientLoginAction(error):  ${faildResponce.message}`);
  };
  const showTost = (msg = '...', callback) => {
    Toast.show(msg, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      },
    });
    callback && callback();
  };
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 80, y: 0}}
        useAngle
        angle={100}
        colors={[
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 1)',
          'rgba(2, 126, 151, 0)',
          'rgba(2, 126, 151, 0.3)',
        ]}
        style={{flex: 1, opacity: 0.4}}
      />
      <View style={styles.MainContainer}>
        <DmzText text="Welcome!" style={styles.HeaderText} />
        <DmzText style={styles.HeaderDesc} text="Choose Account Type" />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 25,
          }}>
          <TouchableOpacity
            onPress={() => {
              setLoginAs('patient');
            }}>
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 12,
                position: 'relative',
              }}>
              <LoginAsPatient height={120} width={120} />
              {loginAs === 'patient' && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -15,
                    left: '50%',
                    transform: [
                      {
                        translateX: -15,
                      },
                    ],
                    height: 30,
                    width: 30,
                    borderRadius: 20,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Check height={16} width={16} />
                </View>
              )}
            </View>
            <Text
              style={{
                color: '#007E96',
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 10,
                width: '100%',
                textAlign: 'center',
              }}>
              PATIENT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setLoginAs('doctor');
            }}>
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 11,
              }}>
              <LoginAsDoctor height={120} width={120} />
              {loginAs === 'doctor' && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -15,
                    left: '50%',
                    transform: [
                      {
                        translateX: -15,
                      },
                    ],
                    height: 30,
                    width: 30,
                    borderRadius: 20,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Check height={16} width={16} />
                </View>
              )}
            </View>
            <Text
              style={{
                color: '#007E96',
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 10,
                width: '100%',
                textAlign: 'center',
              }}>
              DOCTOR
            </Text>
          </TouchableOpacity>
        </View>
        <DmzText
          style={{
            fontWeight: 'normal',
            fontSize: 16,
            lineHeight: 19,
            textAlign: 'center',
            color: 'rgba(0, 0, 0, 0.25)',
            marginTop: 40,
            marginLeft: 'auto',
            marginRight: 'auto',
            alignSelf: 'center',
          }}
          text="Hello patient"
        />
        <View
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <DmzText
            style={{
              fontWeight: 'normal',
              fontSize: 16,
              lineHeight: 19,
              textAlign: 'center',
              color: 'rgba(0, 0, 0, 0.25)',
              marginHorizontal: 15,
            }}
            text="Please fill out the form below to get started"
          />
        </View>
        <TextInputIcon
          style={styles.inputContainer}
          inputHandler={handleEmail}
          textContentType="emailAddress"
          textStyle={{
            paddingLeft: 20,
            color: '#027E97',
            fontSize: 14,
            fontWeight: '700',
            flex: 1,
          }}
          hasIcon={true}
          iconName="email"
          placeholder="Email Id"
          iconStyle={{alignSelf: 'center'}}
          iconColor="rgba(0, 0, 0, 0.15)"
          size={30}
        />
        <TextInputIcon
          style={styles.inputContainer}
          textStyle={{
            paddingLeft: 20,
            color: '#027E97',
            fontSize: 14,
            fontWeight: '700',
            flex: 1,
          }}
          hasIcon={true}
          inputHandler={handlePassword}
          iconName="lock"
          placeholder="Password"
          iconStyle={{alignSelf: 'center'}}
          iconColor="rgba(0, 0, 0, 0.15)"
          size={30}
        />
        <DmzButton
          onPress={handleLogin}
          style={{
            Text: {
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: 16,
            },
            Container: {
              width: 131,
              height: 46,
              borderRadius: 17,
              backgroundColor: '#FF7A59',
              alignSelf: 'center',
              marginTop: 40,
              elevation: 10,
            },
          }}
          text="SIGN IN"
          isLoading={isLoading}
          disabled={isLoading}
        />
        <DmzText
          style={{
            textAlign: 'center',
            color: 'rgba(0, 0, 0, 0.25)',
            fontSize: 14,
            marginTop: 10,
            marginLeft: '30%',
          }}
          text="No account ?"
          children={
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('signupScreen');
              }}>
              <DmzText
                style={{
                  color: '#FF7A59',
                  textAlign: 'center',
                  fontSize: 14,
                  marginTop: 10,
                  paddingLeft: 10,
                }}
                text="Sign Up"
              />
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: '85%',
    borderBottomColor: 'rgba(2, 126, 151, 0.48)',
    borderBottomWidth: 0.5,
    height: 'auto',
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  MainContainer: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  HeaderText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#027E97',
    marginTop: 40,
    width: '100%',
    textAlign: 'center',
    lineHeight: 50,
  },
  HeaderDesc: {
    fontSize: 18,
    fontWeight: 'normal',
    lineHeight: 18,
    color: '#027E97',
    marginTop: 10,
    width: '100%',
    textAlign: 'center',
    opacity: 1,
    letterSpacing: 0.8,
  },
});