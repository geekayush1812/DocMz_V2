/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import RatingStars from '../../atoms/ratingStars/RatingStarts';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  HEADER_TEXT,
  TERTIARY_TEXT_TWO,
  TERTIARY_TEXT,
  PRIMARY_COLOR,
  SECONDARY_BACKGROUND,
  NEW_HEADER_TEXT,
  NEW_PRIMARY_COLOR,
} from '../../../styles/colors';
import moment from 'moment';
function AvailDoctorContentV2({
  Profile,
  DoctorName,
  rating,
  Specialization,
  onPress,
  schedule,
  navigation,
  data,
  toggle,
}) {
  const [heartActive, setHeartActive] = useState(false);
  const heartHandle = () => {
    setHeartActive(!heartActive);
  };
  return (
    <>
      <TouchableOpacity
        style={CardContentStyles.AvailableDoctorsCardContent}
        onPress={() => {}}>
        {Profile}
        <View style={CardContentStyles.AvailableDoctorsDetails}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={CardContentStyles.AvailableDoctorsName}>
            {DoctorName}
          </Text>
          <Text style={CardContentStyles.AvailableDoctorsSpecialization}>
            {Specialization}
          </Text>
          {/* can be made as molecule and touchable if needed */}
          <View style={CardContentStyles.AvailableDoctorsAvailableTimes}>
            {schedule.map((item, index) => {
              return (
                <>
                  <Text
                    style={{
                      fontSize: 13,
                      marginRight: index === schedule.length - 1 ? 0 : '2%',
                      marginLeft: index === 0 ? 0 : '2%',
                    }}>
                    {moment(item.bookedFor).format('HH:mm a')}
                  </Text>
                  {schedule.length - 1 === index ? null : (
                    <Text style={{fontWeight: 'bold', color: '#efa860'}}>
                      |
                    </Text>
                  )}
                </>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
      <View style={CardContentStyles.AvailableDoctorsContinueButton}>
        <View
          style={{
            borderRadius: 5,
            padding: 3,
            backgroundColor: SECONDARY_BACKGROUND,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/icons/star.png')}
            style={{height: 15, width: 15}}
          />
          <Text
            style={{marginHorizontal: 5, fontFamily: 'Montserrat-SemiBold'}}>
            {parseFloat(rating).toFixed(1)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={heartHandle}>
            <FontAwesomeIcon
              name="heart"
              size={28}
              color={heartActive ? '#ef786e' : '#a09e9e'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress} style={{zIndex: 2000}}>
            <FontAwesomeIcon
              name="angle-right"
              size={30}
              color={NEW_PRIMARY_COLOR}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const CardContentStyles = StyleSheet.create({
  AvailableDoctorsCardContent: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  AvailableDoctorsDetails: {
    marginLeft: 15,
    alignSelf: 'stretch',
  },
  AvailableDoctorsName: {
    fontSize: 19,
    // fontWeight: '700',
    color: NEW_HEADER_TEXT,
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-SemiBold',
  },

  AvailableDoctorsSpecialization: {
    color: NEW_HEADER_TEXT,
    fontSize: 12,
    lineHeight: 18,
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-Regular',
  },
  AvailableDoctorsAvailableTimes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  AvailableDoctorsAvailableTime: {
    paddingHorizontal: 4,
    borderRadius: 8,
    color: TERTIARY_TEXT_TWO,
    marginRight: 10,
  },
  AvailableDoctorsAvailableTimeActive: {
    backgroundColor: PRIMARY_COLOR,
    color: '#fafafa',
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  AvailableDoctorsContinueButton: {
    marginLeft: '4%',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
});

export default AvailDoctorContentV2;
