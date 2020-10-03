import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  PermissionsAndroid,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {NEW_PRIMARY_COLOR, GREY_OUTLINE} from '../../../styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import {Host} from '../../../utils/connection';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {resetStore} from '../../../redux/action/auth';
import ImagePicker from 'react-native-image-picker';
import {
  UploadProfilePicPatient,
  GetPatientInfo,
  UpdateProfile,
} from '../../../redux/action/patientAccountAction';

const NewProfile = ({navigation}) => {
  const {data} = useSelector((state) => state.AuthReducer);
  const {patient} = useSelector((state) => state.PatientAccountReducer);
  const [credential, setCredential] = useState({
    name: '',
    age: '',
    gender: '',
  });
  const [popupHeight, setPopupHeight] = useState(400);
  const animateHeightOfPopup = useRef(new Animated.Value(0)).current;
  const [popupVisible, setPopupVisible] = useState(false);
  const [aboutPopupHeight, setAboutPopupHeight] = useState(400);
  const animateHeightOfAboutPopup = useRef(new Animated.Value(0)).current;
  const [aboutPopupVisible, setAboutPopupVisible] = useState(false);
  const [imageSource, setImageSource] = useState(
    require('../../../assets/images/dummy_profile.png'),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (patient.picture) {
      setImageSource({
        uri: `${Host}${patient.picture
          .replace('public', '')
          .replace('\\\\', '/')}`,
      });
    } else {
      setImageSource(require('../../../assets/images/dummy_profile.png'));
    }
  }, [patient]);

  const onLogout = () => {
    dispatch(
      resetStore(() => {
        navigation.replace('PatientHomePage');
      }),
    );
  };

  const onPressAvatar = () => {
    animateHeightOfAboutPopup.setValue(0);
    setAboutPopupVisible(false);
    Animated.timing(animateHeightOfPopup, {
      useNativeDriver: true,
      toValue: popupVisible ? 0 : 1,
      easing: Easing.elastic(),
      duration: 500,
    }).start(() => {
      setPopupVisible(!popupVisible);
    });
  };
  const onPressDetails = () => {
    animateHeightOfPopup.setValue(0);
    setPopupVisible(false);
    Animated.timing(animateHeightOfAboutPopup, {
      useNativeDriver: true,
      toValue: aboutPopupVisible ? 0 : 1,
      easing: Easing.elastic(),
      duration: 500,
    }).start(() => {
      setAboutPopupVisible(!aboutPopupVisible);
    });
  };
  const onPopupLayoutChange = (event) => {
    setPopupHeight(event.nativeEvent.layout.height);
  };
  const onAboutPopupLayoutChange = (event) => {
    setAboutPopupHeight(event.nativeEvent.layout.height);
  };

  const onChooseCamera = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted) {
      PickCamera();
    } else {
      askPermission(PickCamera);
    }
  };
  const onChooseGallery = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted) {
      PickGallery();
    } else {
      askPermission(PickGallery);
    }
  };
  const askPermission = async (launch) => {
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
        launch();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const PickCamera = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('CameraPicker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};
        // console.log(source);
        // const path = response.uri;
        // setData({...data, imagePath: path});
        // console.log(path);
        if (data._id) {
          dispatch(
            UploadProfilePicPatient(data._id, response, () => {
              setPopupVisible(!popupVisible);
              animateHeightOfPopup.setValue(0);
              dispatch(GetPatientInfo(data._id));
            }),
          );
        } else {
          alert('You need to login first');
        }
      }
    });
  };
  const PickGallery = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.error) {
        console.log('Gallery picker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};
        // console.log(source);
        // const path = response.uri;
        // setData({...data, imagePath: path});
        // console.log(path);
        if (data._id) {
          dispatch(
            UploadProfilePicPatient(data._id, response, () => {
              setPopupVisible(!popupVisible);
              animateHeightOfPopup.setValue(0);
              dispatch(GetPatientInfo(data._id));
            }),
          );
        } else {
          alert('You need to login first');
        }
      }
    });
  };

  const onUpdateDetails = () => {
    const name = credential.name.split(' ');
    const profileData = {
      firstName: name[0],
      lastName: name[1],
      age: credential.age,
      gender: credential.gender,
    };
    dispatch(UpdateProfile(profileData, data._id));
  };

  const [errorInCredential, setErrorInCredential] = useState({
    name: true,
    age: true,
    gender: true,
  });

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
  const onChangeCredential = (type, value) => {
    const string = /^[a-zA-Z]+\s?[a-zA-Z]+$/;
    const number = /^[0-9]+$/;
    let match;
    switch (type) {
      case 'name':
        match = string.test(value);
        break;
      case 'age':
        match = number.test(value);
        break;
      case 'gender':
        match = string.test(value);
        break;
    }
    setErrorInCredential({...errorInCredential, [`${type}`]: match});
    setCredential({...credential, [`${type}`]: value});
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopNavBar
        headerText="My Profile"
        {...{navigation}}
        style={{Container: {marginTop: 5, marginBottom: 10}}}
      />
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 15,
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={onPressAvatar}>
            <Image
              source={imageSource}
              style={{height: 120, width: 120, borderRadius: 60, margin: 15}}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressDetails}
            style={{alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 20,
              }}>
              {(data.firstName ?? '') + ' ' + (data.lastName ?? '')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: 170,
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <View
                style={{
                  padding: 1,
                  alignItems: 'center',
                  borderColor: NEW_PRIMARY_COLOR,
                  borderRightWidth: 1.5,
                  flex: 1,
                }}>
                <Text style={styles.smallText}>27 yrs</Text>
              </View>

              <View
                style={{
                  padding: 1,
                  alignItems: 'center',
                  borderColor: NEW_PRIMARY_COLOR,
                  borderLeftWidth: 1.5,
                  flex: 1,
                }}>
                <Text style={styles.smallText}>Male</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 30, marginVertical: 15}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MedicalHistory', {})}>
            <View style={styles.listRow}>
              <Image
                source={require('../../../assets/icons/profile/history.png')}
                style={{height: 25, width: 50, marginHorizontal: 10}}
                resizeMode="contain"
              />
              <Text style={[styles.smallText, {flex: 1}]}>Medical History</Text>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={styles.rowRightIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('FamilyMember', {})}>
            <View style={styles.listRow}>
              <Image
                source={require('../../../assets/icons/profile/family.png')}
                style={{height: 25, width: 50, marginHorizontal: 10}}
                resizeMode="contain"
              />
              <Text style={[styles.smallText, {flex: 1}]}>My Family</Text>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={styles.rowRightIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('HealthCare', {})}>
            <View style={styles.listRow}>
              <Image
                source={require('../../../assets/icons/profile/healthcare.png')}
                style={{height: 25, width: 50, marginHorizontal: 10}}
                resizeMode="contain"
              />
              <Text style={[styles.smallText, {flex: 1}]}>
                My Healthcare Team
              </Text>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={styles.rowRightIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Appointments', {})}>
            <View style={styles.listRow}>
              <Image
                source={require('../../../assets/icons/profile/referals.png')}
                style={{height: 30, width: 50, marginHorizontal: 10}}
                resizeMode="contain"
              />
              <Text style={[styles.smallText, {flex: 1}]}>My Appointments</Text>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={styles.rowRightIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('MyDoctors')}>
            <View style={styles.listRow}>
              <Image
                source={require('../../../assets/icons/profile/coupons.png')}
                style={{height: 20, width: 50, marginHorizontal: 10}}
                resizeMode="contain"
              />
              <Text style={[styles.smallText, {flex: 1}]}>My Doctors</Text>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={styles.rowRightIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLogout}>
            <View style={styles.listRow}>
              <View
                style={{
                  height: 20,
                  width: 50,
                  marginHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialIcon name={'lock'} size={36} color={'#047b7b'} />
              </View>

              <Text style={[styles.smallText, {flex: 1}]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginVertical: 20,
          }}>
          <Text style={[styles.smallText, {marginRight: 10}]}>Link with</Text>

          <Image
            source={require('../../../assets/icons/profile/google.png')}
            style={{height: 25, width: 25, marginHorizontal: 10}}
            resizeMode="contain"
          />

          <Image
            source={require('../../../assets/icons/profile/facebook.png')}
            style={{height: 25, width: 25, marginHorizontal: 10}}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
      <Animated.View
        onLayout={onPopupLayoutChange}
        style={{
          width: '100%',
          height: '30%',
          backgroundColor: '#e6f7f5',
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingVertical: '10%',
          paddingHorizontal: '10%',
          alignItems: 'center',
          justifyContent: 'space-between',
          transform: [
            {
              translateY: animateHeightOfPopup.interpolate({
                inputRange: [0, 1],
                outputRange: [popupHeight, 0],
              }),
            },
          ],
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>
          Update Profile Picture
        </Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{alignItems: 'center', flex: 1}}>
            <TouchableOpacity
              onPress={onChooseGallery}
              style={{
                backgroundColor: '#37acac',
                padding: '15%',
                borderRadius: 100,
              }}>
              <FontAwesomeIcon name={'photo'} size={32} color={'#fff'} />
            </TouchableOpacity>
            <Text style={{marginTop: '2%'}}>Gallery</Text>
          </View>

          <View style={{alignItems: 'center', flex: 1}}>
            <TouchableOpacity
              onPress={onChooseCamera}
              style={{
                backgroundColor: '#37acac',
                padding: '15%',
                borderRadius: 100,
              }}>
              <FontAwesomeIcon name={'camera'} size={32} color={'#fff'} />
            </TouchableOpacity>
            <Text style={{marginTop: '2%'}}>Camera</Text>
          </View>

          <View style={{alignItems: 'center', flex: 1}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#37acac',
                padding: '15%',
                borderRadius: 100,
              }}>
              <MaterialIcon name={'delete'} size={32} color={'#fff'} />
            </TouchableOpacity>
            <Text style={{marginTop: '2%'}}>Remove Photo</Text>
          </View>
        </View>
      </Animated.View>
      <Animated.View
        onLayout={onAboutPopupLayoutChange}
        style={{
          width: '100%',
          height: '30%',
          backgroundColor: '#e6f7f5',
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingVertical: '5%',
          paddingHorizontal: '10%',
          alignItems: 'center',
          justifyContent: 'space-around',
          transform: [
            {
              translateY: animateHeightOfAboutPopup.interpolate({
                inputRange: [0, 1],
                outputRange: [aboutPopupHeight, 0],
              }),
            },
          ],
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>
          Update Profile Details
        </Text>
        <View style={{width: '75%'}}>
          <TextInput
            onChangeText={(name) => onChangeCredential('name', name)}
            placeholder={'Name'}
            style={[
              {
                borderBottomWidth: 1,
                borderBottomColor: '#047b7b',
                paddingVertical: '2%',
                marginBottom: '2%',
              },
              !errorInCredential.name && {borderBottomColor: 'red'},
            ]}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              placeholder={'Age'}
              onChangeText={(age) => onChangeCredential('age', age)}
              keyboardType={'number-pad'}
              style={[
                {
                  borderBottomWidth: 1,
                  borderBottomColor: '#047b7b',
                  paddingVertical: '2%',
                  paddingRight: '9%',
                },
                !errorInCredential.age && {borderBottomColor: 'red'},
              ]}
            />
            <TextInput
              placeholder={'Gender'}
              onChangeText={(gender) => onChangeCredential('gender', gender)}
              style={[
                {
                  borderBottomWidth: 1,
                  borderBottomColor: '#047b7b',
                  paddingVertical: '2%',
                  paddingRight: '9%',
                },
                !errorInCredential.gender && {borderBottomColor: 'red'},
              ]}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={onUpdateDetails}
          style={{
            backgroundColor: '#047b7b',
            paddingVertical: '3%',
            paddingHorizontal: '5%',
            borderRadius: 10,
            marginTop: '5%',
          }}>
          <Text style={{fontSize: 16, color: '#fff'}}>SUBMIT</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default NewProfile;

const styles = StyleSheet.create({
  smallText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  listRow: {
    flexDirection: 'row',
    // paddingVertical: 15,
    borderColor: GREY_OUTLINE,
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 60,
  },
  rowRightIcon: {
    height: 15,
    width: 20,
    transform: [{rotateZ: '180deg'}],
  },
});
