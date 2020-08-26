import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import ProfilePic from '../../../components/atoms/ProfilePic/ProfilePic';
import Clock from '../../../assets/svg/clock.svg';
import RecentPatients from '../../../assets/svg/recent_patients.svg';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
function Dashboard({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
            sourceurl={require('../../../assets/jpg/person3.jpg')}></ProfilePic>
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
                    fontSize: 28,
                    lineHeight: 32,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  +
                </Text>
              </View>
              <Text style={{fontSize: 16}}>Waiting Room</Text>
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
              <Text style={{fontSize: 28, fontWeight: 'bold'}}>04</Text>
              <Text style={{fontSize: 12, paddingHorizontal: '10%'}}>
                Patients waiting to be attended
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: '4%',
              }}>
              <Text style={{color: '#ef786e', fontSize: 12}}>
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
                    fontSize: 24,
                    lineHeight: 28,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  $
                </Text>
              </View>
              <Text style={{fontSize: 16}}>Revenue</Text>
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
              <Text style={{fontSize: 28, fontWeight: 'bold'}}>$6.5K</Text>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: '4%',
              }}>
              <Text style={{fontSize: 10}}>Approx.revenue-June</Text>
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
            <Text style={{fontSize: 16, marginLeft: '5%'}}>
              Upcoming Appointments
            </Text>
          </View>

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
                  <Text style={{fontWeight: 'bold'}}>Veronica Stevens</Text>
                  <Text style={{fontSize: 12}}> - General Checkup</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: '6%',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      marginRight: '4%',
                      fontWeight: 'bold',
                    }}>
                    10:00 am
                  </Text>
                  <Text style={{fontWeight: '900', color: '#efa860'}}>|</Text>
                  <Text
                    style={{
                      fontSize: 12,
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
                  <Text style={{fontWeight: 'bold'}}>Alan Robert</Text>
                  <Text style={{fontSize: 12}}> - Osteopathy</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: '6%',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      marginRight: '4%',
                      fontWeight: 'bold',
                    }}>
                    10:30 am
                  </Text>
                  <Text style={{fontWeight: '900', color: '#efa860'}}>|</Text>
                  <Text
                    style={{
                      fontSize: 12,
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
          <View
            style={{
              width: '90%',
              // backgroundColor: 'red',
              alignSelf: 'center',
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
                  <Text style={{fontWeight: 'bold'}}>Amy Border</Text>
                  <Text style={{fontSize: 12}}> - Cosmotology</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: '6%',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      marginRight: '4%',
                      fontWeight: 'bold',
                    }}>
                    11:00 am
                  </Text>
                  <Text style={{fontWeight: '900', color: '#efa860'}}>|</Text>
                  <Text
                    style={{
                      fontSize: 12,
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
            <Text style={{fontSize: 16, marginLeft: '5%'}}>
              Recent Patients
            </Text>
          </View>

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
                  <Text style={{fontWeight: 'bold'}}>Veronica Stevens</Text>
                  <Text style={{fontSize: 12}}> - General Checkup</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: '6%',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      marginRight: '4%',
                      fontWeight: 'bold',
                    }}>
                    10:00 am
                  </Text>
                  <Text style={{fontWeight: '900', color: '#efa860'}}>|</Text>
                  <Text
                    style={{
                      fontSize: 12,
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
                  navigation.navigate('PatientsList');
                }}>
                <MaterialIcon
                  name="chevron-right"
                  size={28}
                  color={'#a09e9e'}
                />
              </TouchableOpacity>
            </View>
          </View>
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
                  <Text style={{fontWeight: 'bold'}}>Alan Robert</Text>
                  <Text style={{fontSize: 12}}> - Osteopathy</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: '6%',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      marginRight: '4%',
                      fontWeight: 'bold',
                    }}>
                    10:30 am
                  </Text>
                  <Text style={{fontWeight: '900', color: '#efa860'}}>|</Text>
                  <Text
                    style={{
                      fontSize: 12,
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
          <View
            style={{
              width: '90%',
              // backgroundColor: 'red',
              alignSelf: 'center',
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
                  <Text style={{fontWeight: 'bold'}}>Amy Border</Text>
                  <Text style={{fontSize: 12}}> - Cosmotology</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: '6%',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      marginRight: '4%',
                      fontWeight: 'bold',
                    }}>
                    11:00 am
                  </Text>
                  <Text style={{fontWeight: '900', color: '#efa860'}}>|</Text>
                  <Text
                    style={{
                      fontSize: 12,
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
        </View>
      </ScrollView>
    </View>
  );
}

export default Dashboard;
