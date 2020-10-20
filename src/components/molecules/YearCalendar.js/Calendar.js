/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, FlatList} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {extendMoment} from 'moment-range';
import Moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  NEW_HEADER_TEXT,
  SEARCH_PLACEHOLDER_COLOR,
  NEW_UNSELECTED_TEXT,
  NEW_PRIMARY_COLOR,
  SECONDARY_COLOR,
  SECONDARY_BACKGROUND,
} from '../../../styles/colors';
import RadioGroupV2 from '../../molecules/RadioGroup/RadioGroupV2';
const moment = extendMoment(Moment);

export default function Calendar({onDateChange, getDateView}) {
  const width = Dimensions.get('screen').width;
  const [months, setMonths] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const exampleRef = React.createRef();
  const daysLable = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [selectedStartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState();

  const getMonths = () => {
    const monthList = moment.months();
    const coming12Months = monthList
      .concat(monthList.slice(0, moment().month()))
      .slice(-12);
    console.log(coming12Months);
    setMonths(coming12Months);
  };
  const minDate = new Date(1950, 1, 1);
  const maxDate = new Date(2050, 12, 31);

  const setMonth = async (i) => {
    var index = months.indexOf(i);
    var index2 = selectedIndex;
    console.log(index2, ' --- ', index);
    if (index > index2) {
      while (index2 < index) {
        await exampleRef.current.handleOnPressNext();
        console.log('changing');
        index2++;
      }
      setSelectedIndex(index2);
    } else if (index < index2) {
      while (index2 > index) {
        await exampleRef.current.handleOnPressPrevious();
        console.log('changing');
        index2--;
      }
      setSelectedIndex(index2);
    }
    console.log(index2, ' --- ', index);
  };

  useEffect(() => {
    getMonths();
  }, []);

  const [activeConsultationType, setActiveConsultationType] = useState('TC');

  return (
    <>
      <View
        style={{
          height: 80,
          paddingHorizontal: '10%',
          justifyContent: 'space-around',
          borderBottomWidth: 3,
          borderBottomColor: 'rgba(237,237,237,0.9)',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          Select consultation type
        </Text>
        <View
          style={{flex: 1, justifyContent: 'center', paddingHorizontal: '3%'}}>
          <RadioGroupV2
            horizontal={true}
            activeKey={activeConsultationType}
            setActiveKey={setActiveConsultationType}
            Item={[
              {value: 'Tele-Consult', id: 'TC'},
              {value: 'In-Person', id: 'IP'},
            ]}></RadioGroupV2>
        </View>
      </View>
      <FlatList
        data={months}
        horizontal
        style={{
          borderBottomWidth: 3,
          borderBottomColor: 'rgba(237,237,237,0.9)',
          paddingVertical: '4%',
        }}
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
      <FlatList
        data={daysLable}
        scrollEnabled={false}
        horizontal
        style={{marginHorizontal: 10, marginTop: 20}}
        renderItem={({item}) => {
          return (
            <View
              style={{
                width: width / 7 - 20 / 7,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: NEW_HEADER_TEXT,
                  fontFamily: 'Montserrat-SemiBold',
                  width: '100%',
                  textAlign: 'center',
                }}>
                {item}
              </Text>
            </View>
          );
        }}
      />
      <CalendarPicker
        ref={exampleRef}
        startFromMonday={false}
        allowRangeSelection={true}
        minDate={minDate}
        maxDate={maxDate}
        todayBackgroundColor="transparent"
        selectedDayStyle={{
          backgroundColor: SECONDARY_COLOR,
          borderRadius: 6,
        }}
        nextTitleStyle={{height: 0}}
        previousTitleStyle={{height: 0}}
        todayTextStyle={{
          borderRadius: 6,
          borderWidth: 1,
          width: 30,
          height: 30,
          textAlignVertical: 'center',
          textAlign: 'center',
          borderColor: NEW_PRIMARY_COLOR,
        }}
        textStyle={{
          color: NEW_HEADER_TEXT,
          fontFamily: 'Montserrat-Regular',
        }}
        selectedDayTextColor="#000000"
        onDateChange={onDateChange}
        selectedRangeStartStyle={{
          backgroundColor: SECONDARY_COLOR,
        }}
        selectedRangeEndStyle={{
          backgroundColor: SECONDARY_COLOR,
        }}
        selectedRangeStyle={{
          backgroundColor: SECONDARY_BACKGROUND,
          paddingVertical: -20,
        }}
        weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
        dayLabelsWrapper={{
          height: 0,
          borderBottomWidth: 0,
          borderTopWidth: 0,
          backgroundColor: 'transaprent',
          maxHeight: 0,
          width: 2,
          marginBottom: -30,
        }}
        showDayStragglers
        monthYearHeaderWrapperStyle={{
          height: 0,
          width: 0,
        }}
      />
    </>
  );
}
