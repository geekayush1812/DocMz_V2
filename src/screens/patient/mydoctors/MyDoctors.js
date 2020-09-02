import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {GREY_BACKGROUND} from '../../../styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import {GetRecentDoctor} from '../../../redux/action/patientAccountAction';
import MyDoctorItem from '../../../components/molecules/MyDoctorItem/MyDoctorItem';
const MyDoctors = ({navigation}) => {
  const {
    gettingRecentDoctors,
    recentDoctors,
    errorGettingRecentDoctors,
    patient,
  } = useSelector((state) => state.PatientAccountReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    !gettingRecentDoctors && dispatch(GetRecentDoctor(patient._id));
  }, []);
  useEffect(() => {
    console.log(recentDoctors);
  }, [recentDoctors]);
  return (
    <View style={{flex: 1, backgroundColor: '#fcfcfc'}}>
      <TopNavBar
        headerText="My Doctors"
        {...{navigation}}
        style={{Container: {marginTop: 5, marginBottom: 10}}}
      />
      <View style={{flex: 1, backgroundColor: GREY_BACKGROUND}}>
        <FlatList
          keyExtractor={(item) => item._id}
          data={recentDoctors}
          style={{flex: 1, padding: 20}}
          renderItem={({item}) => (
            <MyDoctorItem
              data={{canDoMessage: true}}
              appointment={item.appointment}
              doctor={item.doctor}
            />
          )}
        />
      </View>
    </View>
  );
};

export default MyDoctors;
