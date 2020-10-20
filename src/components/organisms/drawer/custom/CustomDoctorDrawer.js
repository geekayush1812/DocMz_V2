import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import Avater from '../../../atoms/Avater/Avater';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {resetStore} from '../../../../reduxV2/action/AuthAction';
import {HEADER_TEXT, TERTIARY_TEXT} from '../../../../styles/colors';
import StepsTracker from '../../../atoms/StepsTracker/StepsTracker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ToggleButton from '../../../molecules/ToggleButton/ToggleButton';
import TopNavBar from '../../../molecules/TopNavBar/TopNavBar';
import {BlockDoctor} from '../../../../reduxV2/action/DoctorAction';
import {
  UploadProfilePic,
  UpdateDoctorProfile,
  GetDoctorProfile,
} from '../../../../reduxV2/action/DoctorAction';

import {Host} from '../../../../utils/connection';
import ImagePicker from 'react-native-image-picker';

const Navigation = [
  // {
  //   active: true,
  //   name: 'Payments',
  //   icon: 'cart-outline',
  //   navigateTo: 'Payments',
  // },
  // {
  //   active: true,
  //   name: 'Questionnaire',
  //   icon: 'headset',
  //   navigateTo: 'Questionnaire',
  // },
  // {
  //   active: true,
  //   name: 'Appointment History',
  //   icon: 'share-variant',
  //   navigateTo: 'AppointmentsHistory',
  // },
  {
    active: true,
    name: 'My Appointments',
    icon: 'share-variant',
    navigateTo: 'Appointments',
  },
  {
    active: true,
    name: 'Questionnaire',
    icon: 'question',
    navigateTo: 'AddQuestionnaire',
  },
  {
    active: true,
    name: 'Skins',
    icon: 'question',
    navigateTo: 'Skins',
  },
  // {
  //   active: true,
  //   name: 'Referrals',
  //   icon: 'share-variant',
  //   navigateTo: 'Referrals',
  // },
  // {
  //   active: true,
  //   name: 'Settings',
  //   icon: 'share-variant',
  //   navigateTo: 'Settings',
  // },
];

