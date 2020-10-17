import React, {createRef, useState} from 'react';
import {View, StyleSheet, PermissionsAndroid, Image} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import SignupSplash from './SignupSplash';
import SignUpStep1Screen from './SignUpStep1Screen';
import SignUpStep3Screen from './SignUpStep3Screen';
import SignUpStep4Screen from './SignUpStep4Screen';
import ImagePicker from 'react-native-image-picker';
import {signupDoctor, signupPatient} from '../../../redux/action/auth';
import Toast from 'react-native-root-toast';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {UploadProfilePic} from '../../../redux/action/doctoreAction';
import {UploadProfilePicPatient} from '../../../redux/action/patientAccountAction';
import SignUpStep2Screen from './SignUpStep2Screen';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import AlertModal from '../../../components/molecules/Modal/AlertModal';
import GenericError from '../../../components/molecules/Modal/GenericError';

// import Svg from 'react-native-svg';

function SignupV2(props) {
  const pagerRef = createRef();
  const nextpage = (page) => {
    pagerRef.current.setPage(page);
  };
  const initialCredential = credential;
  const dispatch = useDispatch();
  const {isLoading, data} = useSelector((state) => state.AuthReducer);
  // const [signupAs, setSignupAs] = useState('patient');
  const signupAs = props.navigation.state.params.loginAs;
  const [imageData, setImageData] = useState(null);
  const [modal, setModal] = useState({visible: false, text: ''});
  const [credential, setCredential] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    registration_number: '',
    specialty: '',
    phone: '',
    city: '',
    country: '',
    basic: JSON.stringify({}),
    state: '',
  });
  // const initialCredential = credential;

  const handleSubmit = () => {
    console.log('in submit');
    signupAs === 'doctor' ? _handleDoctorSignup() : _handlePatientSignup();
  };
  const _handleDoctorSignup = () => {
    console.log(credential);
    dispatch(signupDoctor(credential, successCallback, errorCallback));
  };
  const _handlePatientSignup = () => {
    console.log('in patient submit');
    dispatch(signupPatient(credential, successCallback, errorCallback));
  };

  const successCallback = () => {
    showTost('account created successfully');
    AsyncStorage.getItem('userData').then((res) => {
      const data = JSON.parse(res);
      console.log(data.id);
      console.log(imageData);
      signupAs === 'doctor'
        ? dispatch(UploadProfilePic(data.id, imageData))
        : dispatch(UploadProfilePicPatient(data.id, imageData));
      props.navigation.navigate('PatientHomePage');
    });
    //   : props.navigation.goBack(null);
    // props.navigation.goBack(null);
  };
  const errorCallback = (e) => {
    showModal(e);
    // Alert.alert('something went wrong');
    // showTost('error occured: ' + e);
  };
  const showTost = (msg = 'nothing') => {
    return Toast.show(msg, {
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
  };

  const showModal = (text) => setModal({text, visible: true});

  const onChoosePicture = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    console.log(granted);
    if (granted) {
      PickImage();
    } else {
      askPermission();
    }
  };
  const askPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'DocMz needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        PickImage();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const PickImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};
        // console.log(source);
        // const path = response.uri;
        // setData({...data, imagePath: path});
        // console.log(path);
        setImageData(response);
      }
    });
  };

  // console.log('params: ' + JSON.stringify(props.navigation));

  return (
    <>
      <GenericError
        {...modal}
        onCancel={() => {
          setModal({text: '', visible: false});
        }}
      />
      <View style={{backgroundColor: 'white', position: 'relative'}}>
        <TopNavBar
          hideRightComp={true}
          navigation={props.navigation}
          style={{
            Container: {
              height: 'auto',
              marginTop: 5,
            },
          }}
        />
      </View>
      <ViewPager
        ref={pagerRef}
        style={styles.viewPager}
        initialPage={1}
        scrollEnabled={false}>
        <View key="0">
          <SignupSplash
            credential={credential}
            setCredential={setCredential}
            signupAs={signupAs}
            setSignupAs={setSignupAs}
            onPress={() => nextpage(1)}
          />
        </View>
        <View key="1">
          <SignUpStep1Screen
            onChoosePicture={onChoosePicture}
            imageData={imageData}
            credential={credential}
            setCredential={setCredential}
            isLoading={isLoading}
            signupAs={signupAs}
            navigation={props.navigation}
            onPress={() => {
              const reg = new RegExp(
                /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
              );
              const {email, password, firstName, lastName} = credential;
              if (
                email !== '' &&
                password !== '' &&
                reg.test(email) &&
                password.length >= 4 &&
                lastName != '' &&
                firstName != ''
              ) {
                nextpage(2);
              } else {
                showModal(
                  lastName == '' && firstName == ''
                    ? 'One or more fields empty'
                    : password.length < 4
                    ? 'Password must be atleast 4 characters'
                    : reg.test(email)
                    ? 'One or more fields empty'
                    : 'Not a valid Email.',
                );
              }
            }}
          />
        </View>
        <View key="2">
          <SignUpStep2Screen
            signupAs={signupAs}
            onPress={() => {
              signupAs === 'doctor' ? nextpage(3) : handleSubmit();
            }}
          />
        </View>
        <View key="3">
          <SignUpStep3Screen
            credential={credential}
            setCredential={setCredential}
            onChoosePicture={onChoosePicture}
            imageData={imageData}
            onPress={() => {
              const {registration_number, specialty} = credential;
              if (
                registration_number !== '' &&
                specialty !== '' &&
                registration_number.length >= 4 &&
                registration_number.length <= 15
              ) {
                nextpage(4);
              } else {
                showModal(
                  registration_number == '' && specialty == ''
                    ? 'One or more fields empty'
                    : registration_number.length < 8
                    ? 'Registration No. must be atleast 8 characters'
                    : null,
                );
              }
            }}
          />
        </View>
        <View key="4">
          <SignUpStep4Screen
            credential={credential}
            setCredential={setCredential}
            isLoading={isLoading}
            onPress={() => {
              const {phone, city, country} = credential;
              if (
                phone !== '' &&
                city !== '' &&
                country !== '' &&
                phone.length == 10
              ) {
                handleSubmit();
              } else {
                showModal(
                  country == '' && city == '' && phone == ''
                    ? 'One or more fields empty'
                    : phone.length != 10
                    ? 'Incorrect Phone No.'
                    : null,
                );
              }
            }}
            onChoosePicture={onChoosePicture}
          />
        </View>
      </ViewPager>
    </>
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});

export default SignupV2;
