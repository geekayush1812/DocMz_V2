/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import Avater from '../../../atoms/Avater/Avater';
import DmzText from '../../../atoms/DmzText/DmzText';
import Option from '../../../molecules/Option/Option';
import {Colors} from '../../../../styles/index';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {resetStore} from '../../../../redux/action/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ExpandableOption from '../../../molecules/ExpandableOption/ExpandableOption';
import FancyHeaderLite from '../../../organisms/FancyHeaderLite/FancyHeaderLite';
import {HEADER_TEXT, TERTIARY_TEXT} from '../../../../styles/colors';
import StepsTracker from '../../../atoms/StepsTracker/StepsTracker';
import SlidingUpPanel from 'rn-sliding-up-panel';
import PatientLocation from '../../../../screens/examples/PatientLocation/PatientLocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ToggleButton from '../../../molecules/ToggleButton/ToggleButton';
import TopNavBar from '../../../molecules/TopNavBar/TopNavBar';
import {UpdateDoctor, BlockDoctor} from '../../../../redux/action/auth';
import {Host} from '../../../../utils/connection';
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

const Custom = (props) => {
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
  const {
    data,
    blockingDoctor,
    blockingDoctorError,
    isDoctor,
    isLogedin,
  } = state;
  const dispatch = useDispatch();
  const onUpdateDoctor = () => {
    dispatch(
      UpdateDoctor(
        {id: data.id, is_superDoc: !data.is_superDoc},
        () => {},
        () => {},
      ),
    );
  };
  const onBlock = () => {
    dispatch(BlockDoctor(data._id));
  };
  let imageSource = require('../../../../assets/images/dummy_profile.png');
  if (data && isLogedin && !isDoctor && data.picture) {
    imageSource = {
      uri: `${Host}${data.picture.replace('public', '').replace('\\\\', '/')}`,
    };
  } else if (data && isLogedin && isDoctor && data.picture.length > 0) {
    imageSource = {
      uri: `${Host}${data.picture[0]
        .replace('public', '')
        .replace('\\\\', '/')}`,
    };
  } else {
    imageSource = require('../../../../assets/images/dummy_profile.png');
  }
  const onLogout = () => {
    dispatch(
      resetStore(() => {
        console.log(navigation);
      }),
    );
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
          <TouchableOpacity
            // onPress={onProfileClick}
            style={{flexDirection: 'row'}}>
            <Avater
              src={imageSource}
              type={7}
              style={{borderRadius: 10, borderWidth: 4}}
            />
            <View
              style={{
                paddingHorizontal: '3%',
                justifyContent: 'space-around',
              }}>
              <Text style={{fontSize: 22, color: '#000'}}>
                {!data || data.length == 0
                  ? ''
                  : `Dr. ${data.firstName.toTitleCase()} ${data.lastName}`}
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
                toggle={data.is_superDoc}
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
                toggle={data.block}
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

export default Custom;