const CustomDoctorDrawer = (props) => {
  const {navigation} = props;
  String.prototype.toTitleCase = function () {
    const splited = this.split(' ')
      .map((item) => {
        return `${item[0].toUpperCase()}${item.slice(1)}`;
      })
      .join(' ');
    return splited;
  };
  const state = useSelector((state) => state.AuthReducer);
  const {userData} = state;
  const {doctorProfile} = useSelector((state) => state.DoctorReducer);

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
    require('../../../../assets/images/dummy_profile.png'),
  );

  const dispatch = useDispatch();
  const onUpdateDoctor = () => {
    dispatch(
      UpdateDoctorProfile(
        {id: userData.id, is_superDoc: !doctorProfile.is_superDoc},
        () => {},
        () => {},
      ),
    );
  };
  const onBlock = () => {
    dispatch(BlockDoctor(userData._id));
  };

  // if (data && isLogedin && !isDoctor && data.picture) {
  //   imageSource = {
  //     uri: `${Host}${data.picture.replace('public', '').replace('\\\\', '/')}`,
  //   };
  // } else if (data && isLogedin && isDoctor && data.picture.length > 0) {
  //   imageSource = {
  //     uri: `${Host}${data.picture[0]
  //       .replace('public', '')
  //       .replace('\\\\', '/')}`,
  //   };
  // } else {
  //   imageSource = require('../../../../assets/images/dummy_profile.png');
  // }

  // useEffect(() => {
  //   dispatch(GetDoctorProfile(userData._id));
  // }, []);

  useEffect(() => {
    if (doctorProfile.picture?.length) {
      setImageSource({
        uri: `${Host}${doctorProfile.picture[0]
          .replace('public', '')
          .replace('\\\\', '/')}`,
      });
    } else {
      setImageSource(require('../../../../assets/images/dummy_profile.png'));
    }
  }, [doctorProfile]);

  const onLogout = () => {
    dispatch(
      resetStore(() => {
        console.log(navigation);
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
        if (userData._id) {
          dispatch(
            UploadProfilePic(userData._id, response, () => {
              setPopupVisible(!popupVisible);
              animateHeightOfPopup.setValue(0);
              dispatch(GetDoctorProfile(userData._id));
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
        if (userData._id) {
          dispatch(
            UploadProfilePic(userData._id, response, () => {
              setPopupVisible(!popupVisible);
              animateHeightOfPopup.setValue(0);
              dispatch(GetDoctorProfile(userData._id));
            }),
          );
        } else {
          alert('You need to login first');
        }
      }
    });
  };

  const onUpdateDetails = () => {
    const profileData = {
      name: credential.name,
      age: credential.age,
      gender: credential.gender,
      id: userData._id,
    };
    dispatch(UpdateDoctorProfile(profileData));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}>
        <TopNavBar
          hideRightComp
          onLeftButtonPress={() => {
            navigation.toggleDrawer();
          }}
          headerText="Profile"
          {...{navigation}}
          style={{Container: {marginTop: 5, marginBottom: 10}}}
        />
        <View style={styles.profile}>
          <View
            // onPress={onProfileClick}
            style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={onPressAvatar}>
              <Avater
                src={imageSource}
                type={7}
                style={{borderRadius: 10, borderWidth: 4}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressDetails}>
              <View
                style={{
                  paddingHorizontal: '3%',
                  justifyContent: 'space-around',
                }}>
                <Text style={{fontSize: 22, color: '#000'}}>
                  {!userData
                    ? ''
                    : `Dr. ${userData.firstName.toTitleCase()} ${
                        userData.lastName
                      }`}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                      fontWeight: 'normal',
                    }}>
                    4.92
                  </Text>
                  <MaterialCommunityIcons
                    style={{marginLeft: 5}}
                    name="star"
                    color={'#047b7b'}
                    size={18}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontWeight: 'normal',
                  }}>
                  Edit your profile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <StepsTracker
            text="Complete Your Profile (30%)"
            textStyle={{
              fontSize: 14,
              color: '#F8F7FF',
              lineHeight: 30,
              textAlign: 'center',
            }}
            style={{
              width: '80%',
              flexDirection: 'column-reverse',
              marginTop: '10%',
            }}
            completed={33}
            completedColor={'#EA508F'}
            incompletedColor={'#FFFFFF'}
          />
        </View>
      </View>
      <View
        style={{
          flex: 2,
          width: '100%',
        }}>
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: '10%',
          }}>
          <Section style={{paddingVertical: '10%', paddingBottom: '5%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 15}}>
                Doctor on demand
              </Text>
              <ToggleButton
                toggle={doctorProfile.is_superDoc}
                onToggle={onUpdateDoctor}
                style={{borderRadius: 10, width: 120}}
                dotStyle={{
                  backgroundColor: '#047b7b',
                  width: '50%',
                  height: 25,
                  borderRadius: 8,
                }}
                textStyle={{fontSize: 14, color: '#37acac'}}
                text0="ON"
                text1="OFF"
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 25,
              }}>
              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 15}}>
                Block
              </Text>
              <ToggleButton
                toggle={doctorProfile.block}
                onToggle={onBlock}
                style={{borderRadius: 10, width: 120}}
                dotStyle={{
                  backgroundColor: '#047b7b',
                  width: '50%',
                  height: 25,
                  borderRadius: 8,
                }}
                textStyle={{fontSize: 14, color: '#37acac'}}
                text0="ON"
                text1="OFF"
              />
            </View>
          </Section>
          {Navigation.map((item, index) => {
            return (
              <Section>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(item.navigateTo);
                  }}
                  style={{paddingVertical: 10}}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 15,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </Section>
            );
          })}
          {/* <Section>
            <TouchableOpacity onPress={onLogout}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 15,
                }}>
                {'Logout'}
              </Text>
            </TouchableOpacity>
          </Section> */}
        </ScrollView>
      </View>
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
              <MaterialCommunityIcons
                name={'delete'}
                size={32}
                color={'#fff'}
              />
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
            onChangeText={(name) => setCredential({...credential, name})}
            placeholder={'Name'}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#047b7b',
              paddingVertical: '2%',
              marginBottom: '2%',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              placeholder={'Age'}
              onChangeText={(age) => setCredential({...credential, age})}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#047b7b',
                paddingVertical: '2%',
                paddingRight: '9%',
              }}
            />
            <TextInput
              placeholder={'Gender'}
              onChangeText={(gender) => setCredential({...credential, gender})}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#047b7b',
                paddingVertical: '2%',
                paddingRight: '9%',
              }}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    zIndex: 99,
  },
  section: {
    backgroundColor: '#fafafa',
    marginBottom: 8,
  },
  sectionTop: {marginBottom: 50, position: 'relative'},
  profile: {
    display: 'flex',
    paddingHorizontal: '10%',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backButtonContainer: {
    height: 28,
    width: 28,
    marginTop: 10,
    marginLeft: 15,
  },
  touchableButton: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingCard: {
    height: 70,
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 10,
    elevation: 2,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    position: 'absolute',
    bottom: -35,
    alignSelf: 'center',
    zIndex: 1,
  },
  floatingCardSection: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  thinBorderRight: {
    borderRightWidth: 0.3,
  },
  floatingCardSectionHeading: {
    textTransform: 'uppercase',
    color: HEADER_TEXT,
    fontSize: 13,
    lineHeight: 20,
  },
  floatingCardSectionHeading2: {
    textTransform: 'uppercase',
    color: HEADER_TEXT,
    fontSize: 24,
    marginTop: 5,
  },

  option: {},
});

const Section = ({children, style = {}}) => {
  return (
    <View
      style={[
        {
          paddingVertical: '5%',
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default CustomDoctorDrawer;
