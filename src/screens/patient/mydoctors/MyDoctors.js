import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {GREY_BACKGROUND} from '../../../styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import {GetRecentDoctor} from '../../../reduxV2/action/PatientAction';
import MyDoctorItem from '../../../components/molecules/MyDoctorItem/MyDoctorItem';
import {ListingWithThumbnailLoader} from '../../../components/atoms/Loader/Loader';
import LottieView from 'lottie-react-native';

const MyDoctors = ({navigation}) => {
  const {
    gettingRecentDoctors,
    recentDoctors,
    errorGettingRecentDoctors,
    patient,
  } = useSelector((state) => state.PatientReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    !gettingRecentDoctors && dispatch(GetRecentDoctor(patient._id));
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fcfcfc'}}>
      <TopNavBar
        headerText="My Doctors"
        {...{navigation}}
        style={{Container: {marginTop: 5, marginBottom: 10}}}
      />
      <View style={{flex: 1, backgroundColor: GREY_BACKGROUND}}>
        {gettingRecentDoctors ? (
          <ListingWithThumbnailLoader />
        ) : (
          <FlatList
            keyExtractor={(item) => item._id}
            data={recentDoctors}
            ListEmptyComponent={
              <View
                style={{
                  height: 200,
                  width: '70%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LottieView
                  style={{height: '100%', width: '100%'}}
                  source={require('../../../assets/anim_svg/empty_bottle.json')}
                  autoPlay
                  loop
                />
              </View>
            }
            style={{flex: 1, padding: '6%'}}
            renderItem={({item}) => (
              <MyDoctorItem
                data={{canDoMessage: true}}
                appointment={item.appointment}
                doctor={item.doctor}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default MyDoctors;
