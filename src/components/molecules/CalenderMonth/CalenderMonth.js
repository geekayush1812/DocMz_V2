import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Animated,
} from 'react-native';
import CalenderBlock from '../../atoms/CalenderBlock/CalenderBlock';
import calculateMonths from '../../../utils/calculateMonths';
import {months} from '../../../utils/Months';
import {useDispatch, useSelector} from 'react-redux';

const MountMonth = ({dayNdate}) => {
  console.log(dayNdate);
  return (
    <FlatList
      listKey={JSON.stringify(dayNdate)}
      data={dayNdate}
      numColumns={7}
      keyExtractor={item => item.date.toString()}
      renderItem={({item}) => (
        <CalenderBlock
          // onPress={() => alert(`On this date you have ${0} appointments`)}
          active={item.active}
          style={{
            Container: {borderColor: 'rgba(0,0,0,0.1)', borderWidth: 0.2},
            Text: {fontWeight: '700'},
          }}
          text={item.date}
        />
      )}
    />
  );
};
function CalenderMonth({style}) {
  console.log('calender month called');
  const [dayNdate, setdayNdate] = useState([]);
  const {
    allAppointmentLoading,
    allAppointments,
    allAppointmentFetchError,
  } = useSelector(state => state.MyDoctorReducer);
  const date = new Date();
  const calculateMonthsOnMount = () => {
    let arr = calculateMonths(date.getMonth());
    console.log('calculatemonth called');
    const Timeout = setTimeout(() => {
      console.log('setTImeout called');
      if (!allAppointmentLoading) {
        arr = arr.map(item => {
          if (allAppointments[item.date]) {
            return {
              ...item,
              active: true,
            };
          }
          return {
            ...item,
            active: false,
          };
        });
      }
      !allAppointmentLoading && setdayNdate(arr);
    }, 100);
    return () => clearTimeout(Timeout);
  };
  useEffect(calculateMonthsOnMount, []);
  return (
    <Animated.View
      style={[MonthOfCalendarStyles.Container, style ? style.Container : null]}>
      <View style={MonthOfCalendarStyles.Header}>
        <Text style={MonthOfCalendarStyles.HeaderText}>
          {months[date.getMonth()].name} {date.getFullYear()}
        </Text>
      </View>
      <View style={MonthOfCalendarStyles.ContentContainer}>
        <FlatList
          listKey={date.toString()}
          data={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          numColumns={7}
          keyExtractor={item => item.toString()}
          renderItem={({item}) => <CalenderBlock text={item} />}
        />
        {dayNdate.length ? (
          <MountMonth dayNdate={dayNdate} />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </Animated.View>
  );
}

const MonthOfCalendarStyles = StyleSheet.create({
  Container: {
    height: 'auto',
    marginLeft: 20,
    marginRight: 20,
  },
  Header: {},
  HeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  ContentContainer: {
    borderWidth: 0.2,
    borderColor: 'rgba(0,0,0,0.08)',
  },
});
export default React.memo(CalenderMonth);
