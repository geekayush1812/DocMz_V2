import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import RatingStarts from '../../../components/atoms/ratingStars/RatingStarts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  SECONDARY_COLOR,
  NEW_HEADER_TEXT,
  NEW_PRIMARY_COLOR,
  SECONDARY_BACKGROUND,
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
} from '../../../styles/colors';
import ReviewItem from '../../../components/molecules/Reviews/ReviewItem';
import {Host} from '../../../utils/connection';

const dummyFeeback = [
  {
    name: 'Maggie Rhee',
    rating: 3,
    date: '13 June',
    review:
      '“Great caring doctor & practice. Very accessible, especially during these times.Highly recommend.”',
  },
  {
    name: 'Aaron Clark',
    rating: 3,
    date: '13 June',
    review:
      '“I liked the service very much. Great doctor and very understanding”',
  },
  {
    name: 'Maggie Rhee',
    rating: 3,
    date: '13 June',
    review:
      '“Great caring doctor & practice. Very accessible, especially during these times.Highly recommend.”',
  },
];

function DoctorProfile(props) {
  const {navigation} = props;
  const dimen = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [tab, setTab] = useState('about');
  const [feedback, setFeedback] = useState(0);

  useEffect(() => {
    // BackHandler.removeEventListener();
    Animated.sequence([
      Animated.timing(dimen, {
        toValue: 1,
        // delay: 200,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        // delay: 200,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  const {data} = props.navigation.state.params;
  const authData = useSelector((state) => state.AuthReducer);
  const _checkLogedinAndDoTheStuff = () => {
    if (!authData.isLogedin) {
      console.log('>> authentication.');
      navigation.navigate('authentication');
    } else {
      // navigation.navigate('ConfirmAppointment', {data: data});
      // if (data.toggle === 0) {
      navigation.navigate('PatientCalendarScreen', {data: data});
      // } else {
      //   alert('open schedule popup');
      // }
    }
  };
  let imageSource = require('../../../assets/jpg/person1.jpg');
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TopNavBar
        style={{Container: {marginTop: 5}}}
        // hideRightComp
        navigation={navigation}
        headerText="Doctor's Profile"
        // onRightButtonPress={() => {}}
      />
      <Animated.View
        style={{
          flex: 1,
          opacity: opacity,
          transform: [{scale: opacity}],
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 70,
          marginHorizontal: 20,
          // height: 135,
          // borderWidth: 1,
        }}>
        <View
          style={{
            height: 140,
            width: 140,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 70,
            backgroundColor: SECONDARY_BACKGROUND,
            // borderWidth: 1,
          }}>
          <Image
            style={{
              borderRadius: 65,
              height: 130,
              width: 130,
            }}
            source={
              data.picture.length > 0
                ? {
                    uri: `${Host}${data.picture[0]
                      .replace('public', '')
                      .replace('\\\\', '/')}`,
                  }
                : imageSource
            }
          />
        </View>

        <View
          style={{
            justifyContent: 'space-evenly',
            flex: 1,
            marginLeft: 15,
            alignSelf: 'stretch',
            // borderWidth: 1,
          }}>
          <Text
            style={{
              fontSize: 22,
              lineHeight: 22,
              color: NEW_HEADER_TEXT,
              textTransform: 'capitalize',
              fontFamily: 'Montserrat-SemiBold',
              marginBottom: 5,
            }}>
            Dr. {data.basic.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 18,
              color: NEW_HEADER_TEXT,
              textTransform: 'capitalize',
              fontFamily: 'Montserrat-Medium',
            }}>
            {data.specialty}
          </Text>
          <View
            style={{flexDirection: 'row', marginTop: 7, alignItems: 'center'}}>
            <Image
              source={require('../../../assets/icons/star.png')}
              style={{height: 15, width: 15, marginRight: 7}}
            />
            <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 13}}>
              {4.2}{' '}
            </Text>
            <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 13}}>
              (9 Reviews)
            </Text>

            <MaterialCommunityIcons
              name="heart"
              size={22}
              color="#EF786E"
              style={{marginHorizontal: 10}}
            />
          </View>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 80,
          marginBottom: 10,

          opacity: opacity.interpolate({
            inputRange: [0, 0.99, 1],
            outputRange: [0, 0.2, 1],
          }),
          transform: [
            {
              scale: opacity.interpolate({
                inputRange: [0, 0.99, 1],
                outputRange: [0, 0.1, 1],
              }),
            },
          ],
        }}>
        <View style={Styles.DoctorProfilePatientDetails}>
          <Text
            style={{
              color: NEW_HEADER_TEXT,
              fontSize: 24,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            1.5K
          </Text>
          <Text
            style={{
              color: NEW_HEADER_TEXT,
              fontSize: 13,
              fontFamily: 'Montserrat-Regular',
            }}>
            Patients
          </Text>
        </View>
        <View style={Styles.DoctorProfileExperienceDetails}>
          <Text
            style={{
              color: NEW_HEADER_TEXT,
              fontSize: 24,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {data.experience ? data.experience : '-'} yrs
          </Text>
          <Text
            style={{
              color: NEW_HEADER_TEXT,
              fontSize: 13,
              fontFamily: 'Montserrat-Regular',
            }}>
            Experience
          </Text>
        </View>
      </Animated.View>
      <View style={Styles.ContentContainer}>
        <View style={Styles.ContentContainerTabs}>
          <TouchableOpacity onPress={() => setTab('about')}>
            <View style={Styles.TabLabelContainer}>
              <Text
                style={
                  tab === 'about'
                    ? Styles.activeTabText
                    : Styles.inactiveTabText
                }>
                About
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab('fee')}>
            <View style={Styles.TabLabelContainer}>
              <Text
                style={
                  tab === 'fee' ? Styles.activeTabText : Styles.inactiveTabText
                }>
                Fee
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab('feedback')}>
            <View style={Styles.TabLabelContainer}>
              <Text
                style={
                  tab === 'feedback'
                    ? Styles.activeTabText
                    : Styles.inactiveTabText
                }>
                Feedback
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTab('more')}>
            <View style={Styles.TabLabelContainer}>
              <Text
                style={
                  tab === 'more' ? Styles.activeTabText : Styles.inactiveTabText
                }>
                More
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {tab === 'about' ? (
          <View>
            <ScrollView style={Styles.DoctorInfoScroll}>
              <View style={{flex: 1, paddingHorizontal: 20}}>
                <Text
                  style={{
                    letterSpacing: 0.3,
                    lineHeight: 23,
                    color: NEW_HEADER_TEXT,
                    textAlign: 'center',
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 13,
                  }}>
                  {data.bio
                    ? data.bio
                    : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sedLorem ipsum dolor sit amet, consetetur sadipscing elitr,sed Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed'}
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              // onPress={_checkLogedinAndDoTheStuff}
              onPress={() => navigation.openDrawer()}
              style={{
                height: 40,
                width: 250,
                borderRadius: 40,
                backgroundColor: SECONDARY_COLOR,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
                alignSelf: 'center',
                marginBottom: 15,
              }}>
              <Text
                style={{
                  color: '#fff',
                  // fontWeight: 'bold',
                  fontSize: 16,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                BOOK APPOINTMENT
              </Text>
            </TouchableOpacity>
          </View>
        ) : tab === 'fee' ? null : tab === 'feedback' ? (
          <ScrollView style={{flex: 1}}>
            <View style={{alignItems: 'center', marginVertical: 30}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: NEW_HEADER_TEXT,
                  fontSize: 16,
                }}>
                How was your experience?
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 12,
                }}>
                <TouchableOpacity
                  onPress={() => setFeedback(1)}
                  style={{marginRight: 10}}>
                  <FontAwesome
                    name={feedback === 1 ? 'thumbs-up' : 'thumbs-o-up'}
                    color={
                      feedback === 1 ? NEW_PRIMARY_COLOR : INPUT_PLACEHOLDER
                    }
                    size={40}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setFeedback(-1)}
                  style={{marginLeft: 10}}>
                  <FontAwesome
                    name={feedback === -1 ? 'thumbs-up' : 'thumbs-o-up'}
                    color={
                      feedback === -1 ? NEW_PRIMARY_COLOR : INPUT_PLACEHOLDER
                    }
                    size={40}
                    style={{transform: [{rotateZ: '180deg'}]}}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    color: NEW_PRIMARY_BACKGROUND,
                    fontSize: 16,
                  }}>
                  Add Feedback
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{paddingHorizontal: 20}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: NEW_HEADER_TEXT,
                  fontSize: 19,
                  marginBottom: 10,
                }}>
                Feedbacks
              </Text>
              {dummyFeeback.map((review) => (
                <ReviewItem {...review} />
              ))}
            </View>
          </ScrollView>
        ) : tab === 'more' ? null : null}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  DoctorProfilePatientDetails: {
    alignItems: 'center',
    flex: 1,
    borderRightWidth: 1.5,
    borderColor: NEW_PRIMARY_COLOR,
  },
  DoctorProfileExperienceDetails: {
    alignItems: 'center',
    flex: 1,
    borderLeftWidth: 1.5,
    borderColor: NEW_PRIMARY_COLOR,
  },
  ContentContainer: {
    flex: 4,
    zIndex: 10,
  },
  ContentContainerTabs: {
    backgroundColor: SECONDARY_BACKGROUND,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    alignSelf: 'stretch',
    marginHorizontal: 25,
    justifyContent: 'space-between',
  },
  DoctorInfoScroll: {
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
  },
  TabLabelContainer: {
    // flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeTabText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
    backgroundColor: SECONDARY_COLOR,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  inactiveTabText: {
    color: SECONDARY_COLOR,
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
    paddingHorizontal: 15,
  },
});
export default DoctorProfile;
