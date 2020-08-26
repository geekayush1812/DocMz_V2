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
} from 'react-native';
// import Animated from 'react-native-reanimated';
import {
  fetchDoctorLite,
  fetchMoreDoctorLite,
  searchDoctors,
  fetchSuperDoc,
} from '../../../redux/action/doctoreAction';
import {
  RowLoader,
  ListingWithThumbnailLoader,
} from '../../../components/atoms/Loader/Loader';
import {GetPatientInfo} from '../../../redux/action/patientAccountAction';
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
import {getSpecialty} from '../../../redux/action/doctor/myDoctorAction';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationActions} from 'react-navigation';
export default function LandingPageScreen({navigation}) {
  const height = Dimensions.get('window').height;
  const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

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
  } = useSelector((state) => state.DoctorReducer);
  const {isLogedin, isDoctor, data} = useSelector((state) => state.AuthReducer);
  const {specialtyLoading, specialty} = useSelector(
    (state) => state.MyDoctorReducer,
  );
  console.log(doctors);
  const [searchKey, setSearchKey] = useState('');
  const [activeId, setActiveId] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [backCount, setBackCount] = useState(true);
  const [page, setPage] = useState(0);
  const [toggle, setToggle] = useState(0);
  const [disEnd, setDisEnd] = useState(0);
  const [trigger, setTrigger] = useState(true);
  var __id = '';

  if (isDoctor && isLogedin) {
    navigation.reset(
      [NavigationActions.navigate({routeName: 'DoctorHomePage'})],
      0,
    );
  }
  useEffect(() => {
    dispatch(fetchDoctorLite('', 0, false));
    isLogedin && dispatch(GetPatientInfo(data.id));
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

  const fetchMore = (e) => {
    setDisEnd(disEnd + e.distanceFromEnd);
    setPage(page + 1);
  };

  const onScroll = () => {
    let val = page + 1;
    dispatch(fetchMoreDoctorLite(page, false));
    setPage(val);
  };
  const fetch = () => {
    let val = page + 1;
    dispatch(fetchMoreDoctorLite(page, false));
    setPage(val);
  };

  const onEndEditing = ({nativeEvent}) => {
    dispatch(searchDoctors(searchKey, 0));
  };
  const onChangeText = (text) => {
    setSearchKey(text);
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

  // BackHandler.addEventListener('hardwareBackPress', function () {
  //   if (backCount) {
  //     setToastVisible(true);
  //     setBackCount(false);
  //     setTimeout(() => {
  //       setToastVisible(false);
  //     }, 2000);
  //     console.log('in');
  //     return true;
  //   }
  //   console.log('out');
  //   BackHandler.exitApp();
  //   return true;
  // });

  const scrollAnimation = async (e) => {
    var vel = e.nativeEvent.velocity.y;
    console.log(e);
    if (vel < 0) {
      console.log('in');
      Animated.timing(headerPos, {
        toValue: 300,
        duration: 100,
        useNativeDriver: true,
        // easing: Easing.linear,
      }).start();
    } else {
      Animated.timing(headerPos, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
        // easing: Easing.linear,
      }).start();
    }
  };

  // const headerView = headerPos.interpolate({
  //   inputRange: [1, 50],
  //   outputRange: [0, 1],
  //   extrapolate: 'clamp',
  //   easing: Easing.linear,
  //   useNativeDriver: false,
  // });

  const headerViewStyle = headerPos.interpolate({
    inputRange: [0, 250],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // const getScrollHeader = () => {
  //   return (
  //     <Animated.View
  //       style={{
  //         position: 'absolute',
  //         width: '90%',
  //         marginTop: 25,
  //         alignSelf: 'center',
  //         opacity: headerView,
  //       }}>
  //       <TopNavBar
  //         hideLeftComp={true}
  //         onLeftButtonPress={() => {}}
  //         // onRightButtonPress={() => {}}
  //         navigation={navigation}
  //         style={{
  //           Container: {
  //             height: '5%',
  //             marginTop: 5,
  //           },
  //         }}
  //       />

  //       <View>
  //         <Text
  //           style={{
  //             color: NEW_HEADER_TEXT,
  //             fontSize: 20,
  //             lineHeight: 32,
  //             letterSpacing: 0.8,
  //           }}>
  //           Search
  //         </Text>

  //           <Text
  //             numberOfLines={1}
  //             adjustsFontSizeToFit
  //             style={{
  //               color: NEW_HEADER_TEXT,
  //               fontSize: 42,
  //               lineHeight: 48,
  //               fontWeight: 'bold',
  //               letterSpacing: 1,
  //             }}>
  //             Doctors
  //           </Text>
  //       </View>
  //     </Animated.View>
  //   );
  // };

  const headerInterpolated = headerPos.interpolate({
    inputRange: [0, 350],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const transaleInterpolate = headerPos.interpolate({
    inputRange: [0, 350],
    outputRange: [0, 350],
    extrapolate: 'clamp',
  });

  return (
    <View style={{height: height - 45, backgroundColor: '#ffffff'}}>
      {/* <CancelConfirm visible={true} onYes={() => {}} onNo={() => {}} /> */}
      <Toast
        visible={toastVisible}
        position={height * 0.9}
        shadow={true}
        animation={true}
        hideOnPress={true}>
        Press again to Exit
      </Toast>
      <TopNavBar
        onLeftButtonPress={() => {}}
        // onRightButtonPress={() => {}}
        navigation={navigation}
        style={{
          Container: {
            height: '5%',
            marginTop: 15,
          },
        }}
        headerText="Search"
      />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 25,
          paddingVertical: 10,
          alignItems: 'center',
          width: '100%',
          marginTop: 10,
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <Animated.View
          style={{
            alignItems: 'center',
            borderRightWidth: headerPos.interpolate({
              inputRange: [0, 400],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
            borderColor: NEW_PRIMARY_COLOR,
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
        </Animated.View>
        <Animated.View
          style={{
            alignItems: 'center',
            borderLeftWidth: 1,
            borderColor: NEW_PRIMARY_COLOR,
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
      <AnimatedScrollView
        nestedScrollEnabled
        scrollEnabled={!(loading || searchDoctorsLoading || superDocsLoading)}
        // contentContainerStyle={{flex: 1}}
        style={{
          transform: [
            {
              translateY: headerPos.interpolate({
                inputRange: [0, 400],
                outputRange: [0, -20],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
        scrollEnabled={true}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: headerPos},
              },
            },
          ],
          {useNativeDriver: false},
        )}>
        <Animated.View
          style={{
            paddingTop: 40,
            opacity: headerInterpolated,
            transform: [
              {
                scale: headerInterpolated,
              },
              {
                translateY: transaleInterpolate,
              },
            ],
          }}>
          <View
            style={{
              height: '8%',
              paddingHorizontal: 25,
              justifyContent: 'center',
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
              onChangeText={onChangeText}
              style={{
                backgroundColor: SECONDARY_BACKGROUND,
                borderRadius: 10,
                elevation: 2,
              }}
            />
          </View>
          <View
            style={{
              height: 'auto',
            }}>
            <ScrollView
              horizontal
              style={{zIndex: 99999}}
              contentContainerStyle={{
                paddingTop: '7%',
                paddingBottom: 12,
                paddingHorizontal: 25,
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
                        padding: 5,
                        height: 120,
                        width: 120,
                        borderRadius: 13,
                        backgroundColor: PRIMARY_BACKGROUND,
                      },
                    }}>
                    <Image
                      source={tempSpecialityIcons[i]}
                      resizeMode="contain"
                      style={{margin: 5, height: 40, width: 40}}
                    />
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      style={{
                        fontSize: 13,
                        color: NEW_PRIMARY_BACKGROUND,
                        fontFamily: 'Montserrat-Medium',
                        marginTop: 5,
                      }}>
                      {u.length > 15 ? u.slice(0, 15).concat('...') : u}
                    </Text>
                  </BasicCard>
                );
              })}
            </ScrollView>
            <View
              style={{marginHorizontal: 30, marginTop: 15, marginBottom: -10}}>
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
            </View>
          </View>
        </Animated.View>
        <Section
          style={{
            Container: {
              marginBottom: 40,
              flex: 1,
            },
            Text: {
              color: NEW_HEADER_TEXT,
              fontFamily: 'Montserrat-Medium',
              fontSize: 20,
            },
          }}
          HeaderText={toggle ? 'Available Doctors' : 'Book Doctors'}>
          {loading || searchDoctorsLoading || superDocsLoading ? (
            <ListingWithThumbnailLoader style={{marginTop: 20}} />
          ) : searchedDoctors.length && searchKey !== '' ? (
            <FlatList
              keyExtractor={(item) => item._id}
              data={searchedDoctors}
              nestedScrollEnabled
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
              renderItem={({item, index}) => (
                <AvailDoctorContainerV2
                  toggle={toggle}
                  data={item}
                  navigation={navigation}
                  onPress={() => onPress(item._id)}
                  id={item._id}
                  index={index}
                  name={item.basic.name.slice(0, 15).concat('...')}
                  schedule={item.output}
                />
              )}
            />
          ) : !toggle ? (
            <FlatList
              nestedScrollEnabled
              // initialNumToRender={5}
              // onMomentumScrollBegin={() => setTrigger(false)}
              onEndReached={({distanceFromEnd}) => {
                console.log('end reached');
                // if (!trigger) {
                // fetch();
                //   setTrigger(true);
                // }
              }}
              // onScroll={onScroll}
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
              onEndReachedThreshold={0.1}
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
                    name={item.basic.name.slice(0, 15).concat('...')}
                    schedule={item.output}
                  />
                );
              }}
            />
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
                  name={item.basic.name.slice(0, 15).concat('...')}
                  schedule={item.output}
                />
              )}
            />
          )}
          <TouchableOpacity
            onPress={fetch}
            style={{marginBottom: '10%', alignSelf: 'center'}}>
            <MaterialIcon name={'reload'} size={28} color={'black'} />
          </TouchableOpacity>
        </Section>
      </AnimatedScrollView>
    </View>
  );
}
