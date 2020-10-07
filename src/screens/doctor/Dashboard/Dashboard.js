import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import ProfilePic from '../../../components/atoms/ProfilePic/ProfilePic';
import Clock from '../../../assets/svg/clock.svg';
import RecentPatients from '../../../assets/svg/recent_patients.svg';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {
  FONT_SIZE_12,
  FONT_SIZE_10,
  FONT_SIZE_28,
  FONT_SIZE_16,
  FONT_SIZE_24,
} from '../../../styles/typography';
import {GetRecentPatient} from '../../../redux/action/doctor/myDoctorAction';
import {Host} from '../../../utils/connection';
import NetInfo from '@react-native-community/netinfo';
import THEME from '../../../styles/theme';
import Colors from '../../../styles/colorsV2';

function Dashboard({navigation}) {
  const {recentPatient, recentPatientLoading} = useSelector(
    (state) => state.MyDoctorReducer,
  );
  const {data, isLogedin, isDoctor} = useSelector((state) => state.AuthReducer);
  let imageSource = '';
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
    imageSource = require('../../../assets/images/dummy_profile.png');
  }
  const upcomingOppointment = [
    {name: 'Veronica Stevens', reason: ' -General Checkup'},
    {name: 'Alan Robert', reason: ' -Osteopathy'},
    {name: 'Amy Border', reason: ' -Cosmotology'},
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetRecentPatient(data._id));
  }, []);

  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        setIsConnected(state.isConnected);
      } else {
        setIsConnected(state.isConnected);
      }
    });
    return unsubscribe;
  });
  const animateNoNetwork = useRef(new Animated.Value(0)).current;

  const onNetworkFailure = () => {
    Animated.timing(animateNoNetwork, {
      toValue: 1,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  };
  const onNetworkRestore = () => {
    Animated.timing(animateNoNetwork, {
      toValue: 0,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    if (isConnected) {
      onNetworkRestore();
    } else {
      onNetworkFailure();
    }
  }, [isConnected]);

  const [theme, setTheme] = THEME.useTheme();
  const [themeValue, setThemeValue] = useState({});
  useEffect(() => {
    const THEME_VALUE = Colors(theme);
    setThemeValue(THEME_VALUE);
  }, [theme]);

  return (
    <View style={{flex: 1, backgroundColor: themeValue.primary_background}}>
      <TopNavBar
        navigation={navigation}
        headerText={'My Dashboard'}
        LeftComp={
          <ProfilePic
            style={{
              Container: {
                height: 50,
                width: 50,
                borderRadius: 50,
              },
              Image: {borderRadius: 50},
            }}
            sourceurl={imageSource}></ProfilePic>
        }></TopNavBar>
      <ScrollView>
        <View
          style={{
            width: '85%',
            alignSelf: 'center',
            flexDirection: 'row',
            paddingTop: '5%',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              height: 'auto',
              width: '55%',
              backgroundColor: '#f4f4f4',
              borderRadius: 15,
              paddingHorizontal: '5%',
              paddingVertical: '4%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                paddingBottom: '10%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                  backgroundColor: '#efa860',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: FONT_SIZE_28,
                    lineHeight: 32,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  +
                </Text>
              </View>
              <Text style={{fontSize: FONT_SIZE_16}}>Waiting Room</Text>
            </View>
            <View
              style={{
                width: '100%',
                maxWidth: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: '5%',
              }}>
              <Text style={{fontSize: FONT_SIZE_28, fontWeight: 'bold'}}>
                04
              </Text>
              <Text style={{fontSize: FONT_SIZE_12, paddingHorizontal: '10%'}}>
                Patients waiting to be attended
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: '4%',
              }}>
              <Text style={{color: '#ef786e', fontSize: FONT_SIZE_12}}>
                Approx. wait time: 12 mins
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '40%',
              alignSelf: 'stretch',
              backgroundColor: '#e6f7f5',
              borderRadius: 15,
              paddingHorizontal: '5%',
              paddingVertical: '4%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                paddingBottom: '10%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                  backgroundColor: '#37acac',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: FONT_SIZE_24,
                    lineHeight: 28,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  $
                </Text>
              </View>
              <Text style={{fontSize: FONT_SIZE_16}}>Revenue</Text>
            </View>
            <View
              style={{
                width: '100%',
                maxWidth: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: '5%',
              }}>
              <Text style={{fontSize: FONT_SIZE_28, fontWeight: 'bold'}}>
                $6.5K
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: '4%',
              }}>
              <Text style={{fontSize: FONT_SIZE_10}}>Approx.revenue-June</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: '85%',
            alignSelf: 'center',
            marginTop: '5%',
            paddingVertical: '5%',
            backgroundColor: '#fcf0e4',
            paddingHorizontal: '5%',
            borderRadius: 15,
          }}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              paddingBottom: '5%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 30,
                backgroundColor: '#efa860',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Clock />
            </View>
            <Text style={{fontSize: FONT_SIZE_16, marginLeft: '5%'}}>
              Upcoming Appointments
            </Text>
          </View>
          {upcomingOppointment.map((item) => (
            <View
              style={{
                width: '90%',
                // backgroundColor: 'red',
                alignSelf: 'center',
                borderBottomWidth: 1.5,
                borderColor: 'rgba(0,0,0,0.08)',
                paddingVertical: '4%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        height: 8,
                        width: 8,
                        borderRadius: 10,
                        backgroundColor: '#efa860',
                        marginRight: '2%',
                      }}></View>
                    <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                    <Text style={{fontSize: FONT_SIZE_12}}>{item.reason}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: '6%',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: FONT_SIZE_12,
                        marginRight: '4%',
                        fontWeight: 'bold',
                      }}>
                      10:00 am
                    </Text>
                    <Text style={{fontWeight: '900', color: '#efa860'}}>|</Text>
                    <Text
                      style={{
                        fontSize: FONT_SIZE_12,
                        marginLeft: '4%',
                        color: '#a09e9e',
                        fontWeight: 'bold',
                      }}>
                      30 mins
                    </Text>
                  </View>
                </View>
                <View>
                  <MaterialIcon
                    name="chevron-right"
                    size={28}
                    color={'#a09e9e'}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
        <View
          style={{
            width: '85%',
            alignSelf: 'center',
            marginTop: '5%',
            paddingVertical: '5%',
            backgroundColor: '#e6f7f5',
            paddingHorizontal: '5%',
            borderRadius: 15,
          }}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              paddingBottom: '5%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 30,
                backgroundColor: '#37acac',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <RecentPatients />
            </View>
            <Text style={{fontSize: FONT_SIZE_16, marginLeft: '5%'}}>
              Recent Patients
            </Text>
          </View>
          {recentPatient.map((item) => {
            if (item) {
              const {patient, _id} = item;
              return patient ? (
                <View
                  key={_id}
                  style={{
                    width: '90%',
                    // backgroundColor: 'red',
                    alignSelf: 'center',
                    borderBottomWidth: 1.5,
                    borderColor: 'rgba(0,0,0,0.08)',
                    paddingVertical: '4%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            height: 8,
                            width: 8,
                            borderRadius: 10,
                            backgroundColor: '#efa860',
                            marginRight: '2%',
                          }}></View>
                        <Text
                          style={{
                            fontWeight: 'bold',
                          }}>{`${patient.firstName} ${patient.lastName}`}</Text>
                        <Text style={{fontSize: FONT_SIZE_12}}>
                          {' '}
                          - General Checkup
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: '6%',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: FONT_SIZE_12,
                            marginRight: '4%',
                            fontWeight: 'bold',
                          }}>
                          10:00 am
                        </Text>
                        <Text style={{fontWeight: '900', color: '#efa860'}}>
                          |
                        </Text>
                        <Text
                          style={{
                            fontSize: FONT_SIZE_12,
                            marginLeft: '4%',
                            color: '#a09e9e',
                            fontWeight: 'bold',
                          }}>
                          30 mins
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('PatientDetails', {patient});
                      }}>
                      <MaterialIcon
                        name="chevron-right"
                        size={28}
                        color={'#a09e9e'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null;
            }
            return null;
          })}
        </View>
      </ScrollView>
      {!isConnected && (
        <Animated.View
          style={{
            paddingVertical: '2%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ddd',
            height: animateNoNetwork.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 30],
            }),
          }}>
          <Text>No Internet connection</Text>
        </Animated.View>
      )}
    </View>
  );
}

export default Dashboard;
