import React from 'react';
import {StyleSheet} from 'react-native';
import BasicCard from '../../atoms/BasicCard/BasicCard';
import AvailDoctorContentV2 from '../AvailDoctorContent/AvailDoctorContentV2';
import ProfilePic from '../../atoms/ProfilePic/ProfilePic';
import {Host} from '../../../utils/connection';
import {View} from 'react-native-animatable';
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
  let imageSource = require('../../../assets/images/dummy_profile.png');
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '93%',
        alignSelf: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#dddbdb',
        // backgroundColor: 'red',
        marginBottom: '3%',
        paddingVertical: '5%',
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
                height: 60,
                width: 60,
                borderRadius: 60,
              },
              Image: {
                borderRadius: 60,
              },
            }}
          />
        }
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  AvailableDoctorsCardContainer: {
    marginTop: 0,
  },
  // AvailableDoctorsBasicCard: {
  //   marginHorizontal: '2%',
  //   marginBottom: '4%',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   height: 'auto',
  //   width: '95%',
  //   borderRadius: 13,
  //   elevation: 0,
  //   borderBottomWidth: 2,
  //   borderBottomColor: 'rgba(0,0,0,0.18)',
  //   backgroundColor: '#fff',
  // },
});
export default AvailDoctorContainerV2;
