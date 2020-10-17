/* eslint-disable react-native/no-inline-styles */
import React, {setState, useState, useEffect} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {extendMoment} from 'moment-range';
import Moment from 'moment';
import dateArray from 'moment-array-dates';
import Calendar from '../../../components/molecules/YearCalendar.js/Calendar';
import AppoinmentSlider from '../../../components/molecules/YearCalendar.js/AppoinmentSlider';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {
  GetAppointmentSlot,
  GetFamilyMember,
} from '../../../redux/action/patientAccountAction';
import {useDispatch, useSelector} from 'react-redux';
import {
  NEW_HEADER_TEXT,
  NEW_PRIMARY_COLOR,
  SECONDARY_COLOR,
} from '../../../styles/colors';
import AppointmentQuestion from '../../../components/molecules/Modal/AppointmentQuestion';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default function TimeSlotScreen({navigation}) {
  const [selectedStartDate, setStartDate] = useState('');
  const [selectedEndDate, setEndDate] = useState('');
  const [questionModal, setModal] = useState({
    visible: false,
    onNext: () => {},
  });
  const dispatch = useDispatch();
  const {appointmentForSlotLoading, appointmentForSlot} = useSelector(
    (state) => state.PatientAccountReducer,
  );
  const [forWhomOption, setForWhomOption] = useState([
    'Myself',
    'Mother',
    'Father',
    'Other',
  ]);

  const data = navigation.state.params.data;
  const {_id} = data;

  const {familyMember, isPatientAccountReducerLoading, patient} = useSelector(
    (state) => state.PatientAccountReducer,
  );
  useEffect(() => {
    !isPatientAccountReducerLoading && dispatch(GetFamilyMember(patient.meta));
  }, []);
  useEffect(() => {
    const relationship = Array.from(
      new Set(familyMember.map((item) => item.relationship)),
    );
    setForWhomOption(relationship);
  }, [familyMember]);

  const getDateView = (startDate, endDate) => {
    if (startDate != '' && endDate != '') {
      const start = Moment(startDate).format('YYYY-MM-DD');
      const end = Moment(endDate).format('YYYY-MM-DD');

      !appointmentForSlotLoading &&
        dispatch(GetAppointmentSlot([[start, end]], _id));
    }
  };

  async function onDateChange(date, type) {
    if (type == 'START_DATE') {
      await setStartDate(date);
      console.log('in1', date);
      // setEndDate(null);
    } else if (type == 'END_DATE') {
      await setEndDate(date);
      console.log('in2', type);
      if (date != null) {
        console.log(selectedStartDate, date, '66666666666');
        getDateView(selectedStartDate, date);
      }
      // getDateView(selectedStartDate, selectedEndDate);
    }
  }

  // const onDateChange = (date, type) => {
  //   if (type === 'END_DATE') {

  //     console.log(selectedStartDate, selectedEndDate);
  //   } else {
  //   }
  // };
  return (
    <>
      <AppointmentQuestion
        {...questionModal}
        onCancel={() => {
          setModal({visible: false});
        }}
        text="Who is this visit for?"
        options={forWhomOption}
      />
      <View
        style={{flex: 1, flexDirection: 'column', backgroundColor: '#ffffff'}}>
        <View>
          <TopNavBar
            navigation={navigation}
            headerText="Book"
            style={{Container: {marginVertical: 15}}}
          />
          <Calendar onDateChange={onDateChange} />
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginTop: 20,
              paddingHorizontal: '15%',
            }}>
            <View style={{flexDirection: 'row', alignContent: 'center'}}>
              <Text
                style={{
                  borderRadius: 6,
                  borderWidth: 1,
                  width: 20,
                  height: 20,
                  textAlign: 'center',
                  borderColor: NEW_PRIMARY_COLOR,
                  fontSize: 18,
                }}>
                {' '}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  height: 20,
                  textAlignVertical: 'center',
                  color: NEW_HEADER_TEXT,
                  fontFamily: 'Montserrat-Regular',
                }}>
                Today
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  borderRadius: 5,
                  backgroundColor: SECONDARY_COLOR,
                  width: 20,
                  height: 20,
                  textAlign: 'center',
                  borderColor: 'white',
                }}>
                {' '}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 10,
                  color: NEW_HEADER_TEXT,
                  fontFamily: 'Montserrat-Regular',
                }}>
                Chosen
              </Text>
            </View>
          </View>
        </View>
        <AppoinmentSlider
          navigation={navigation}
          slots={appointmentForSlot}
          doctorData={data}
          setModal={setModal}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bodyViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLayoutStyle: {
    width,
    height: 100,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slidingPanelLayoutStyle: {
    width,
    height,
    backgroundColor: '#7E52A0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commonTextStyle: {
    color: 'white',
    fontSize: 18,
  },
});
