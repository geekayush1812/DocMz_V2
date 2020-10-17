import React, {useState, useRef, useEffect} from 'react';
import NewToggleButton from '../../../components/molecules/ToggleButton/NewToggleButton';
import SearchBarSolid from '../../../components/molecules/SearchBarSolid/SearchBarSolid';
import BasicCard from '../../../components/atoms/BasicCard/BasicCard';
import Section from '../../../components/molecules/Section/Section';
import AvailDoctorContainerV2 from '../../../components/molecules/AvailDoctorContainer/AvailDoctorContainerV2';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {useDispatch, useSelector} from 'react-redux';

import {
  View,
  ScrollView,
  Text,
  FlatList,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import {
  fetchDoctorLite,
  fetchMoreDoctorLite,
  searchDoctors,
  fetchSuperDoc,
} from '../../../reduxV2/action/DoctorToPatientAction';

import {ListingWithThumbnailLoader} from '../../../components/atoms/Loader/Loader';
import {GetPatientInfo} from '../../../reduxV2/action/PatientAction';
import {
  NEW_PRIMARY_COLOR,
  NEW_HEADER_TEXT,
  SEARCH_PLACEHOLDER_COLOR,
  PRIMARY_BACKGROUND,
  SECONDARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_BACKGROUND,
} from '../../../styles/colors';

import Toast from 'react-native-root-toast';
import {getSpecialty} from '../../../reduxV2/action/DoctorAction';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

function LandingPage({navigation}) {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  const PopupTranslateY = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const {
    doctors,
    loading,
    moreDoctorLoading,
    searchDoctorsLoading,
    searchedDoctors,
    superDocsLoading,
    superDocs,
  } = useSelector((state) => state.DoctorToPatientReducer);
  const {isLogedin, userData} = useSelector((state) => state.AuthReducer);
  const {specialtyLoading, specialty} = useSelector(
    (state) => state.DoctorReducer,
  );
  const [searchKey, setSearchKey] = useState('');
  const [activeId, setActiveId] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [backCount, setBackCount] = useState(true);
  const [page, setPage] = useState(1);
  const [toggle, setToggle] = useState(0);
  const [disEnd, setDisEnd] = useState(0);
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    dispatch(fetchDoctorLite('', 0, false));
    isLogedin && dispatch(GetPatientInfo(userData.id));
    !specialtyLoading && dispatch(getSpecialty());
  }, []);

  const tempSpeciality = ['Pulmanologist', 'Cardiologist', 'Neurologist'];
  const tempSpecialityIcons = [
    require('../../../assets/icons/lungs.png'),
    require('../../../assets/icons/heart.png'),
    require('../../../assets/icons/neuro.png'),
    require('../../../assets/icons/heart.png'),
    require('../../../assets/icons/neuro.png'),
    require('../../../assets/icons/heart.png'),
  ];

  const headerPos = useRef(new Animated.Value(0)).current;
  const onPress = (id) => {
    setActiveId(id);
    __id = id;
    Animated.sequence([
      Animated.timing(PopupTranslateY, {
        toValue: showPopup ? 0 : 1,
        // easing: Easing.bezier(0.52, 0.5, 0.08, 0.78),
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
    setShowPopup(!showPopup);
  };

  const _fetchMoreDoctorLite = () => {
    let val = page + 1;
    dispatch(fetchMoreDoctorLite('', page, false));
    setPage(val);
  };

  const onEndEditing = (search) => {
    dispatch(searchDoctors(search, 0));
    setSearchKey(search);
  };

  const onToggle = () => {
    setToggle(toggle === 0 ? 1 : 0);
    if (toggle === 0) {
      dispatch(fetchSuperDoc(0));
    }
  };

  let yOffset = 0;
  headerPos.addListener((value) => {
    yOffset = value;
  });

  const scrollAnimation = async (e) => {
    var vel = e.nativeEvent.velocity.y;
    console.log(e);
    if (vel < 0) {
      console.log('in');
      Animated.timing(headerPos, {
        toValue: 300,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(headerPos, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  const headerViewStyle = headerPos.interpolate({
    inputRange: [0, 250],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerInterpolated = headerPos.interpolate({
    inputRange: [300, 350],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const transaleInterpolate = headerPos.interpolate({
    inputRange: [200, 350],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />

      <View style={{height: screenHeight - 45, backgroundColor: '#fff'}}>
        <Toast
          visible={toastVisible}
          position={screenHeight * 0.9}
          shadow={true}
          animation={true}
          hideOnPress={true}>
          Press again to Exit
        </Toast>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/icons/back.png')}
              style={{height: 19, width: 10}}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              color: NEW_HEADER_TEXT,
              alignSelf: 'center',
              fontFamily: 'Montserrat-Medium',
            }}>
            Search
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={require('../../../assets/icons/hamburger_menu.png')}
              style={{height: 19, width: 24}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: '6%',
            paddingVertical: '2%',
            alignItems: 'center',
            width: '100%',
            marginTop: '1%',
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                color: NEW_HEADER_TEXT,
                fontSize: 20,
                fontFamily: 'Montserrat-Bold',
              }}>
              Doctors
            </Text>
          </View>
          <Animated.Text
            style={{
              opacity: headerPos.interpolate({
                inputRange: [0, 400],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
              fontSize: 32,
              fontWeight: 'bold',
              alignItems: 'center',
              color: NEW_PRIMARY_COLOR,
            }}>
            |
          </Animated.Text>
          <Animated.View
            style={{
              alignItems: 'center',
              flex: 1,
              opacity: headerPos.interpolate({
                inputRange: [0, 400],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            }}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                color: INPUT_PLACEHOLDER,
                fontSize: 20,
                fontFamily: 'Montserrat-Regular',
              }}>
              Medicines
            </Text>
          </Animated.View>
        </View>
        {/* <AnimatedScrollView
        nestedScrollEnabled
        scrollEnabled={!(loading || searchDoctorsLoading || superDocsLoading)}
        style={{
          transform: [
            {
              translateY: headerPos.interpolate({
                inputRange: [0, 300],
                outputRange: [0, 5],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: headerPos},
              },
            },
          ],
          {useNativeDriver: true},
        )}> */}
        <Animated.View
          style={{
            paddingTop: '5%',
            // opacity: headerInterpolated,
            transform: [
              {
                scale: headerInterpolated,
              },
              {
                translateY: transaleInterpolate,
              },
            ],
          }}>
          <Animated.View
            style={{
              height: '8%',
              paddingHorizontal: '6%',
              justifyContent: 'center',
              transform: [
                {
                  translateX: headerPos.interpolate({
                    inputRange: [0, 300],
                    outputRange: [0, 3 * screenWidth],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}>
            <SearchBarSolid
              withIcon
              placeholderTextColor={SEARCH_PLACEHOLDER_COLOR}
              icon={
                <Image
                  source={require('../../../assets/icons/configure.png')}
                  style={{height: 24, width: 24}}
                />
              }
              searchIcon={
                <Image
                  source={require('../../../assets/icons/search.png')}
                  style={{height: 20, width: 18}}
                  color={SEARCH_PLACEHOLDER_COLOR}
                />
              }
              onEndEditing={onEndEditing}
              style={{
                backgroundColor: SECONDARY_BACKGROUND,
                borderRadius: 10,
                elevation: 2,
              }}
            />
          </Animated.View>
          <View
            style={{
              height: 'auto',
            }}>
            <AnimatedScrollView
              horizontal
              style={{
                zIndex: 99999,
                transform: [
                  {
                    translateX: headerPos.interpolate({
                      inputRange: [0, 300],
                      outputRange: [0, -3 * screenWidth],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
              contentContainerStyle={{
                paddingTop: '7%',
                paddingBottom: '2%',
                paddingHorizontal: '6%',
              }}
              showsHorizontalScrollIndicator={false}>
              {specialty.map((u, i) => {
                return (
                  <BasicCard
                    key={i}
                    style={{
                      CardContainer: {
                        elevation: 6,
                        justifyContent: 'center',
                        padding: '1%',
                        height: 120,
                        width: 120,
                        borderRadius: 13,
                        backgroundColor: PRIMARY_BACKGROUND,
                      },
                    }}>
                    <Image
                      source={tempSpecialityIcons[i]}
                      resizeMode="contain"
                      style={{margin: '1%', height: 40, width: 40}}
                    />
                    <Text
                      adjustsFontSizeToFit
                      minimumFontScale={0.8}
                      ellipsizeMode={'tail'}
                      lineBreakMode={'tail'}
                      textBreakStrategy={'balanced'}
                      numberOfLines={1}
                      style={{
                        fontSize: 13,
                        color: NEW_PRIMARY_BACKGROUND,
                        fontFamily: 'Montserrat-Medium',
                        marginTop: '5%',
                      }}>
                      {u.length > 15 ? u.slice(0, 15).concat('...') : u}
                    </Text>
                  </BasicCard>
                );
              })}
            </AnimatedScrollView>
            <Animated.View
              style={{
                marginHorizontal: '7%',
                marginTop: '3%',
                marginBottom: 0,
                transform: [
                  {
                    translateX: headerPos.interpolate({
                      inputRange: [0, 300],
                      outputRange: [0, 3 * screenWidth],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}>
              <NewToggleButton
                toggle={toggle}
                onToggle={onToggle}
                text0="Now"
                text1="Schedule"
                style={{width: 200}}
                textStyle={{
                  fontSize: 16,
                  color: NEW_PRIMARY_COLOR,
                  // fontWeight: 'bold',
                  textAlign: 'center',
                  fontFamily: 'Montserrat-SemiBold',
                }}
              />
            </Animated.View>
          </View>
        </Animated.View>
        {/* <Animated.View
        style={{
          transform: [
            {
              translateY: headerPos.interpolate({
                inputRange: [0, 300],
                outputRange: [0, 5],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
        style={{
          Container: {
            marginBottom: '8%',
            flex: 1,
          },
          Text: {
            color: NEW_HEADER_TEXT,
            fontFamily: 'Montserrat-Medium',
            fontSize: 20,
          },
        }}
        HeaderText={toggle ? 'Available Doctors' : 'Book Doctors'}> */}
        {loading || searchDoctorsLoading || superDocsLoading ? (
          <ListingWithThumbnailLoader style={{marginTop: 20}} />
        ) : searchedDoctors.length !== 0 && searchKey !== '' ? (
          <FlatList
            keyExtractor={(item) => item._id}
            data={searchedDoctors}
            nestedScrollEnabled
            renderItem={({item, index}) => (
              <AvailDoctorContainerV2
                toggle={toggle}
                data={item}
                navigation={navigation}
                onPress={() => onPress(item._id)}
                id={item._id}
                index={index}
                name={item.basic.name}
                schedule={item.output}
              />
            )}
          />
        ) : !toggle ? (
          <Animated.View
            style={{
              transform: [
                {
                  translateY: headerPos.interpolate({
                    inputRange: [0, 350],
                    outputRange: [0, -300],
                    extrapolate: 'clamp',
                  }),
                },
              ],
              marginBottom: 20,
            }}>
            <AnimatedFlatList
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {y: headerPos},
                    },
                  },
                ],
                {useNativeDriver: true},
              )}
              // initialNumToRender={5}
              // onMomentumScrollBegin={() => setTrigger(false)}
              onEndReached={({distanceFromEnd}) => {
                console.log('end reached');
                // console.log(page);
                // _fetchMoreDoctorLite();
              }}
              // onScroll={onScroll}
              ListFooterComponent={moreDoctorLoading && <ActivityIndicator />}
              keyExtractor={(item) => String(item._id)}
              // onScroll={Animated.event(
              //   [
              //     {
              //       nativeEvent: {
              //         contentOffset: {y: headerPos},
              //       },
              //     },
              //   ],
              //   {useNativeDriver: false},
              // )}
              // onScrollEndDrag={scrollAnimation}
              // scrollEventThrottle={16}
              ListEmptyComponent={
                <View
                  style={{
                    height: 300,
                    marginTop: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>Empty</Text>
                </View>
              }
              onEndReachedThreshold={0.2}
              // extraData={doctors}
              data={doctors}
              renderItem={({item, index}) => {
                console.log(item);
                return (
                  <AvailDoctorContainerV2
                    toggle={toggle}
                    data={item}
                    navigation={navigation}
                    onPress={() => onPress(item._id)}
                    id={item._id}
                    index={index}
                    name={item.basic.name}
                    schedule={item.output}
                  />
                );
              }}
            />
          </Animated.View>
        ) : (
          <FlatList
            nestedScrollEnabled
            initialNumToRender={5}
            ListEmptyComponent={
              <View
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Empty superDocs</Text>
              </View>
            }
            // ListFooterComponent={moreDoctorLoading && <ActivityIndicator />}
            // extraData={doctors}
            keyExtractor={(item) => item._id}
            // onScroll={Animated.event(
            //   [
            //     {
            //       nativeEvent: {
            //         contentOffset: {y: headerPos},
            //       },
            //     },
            //   ],
            //   {useNativeDriver: false},
            // )}
            // onScrollEndDrag={scrollAnimation}
            // scrollEventThrottle={16}
            data={superDocs}
            renderItem={({item}) => (
              <AvailDoctorContainerV2
                toggle={toggle}
                data={item}
                navigation={navigation}
                onPress={() => onPress(item._id)}
                id={item._id}
                name={item.basic.name}
                schedule={item.output}
              />
            )}
          />
        )}
        {/* </Animated.View> */}
        {/* </AnimatedScrollView> */}
      </View>
    </>
  );
}

export default LandingPage;
