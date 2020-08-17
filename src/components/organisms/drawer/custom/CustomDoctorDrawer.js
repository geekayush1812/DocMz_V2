/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, KeyboardAvoidingView} from 'react-native';
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
import {UpdateDoctor} from '../../../../redux/action/auth';
const Navigation = [
  {
    active: true,
    name: 'Payments',
    icon: 'cart-outline',
    navigateTo: 'Payments',
  },
  {
    active: true,
    name: 'Questionnaire',
    icon: 'headset',
    navigateTo: 'Questionnaire',
  },
  {
    active: true,
    name: 'Appointment History',
    icon: 'share-variant',
    navigateTo: 'AppointmentsHistory',
  },
  {
    active: true,
    name: 'My Appointments',
    icon: 'share-variant',
    navigateTo: 'Appointments',
  },
  {
    active: true,
    name: 'Referrals',
    icon: 'share-variant',
    navigateTo: 'Referrals',
  },
  {
    active: true,
    name: 'Settings',
    icon: 'share-variant',
    navigateTo: 'Settings',
  },
];

const Custom = ({navigation, activeItemKey}) => {
  String.prototype.toTitleCase = function () {
    const splited = this.split(' ')
      .map((item) => {
        return `${item[0].toUpperCase()}${item.slice(1)}`;
      })
      .join(' ');
    return splited;
  };
  const {data} = useSelector((state) => state.AuthReducer);
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
  return (
    <View style={styles.container}>
      <View
        style={{
          height: '33%',
        }}>
        <TopNavBar
          onLeftButtonPress={() => {
            navigation.navigate('Home');
            navigation.toggleDrawer();
          }}
          hideRightComp
          LeftComp={
            <MaterialCommunityIcons
              name={'chevron-left'}
              size={32}
              color="#F8F7FF"
            />
          }
          style={{Container: {marginTop: 5}}}
        />
        <View style={styles.profile}>
          <TouchableOpacity
            // onPress={onProfileClick}
            style={{flexDirection: 'row'}}>
            <Avater type={7} style={{borderRadius: 10, borderWidth: 4}} />
            <View style={{marginLeft: 30}}>
              <DmzText
                text={
                  !data || data.length == 0
                    ? ''
                    : `Dr. ${data.firstName.toTitleCase()} ${data.lastName}`
                }
                style={{fontSize: 22, color: '#fff'}}
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <DmzText
                  text={'4.92'}
                  style={{
                    fontSize: 14,
                    color: '#fff',
                    fontWeight: 'normal',
                  }}
                />
                <MaterialCommunityIcons
                  style={{marginLeft: 5}}
                  name="star"
                  color={'#fff'}
                  size={18}
                />
              </View>
              <DmzText
                text={'Edit your profile'}
                style={{
                  fontSize: 14,
                  color: '#fff',
                  fontWeight: 'normal',
                }}
              />
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
              marginTop: 5,
            }}
            completed={33}
            completedColor={'#EA508F'}
            incompletedColor={'#FFFFFF'}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: 'hidden',
          width: '100%',
          backgroundColor: '#E9E5FF',
          // paddingTop: 25,
        }}>
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 70,
          }}>
          <Section style={{paddingVertical: 30, paddingBottom: 40}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{color: '#9C77BC', fontWeight: 'bold', fontSize: 15}}>
                Doctor on demand
              </Text>
              <ToggleButton
                toggle={data.is_superDoc}
                onToggle={onUpdateDoctor}
                style={{borderRadius: 10, width: 120}}
                dotStyle={{
                  backgroundColor: '#9C77BC',
                  width: 50,
                  height: 25,
                  borderRadius: 8,
                }}
                textStyle={{fontSize: 14, color: '#EA508F'}}
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
              <Text
                style={{color: '#9C77BC', fontWeight: 'bold', fontSize: 15}}>
                Block
              </Text>
              <ToggleButton
                style={{borderRadius: 10, width: 120}}
                dotStyle={{
                  backgroundColor: '#9C77BC',
                  width: 50,
                  height: 25,
                  borderRadius: 8,
                }}
                textStyle={{fontSize: 14, color: '#EA508F'}}
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
                      color: '#6859A2',
                      fontSize: 15,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </Section>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9C77BC',
    flex: 1,
  },
  section: {
    backgroundColor: '#fafafa',
    marginBottom: 8,
  },
  sectionTop: {marginBottom: 50, position: 'relative'},
  profile: {
    display: 'flex',
    // alignItems: 'center',
    paddingHorizontal: 50,
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
          borderBottomWidth: 0.8,
          borderBottomColor: '#fff',
          paddingVertical: 20,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default Custom;
