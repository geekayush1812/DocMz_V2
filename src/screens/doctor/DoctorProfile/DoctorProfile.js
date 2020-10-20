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
  const {navigation, route} = props;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [tab, setTab] = useState('about');
  const [feedback, setFeedback] = useState(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 4,
        duration: 700,
        easing: Easing.bezier(0.21, 0.38, 0.68, 0.99),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 4,
        duration: 1300,
        easing: Easing.bezier(0.21, 0.38, 0.68, 0.99),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  const {data} = route.params;
  const {isLoggedin} = useSelector((state) => state.AuthReducer);
  const _checkLogedinAndDoTheStuff = () => {
    if (!isLoggedin) {
      navigation.navigate('Auth');
    } else {
      navigation.navigate('TimeSlotScreen', {data: data});
    }
  };
  let imageSource = require('../../../assets/jpg/person1.jpg');
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TopNavBar
        style={{
          Container: {
            marginTop: '1%',
            opacity: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [0, 1.5],
                  outputRange: [-100, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        }}
        // hideRightComp
        navigation={navigation}
        headerText="Doctor's Profile"
        // onRightButtonPress={() => {}}
      />
      <Animated.View
        style={{
          flex: 1,
          opacity: opacity.interpolate({
            inputRange: [1, 2.5],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [1, 2],
                outputRange: [-100, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '12%',
          marginHorizontal: '7%',
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
            marginLeft: '5%',
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
            style={{
              flexDirection: 'row',
              marginTop: '3%',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/icons/star.png')}
              style={{height: 15, width: 15, marginRight: '3%'}}
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
              style={{marginHorizontal: '5%'}}
            />
          </View>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: '12%',
          marginBottom: '3%',
          opacity: opacity.interpolate({
            inputRange: [2, 3.5],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [2, 3],
                outputRange: [-100, 0],
                extrapolate: 'clamp',
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
      <Animated.View
        style={[
          Styles.ContentContainer,
          {
            opacity: opacity.interpolate({
              inputRange: [3, 4],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [3, 4],
                  outputRange: [-100, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
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
              onPress={_checkLogedinAndDoTheStuff}
              style={{
                height: 40,
                width: '70%',
                borderRadius: 40,
                backgroundColor: SECONDARY_COLOR,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginVertical: '10%',
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
      </Animated.View>
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
    marginTop: '7%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '1.5%',
    borderRadius: 10,
    alignSelf: 'center',
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
    marginHorizontal: '1%',
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
