import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {NEW_PRIMARY_COLOR, GREY_OUTLINE} from '../../../styles/colors';
import {useSelector} from 'react-redux';
import {Host} from '../../../utils/connection';

const NewProfile = ({navigation}) => {
  const {data, isLogedin, isDoctor} = useSelector((state) => state.AuthReducer);
  let imageSource = require('../../../assets/jpg/person3.jpg');
  console.log(data.picture);
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
    imageSource = require('../../../assets/jpg/person3.jpg');
  }
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
          <Image
            source={imageSource}
            style={{height: 120, width: 120, borderRadius: 60, margin: 15}}
            resizeMode="cover"
          />

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
