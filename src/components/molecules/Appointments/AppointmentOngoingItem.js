import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {
  NEW_PRIMARY_BACKGROUND,
  INPUT_PLACEHOLDER,
  SECONDARY_COLOR,
  NEW_PRIMARY_COLOR,
  NEW_PRIMARY_LIGHT_BG,
  NEW_HEADER_TEXT,
  GREY_BACKGROUND,
} from '../../../styles/colors';

const AppointmentOngoingItem = ({
  style,
  docName,
  docSpeciality,
  appointmentName,
}) => (
  <View style={[styles.mainContainer, style ?? {}]}>
    <View style={styles.body}>
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
        <Text style={styles.docName}>{docName}</Text>
        <Text style={styles.docSpeciality}>{docSpeciality}</Text>
        <Text style={styles.appointmentName}>{appointmentName}</Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          width: 65,
          alignItems: 'center',
          borderColor: GREY_BACKGROUND,
          borderLeftWidth: 2,
          paddingLeft: 5,
          //   borderWidth: 1,
        }}>
        <Image
          source={require('../../../assets/icons/clock.png')}
          style={{
            height: 25,
            width: 25,
            marginBottom: 7,
          }}
          resizeMode="contain"
        />
        <Text style={styles.time}>Starting in 12 mins</Text>
      </View>
    </View>
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>Enter Waiting Room </Text>
    </View>
  </View>
);

export default AppointmentOngoingItem;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: 14,
    overflow: 'hidden',
    // borderWidth: 1,
  },
  body: {
    padding: 7,
    flexDirection: 'row',
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
    color: NEW_HEADER_TEXT,
  },
  time: {
    textAlign: 'center',
    color: NEW_HEADER_TEXT,
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    // borderWidth: 1,
  },
  footerContainer: {
    padding: 12,
    backgroundColor: NEW_PRIMARY_LIGHT_BG,
    alignItems: 'center',
  },
  footerText: {
    color: NEW_PRIMARY_BACKGROUND,
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
});
