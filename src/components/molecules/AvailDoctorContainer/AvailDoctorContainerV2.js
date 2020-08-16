import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Dimensions, Animated} from 'react-native';
import BasicCard from '../../atoms/BasicCard/BasicCard';
import AvailDoctorContentV2 from '../AvailDoctorContent/AvailDoctorContentV2';
import ProfilePic from '../../atoms/ProfilePic/ProfilePic';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {Host} from '../../../utils/connection';
import {PRIMARY_BACKGROUND} from '../../../styles/colors';
function AvailDoctorContainerV2({
  onPress,
  name,
  schedule,
  navigation,
  id,
  index,
  data,
  toggle,
}) {
  // console.log('Navigaton: ', id);
  // console.log(
  //   data.picture.length > 0
  //     ? `${Host}${data.picture[0].replace('public', '').replace(/\\/gi, '/')}`
  //     : '',
  // );

  // useEffect(() => {
  //   console.log(index);
  //   Animated.timing(cardPos, {
  //     toValue: 1,
  //     duration: 800,
  //     delay: index * 300,
  //     useNativeDriver: true,
  //   }).start();

  //   // console.log('2222222222222222222222222222222222222222222222222');
  //   // console.log(schedule);
  //   // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  // }, []);

  // const width = Dimensions.get('screen').width;
  // const cardPos = useRef(new Animated.Value(0)).current;
  // const cardView = cardPos.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [-1 * width, 0],
  // });

  let imageSource = require('../../../assets/jpg/person1.jpg');
  return (
    <TouchableWithoutFeedback
      style={[
        Styles.AvailableDoctorsCardContainer,
        // {transform: [{translateX: cardView}]},
      ]}
      onPress={() => {
        navigation.navigate('docPatientStrem', {data: data});
      }}>
      <BasicCard
        style={{
          CardContainer: Styles.AvailableDoctorsBasicCard,
        }}>
        <AvailDoctorContentV2
          toggle={toggle}
          DoctorName={`Dr. ${name}`}
          rating={4}
          onPress={onPress}
          Specialization={data.specialty || 'General Dentist'}
          schedule={schedule}
          navigation={navigation}
          data={data}
          Profile={
            <ProfilePic
              sourceurl={
                data.picture.length > 0
                  ? {
                      uri: `${Host}${data.picture[0]
                        .replace('public', '')
                        .replace('\\\\', '/')}`,
                    }
                  : imageSource
              }
              style={{
                Container: {
                  height: 80,
                  width: 80,
                  borderRadius: 80,
                },
                Image: {
                  borderRadius: 80,
                },
              }}
            />
          }
        />
      </BasicCard>
    </TouchableWithoutFeedback>
  );
}

const Styles = StyleSheet.create({
  AvailableDoctorsCardContainer: {
    marginTop: 0,
  },
  AvailableDoctorsBasicCard: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 'auto',
    borderRadius: 13,
    elevation: 0,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.18)',
    backgroundColor: '#fff',
  },
});
export default AvailDoctorContainerV2;
