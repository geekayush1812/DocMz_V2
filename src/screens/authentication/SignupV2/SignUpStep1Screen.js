/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DmzText from '../../../components/atoms/DmzText/DmzText';
import TextInputIcon from '../../../components/atoms/TextInputCustom/TextInputIcon';
import DmzButton from '../../../components/atoms/DmzButton/DmzButton';
import StepsTracker from '../../../components/atoms/StepsTracker/StepsTracker';
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

import {AccessToken, LoginManager, LoginButton} from 'react-native-fbsdk';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import UserProfile from '../../../assets/svg/male_profile.svg';

export default function SignUpStep1Screen(props) {
  const {
    credential,
    setCredential,
    isLoading,
    onChoosePicture,
    imageData,
  } = props;
  const handleFirstName = (firstName) => {
    setCredential({...credential, firstName});
  };
  const handleLastName = (lastName) => {
    setCredential({...credential, lastName});
  };
  const handleEmail = (email) => {
    setCredential({...credential, email});
  };
  const handlePassword = (password) => {
    setCredential({...credential, password});
  };

  const [passVisible, setPass] = useState(false);
  const viewPassword = () => {
    setPass(!passVisible);
  };
  const reg = new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  );

  const {signupAs} = props;

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       '842595327422-50cmpri327rrhqgb76o8hn58954l80i1.apps.googleusercontent.com',
  //     // '548402708395-t0qn9hg90h8cfaadtg8epf7m0s0uunr4.apps.googleusercontent.com',
  //   });
  //   const val = async () => {
  //     const isSignedIn = await GoogleSignin.isSignedIn();
  //     console.log('111111111111', isLoading, '111111111111', isSignedIn);
  //   };
  //   val();
  // });
  console.log(props.signupAs);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={{
          // position: 'absolute',
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}>
        <StepsTracker
          text="Step 1"
          textStyle={{
            fontSize: 16,
            color: NEW_HEADER_TEXT,
          }}
          completed={signupAs === 'doctor' ? 33 : 50}
          mode={signupAs === 'doctor' ? [25, 50, 75, 100] : [50, 100]}
          completedColor={NEW_PRIMARY_COLOR}
          incompletedColor={'#F8F7FF'}
        />
        <DmzText
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            fontSize: 35,
            color: NEW_HEADER_TEXT,
            marginTop: 20,
            width: '100%',
            textAlign: 'center',
            lineHeight: 46,
            paddingHorizontal: 20,
            fontFamily: 'Montserrat-Bold',
          }}
          text="Hey there!"
        />
        {/* <Image
          source={require('../../../assets/images/doc_2.png')}
          style={{
            alignSelf: 'center',
            transform: [{scale: 0.9}],
          }}
          resizeMode="cover"
          resizeMethod="scale"
        /> */}
        <TouchableOpacity
          onPress={onChoosePicture}
          style={{
            backgroundColor: '#ededed',
            height: 100,
            width: 100,
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 64,
            alignSelf: 'center',
          }}>
          {imageData?.uri ? (
            <Image
              source={{uri: imageData.uri}}
              style={{height: '100%', width: '100%', resizeMode: 'contain'}}
            />
          ) : (
            <UserProfile />
          )}
        </TouchableOpacity>
        <TextInputIcon
          placeholder="First Name"
          inputHandler={handleFirstName}
          placeholderTextColor={INPUT_PLACEHOLDER}
          style={styles.inputStyle}
          textStyle={styles.textStyle}
          validationCallback={() => credential.firstName != ''}
          value={credential.firstName}
        />
        <TextInputIcon
          placeholder="Last Name"
          inputHandler={handleLastName}
          placeholderTextColor={INPUT_PLACEHOLDER}
          style={styles.inputStyle}
          textStyle={styles.textStyle}
          validationCallback={() => credential.lastName != ''}
          value={credential.lastName}
        />
        <TextInputIcon
          placeholder="Email"
          inputHandler={handleEmail}
          keyboardType={'email-address'}
          placeholderTextColor={INPUT_PLACEHOLDER}
          style={styles.inputStyle}
          textStyle={styles.textStyle}
          validationCallback={() => reg.test(credential.email)}
          value={credential.email}
        />
        <TextInputIcon
          hasIcon={true}
          iconName={passVisible ? 'eye' : 'eye-off'}
          validationCallback={() => credential.password.length >= 4}
          size={25}
          iconPos="right"
          secureTextEntry={!passVisible}
          onPress={viewPassword}
          placeholder="Password"
          inputHandler={handlePassword}
          placeholderTextColor={INPUT_PLACEHOLDER}
          style={styles.inputStyle}
          iconStyle={{
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          textStyle={[styles.textStyle, {width: '83%'}]}
          value={credential.password}
        />
        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignSelf: 'center',
            marginTop: 30,
          }}>
          {/* <EvilIcons
            onPress={() => {
              LoginManager.logInWithPermissions(['public_profile']).then(
                function (result) {
                  if (result.isCancelled) {
                    console.log('Login cancelled');
                  } else {
                    console.log(
                      'Login success with permissions: ' +
                        result.grantedPermissions.toString(),
                    );
                    AccessToken.getCurrentAccessToken().then((data) => {
                      console.log(data.accessToken.toString());
                      fetch(
                        'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
                          data.accessToken.toString(),
                      )
                        .then((response) => response.json())
                        .then((json) => {
                          // Some user object has been set up somewhere, build that user here
                          console.log(json);
                        })
                        .catch(() => {
                          alert('ERROR GETTING DATA FROM FACEBOOK');
                        });
                    });
                  }
                },
                function (error) {
                  console.log('Login fail with error: ' + error);
                },
              );
            }}
            name="sc-facebook"
            color="#EA508F"
            size={35}
          />
          <EvilIcons name="sc-twitter" color="#EA508F" size={35} />
          <EvilIcons
            onPress={async () => {
              onGoogleButtonPress().then(() =>
                console.log('Signed in with Google!'),
              );
              // console.log('inGoogle');
              // try {
              //   await GoogleSignin.hasPlayServices();
              //   console.log('inner');
              //   const userInfo = await GoogleSignin.signIn();
              //   console.log(userInfo);
              //   const currentUser = await GoogleSignin.getCurrentUser();
              //   console.log(currentUser);
              // } catch (error) {
              //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              //     // user cancelled the login flow
              //     console.log(error);
              //   } else if (error.code === statusCodes.IN_PROGRESS) {
              //     console.log(error);
              //     // operation (e.g. sign in) is in progress already
              //   } else if (
              //     error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
              //   ) {
              //     console.log(error);
              //     // play services not available or outdated
              //   } else {
              //     console.log(error);
              //     // some other error happened
              //   }
              // }
            }}
            name="sc-google-plus"
            color="#EA508F"
            size={35}
          /> */}
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
              marginTop: 2,
              elevation: 3,
            },
          }}
          text="Next"
          isLoading={isLoading}
          disabled={isLoading}
        />
        <TouchableOpacity
          style={{alignSelf: 'center', marginBottom: 20}}
          onPress={() => {
            props.navigation.navigate('loginScreen');
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: NEW_HEADER_TEXT,
              fontSize: 14,
              marginTop: 15,
              fontFamily: 'Montserrat-Regular',
            }}>
            Already have an account?
            <Text
              style={{
                color: NEW_PRIMARY_BACKGROUND,
                fontFamily: 'Montserrat-Bold',
              }}>
              {'   '}
              Sign In
            </Text>
          </Text>
        </TouchableOpacity>
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
    width: '70%',
    borderBottomColor: NEW_PRIMARY_COLOR,
    borderBottomWidth: 1,
    height: 'auto',
    alignSelf: 'center',
  },
  textStyle: {
    color: NEW_HEADER_TEXT,
    fontSize: 14,
    marginTop: 15,
    width: '100%',
    fontFamily: 'Montserrat-Medium',
  },
});
