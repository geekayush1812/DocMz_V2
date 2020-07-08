/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Card from '../../atoms/Card/Card';
import DmzText from '../../atoms/DmzText/DmzText';
import DmzButton from '../../atoms/DmzButton/DmzButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularButton from '../../atoms/CircularButton/CircularButton';
import {
  PRIMARY_TEXT,
  TERTIARY_TEXT,
  PRIMARY_COLOR,
} from '../../../styles/colors';
import AnimInput from '../AnimInput/AnimInput';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {UpdateProfile} from '../../../redux/action/patientAccountAction';

export default function TempEditCard({style, details}) {
  const [celcius, setCelcius] = useState(
    ((parseInt(details.infoOne, 10) - 32) * 0.5556).toPrecision(5).toString(),
  );
  const [fahrenheit, setFahrenheit] = useState(details.infoOne);
  const [date, setDate] = useState(details.headerTwo);
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.AuthReducer);

  const saveTemp = async () => {
    const response = {
      temperature: {
        value: fahrenheit,
        date: date,
      },
    };
    await dispatch(UpdateProfile(response, data.id));
  };
  return (
    <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
      <View style={[styles.Card, style ? style.Card : null]}>
        <DmzText
          text="Record your Temprature"
          style={{fontSize: 18, color: PRIMARY_TEXT}}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <AnimInput
            placeholder="Centigrade"
            inputHandler={(txt) => {
              setCelcius(txt);
              const far = (parseInt(txt, 10) * 1.8 + 32)
                .toPrecision(5)
                .toString();
              setFahrenheit(far);
            }}
            value={celcius}
            style={{
              Container: {...styles.Container, width: '40%'},
              Input: styles.Input,
              Placeholder: styles.Placeholder,
            }}
          />
          <AnimInput
            placeholder="Fahrenheit"
            inputHandler={(txt) => {
              setFahrenheit(txt);
              const cel = ((parseInt(txt, 10) - 32) * 0.555)
                .toPrecision(5)
                .toString();
              setCelcius(cel);
            }}
            value={fahrenheit}
            style={{
              Container: {...styles.Container, width: '40%'},
              Input: styles.Input,
              Placeholder: styles.Placeholder,
            }}
          />
        </View>

        <AnimInput
          placeholder="Pulse"
          style={{
            Container: styles.Container,
            Input: styles.Input,
            Placeholder: styles.Placeholder,
          }}
        />
        <DmzText
          lite
          text="Date"
          style={[styles.Placeholder, {marginTop: 20, marginBottom: -20}]}
        />
        <DatePicker
          date={date}
          mode="date"
          placeholder="Select date"
          format="DD MMM YYYY"
          minDate="06 Jan 1950"
          maxDate={Moment(new Date(), 'DD MMM YYYY')}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          allowFontScaling={true}
          customStyles={{
            dateInput: {
              borderWidth: 0,
              fontSize: 15,
              height: 40,
              marginBottom: 10,
            },
            dateText: {
              width: '100%',
              fontSize: 18,
              fontWeight: 'bold',
              color: PRIMARY_COLOR,
              left: 0,
              marginTop: 15,
              marginBottom: -10,
              marginLeft: 0,
            },
            placeholderText: {
              width: '100%',
              color: '#ccc',
              fontWeight: 'normal',
              marginTop: 0,
              fontSize: 18,
              left: 0,
              marginBottom: -10,
              marginLeft: 0,
            },
          }}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            width: '100%',
            marginTop: 20,
            alignItems: 'center',
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
      </View>
      <View style={{alignSelf: 'center', marginTop: -35, elevation: 5}}>
        <CircularButton onPress={saveTemp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Card: {
    elevation: 4,
    borderRadius: 20,
    height: 'auto',
    width: '80%',
    padding: 15,
    backgroundColor: '#E9E5FF',
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingBottom: 70,
  },
  Container: {height: 60, marginTop: 20, left: 0},
  Input: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    left: 0,
    marginTop: 15,
    marginBottom: 0,
  },
  Placeholder: {
    fontSize: 16,
    color: TERTIARY_TEXT,
  },
  Input2: {
    elevation: 0,
    height: 'auto',
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E3FE',
    width: '90%',
    color: PRIMARY_TEXT,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
