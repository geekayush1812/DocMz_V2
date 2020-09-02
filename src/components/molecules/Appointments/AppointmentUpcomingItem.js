import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
  NEW_PRIMARY_COLOR,
  GREY_BACKGROUND,
} from '../../../styles/colors';
import moment from 'moment';
const AppointmentUpcomingItem = ({style, item}) => {
  const {doctor} = item;
  return (
    <View style={[styles.mainContainer, style ?? {}]}>
      <Image
        source={require('../../../assets/jpg/person1.jpg')}
        style={{height: 70, width: 70, borderRadius: 35, margin: 10}}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          margin: 10,
        }}>
        <Text style={styles.docName}>{doctor.basic.name}</Text>
        <Text style={styles.docSpeciality}>{doctor.specialty}</Text>
        <Text style={styles.appointmentName}>{doctor.appointmentName}</Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <Image
          source={require('../../../assets/icons/chat.png')}
          style={{
            height: 25,
            width: 25,
            marginBottom: 7,
          }}
          resizeMode="contain"
        />
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 12,
                color: '#ef786e',
              }}>
              {moment(item.bookedFor).format('dddd, ')}
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                color: '#ef786e',
              }}>
              {moment(item.bookedFor).format('MMM DD')}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
              color: '#ef786e',
              textAlign: 'right',
            }}>
            {moment(item.bookedFor).format('hh:mm a')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AppointmentUpcomingItem;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 14,
    flexDirection: 'row',
    // borderWidth: 1,
  },
  docName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
  },
  docSpeciality: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  appointmentName: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: NEW_PRIMARY_BACKGROUND,
  },
});
