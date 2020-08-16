import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {
  NEW_HEADER_TEXT,
  NEW_PRIMARY_COLOR,
  INPUT_PLACEHOLDER,
  NEW_PRIMARY_BACKGROUND,
  NEW_UNSELECTED_TEXT,
} from '../../../styles/colors';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import VerticalText from '../../../components/atoms/VerticalText/VerticalText';
import moment from 'moment';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Appointments() {
  const [months, setMonths] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const getMonths = () => {
    const monthList = moment.months();
    const coming12Months = monthList
      .concat(monthList.slice(0, moment().month()))
      .slice(-12);
    setMonths(coming12Months);
  };
  useEffect(() => {
    getMonths();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TopNavBar headerText="My Appointments"></TopNavBar>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 25,
          paddingVertical: 10,
          alignItems: 'center',
          width: '100%',
          marginTop: 10,
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
            Upcoming
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            borderLeftWidth: 2,
            borderColor: NEW_PRIMARY_COLOR,
            flex: 1,
          }}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              color: INPUT_PLACEHOLDER,
              fontSize: 20,
              fontFamily: 'Montserrat-Regular',
            }}>
            History
          </Text>
        </View>
      </View>
      <View style={{paddingVertical: '4%'}}>
        <FlatList
          data={months}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            console.log(item, index);
            return (
              <TouchableOpacity
                style={{
                  width: 150,
                  alignItems: 'center',
                  borderRightWidth: 2,
                  borderColor: NEW_PRIMARY_COLOR,
                }}
                onPress={() => {
                  setMonth(item);
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color:
                      selectedIndex == index
                        ? NEW_HEADER_TEXT
                        : NEW_UNSELECTED_TEXT,
                    // fontWeight: 'bold',
                    fontFamily:
                      selectedIndex == index
                        ? 'Montserrat-Bold'
                        : 'Montserrat-Regular',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: '#effaf8',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: '4%',
          paddingVertical: '4%',
        }}>
        <VerticalText isActive text={{Top: 'S', Bottom: '28'}}></VerticalText>
        <VerticalText text={{Top: 'M', Bottom: '29'}}></VerticalText>
        <VerticalText text={{Top: 'T', Bottom: '30'}}></VerticalText>
        <VerticalText text={{Top: 'W', Bottom: '1'}}></VerticalText>
        <VerticalText text={{Top: 'T', Bottom: '2'}}></VerticalText>
        <VerticalText text={{Top: 'F', Bottom: '3'}}></VerticalText>
        <VerticalText text={{Top: 'S', Bottom: '4'}}></VerticalText>
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#f8f8f8',
            paddingHorizontal: '5%',
            paddingBottom: '2%',
          }}>
          <Text
            style={{
              fontSize: 22,
              marginTop: '4%',
              marginBottom: '3%',
              marginLeft: '1%',
            }}>
            10:00 am - 12:00 pm
          </Text>
          <Card />
          <Card />
          <Text
            style={{
              fontSize: 22,
              marginTop: '4%',
              marginBottom: '3%',
              marginLeft: '1%',
            }}>
            04:00 pm - 05:00 pm
          </Text>
          <Card />
          <Card />
          <Card />
        </View>
      </ScrollView>
    </View>
  );
}

const Card = () => (
  <View
    style={{
      backgroundColor: '#fff',
      width: '100%',
      elevation: 2,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: '2%',
      marginBottom: '5%',
    }}>
    <View
      style={{
        paddingVertical: '4%',
        paddingHorizontal: '4%',
        flex: 1,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            height: 8,
            width: 8,
            borderRadius: 8,
            backgroundColor: '#efa860',
          }}></View>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: '2%'}}>
          Hunter Richards
        </Text>
        <Text style={{fontSize: 16}}> - General Checkup</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: '5%',
          marginTop: '2%',
        }}>
        <Text style={{fontWeight: 'bold', marginRight: '4%'}}>10:30 am</Text>
        <Text style={{fontWeight: 'bold', color: '#efa860'}}>|</Text>
        <Text style={{color: '#a09e9e', marginLeft: '4%'}}>30 mins</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: '2%',
        }}>
        <Text style={{marginRight: '6%', color: '#37acac'}}>RESCHEDULE</Text>
        <Text style={{color: '#ef786e'}}>CANCEL</Text>
      </View>
    </View>
    <View>
      <MaterialIcon name={'chevron-right'} size={38} color={'#047b7b'} />
    </View>
  </View>
);
