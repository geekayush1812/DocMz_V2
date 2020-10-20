import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
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
import {useSelector, useDispatch} from 'react-redux';
import {AddFevDoc} from '../../../reduxV2/action/PatientAction';
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
  const {isLoggedin} = useSelector((state) => state.AuthReducer);
  const {patient} = useSelector((state) => state.PatientReducer);
  const dispatch = useDispatch();
  const heartHandle = () => {
    if (!isLoggedin) {
      navigation.navigate('Auth');
    } else {
      dispatch(AddFevDoc(data._id, patient._id));
    }
  };
  useEffect(() => {
    const res = patient?.favourites?.some((item) => {
      return item._id === data._id;
    });
    setHeartActive(res);
  }, [patient]);
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('DoctorProfile', {data: data})}
        style={{
          flex: 4.5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {Profile}
        <View
          style={{
            paddingLeft: '3%',
            flex: 1,
          }}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <Text
              adjustsFontSizeToFit
              style={CardContentStyles.AvailableDoctorsName}>
              {DoctorName}
            </Text>
            <Text style={{textTransform: 'capitalize'}}>{Specialization}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1.5%',
            }}>
            {schedule.map((item, index) => {
              return (
                <>
                  <Text
                    key={`${item.bookedFor}-${index}`}
                    style={{
                      fontSize: 13,
                      marginRight: index === schedule.length - 1 ? 0 : '2%',
                      marginLeft: index === 0 ? 0 : '2%',
                    }}>
                    {moment(item.bookedFor).format('hh:mm a')}
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
            padding: '1%',
            backgroundColor: SECONDARY_BACKGROUND,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/icons/star.png')}
            style={{height: 15, width: 15}}
          />
          <Text
            style={{
              marginHorizontal: '1.5%',
              fontFamily: 'Montserrat-SemiBold',
            }}>
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
          <TouchableOpacity
            onPress={() => navigation.navigate('DoctorProfile', {data: data})}
            style={{zIndex: 2000}}>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  AvailableDoctorsDetails: {
    marginLeft: 15,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  AvailableDoctorsName: {
    fontSize: 19,
    color: NEW_HEADER_TEXT,
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-SemiBold',
  },

  AvailableDoctorsSpecialization: {
    color: NEW_HEADER_TEXT,
    fontSize: 12,
    lineHeight: 14,
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
    flex: 1,
    marginLeft: '4%',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
});

export default AvailDoctorContentV2;
