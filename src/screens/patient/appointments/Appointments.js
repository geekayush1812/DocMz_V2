import React, {useState, useEffect} from 'react';
import {View, Text, UIManager, Platform, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import TopNavBar from '../../../components/molecules/TopNavBar/TopNavBar';
import {
  NEW_PRIMARY_COLOR,
  INPUT_PLACEHOLDER,
  NEW_HEADER_TEXT,
  GREY_BACKGROUND,
} from '../../../styles/colors';
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native-gesture-handler';
import AppointmentHistoryItem from '../../../components/molecules/Appointments/AppointmentHistoryItem';
import AppointmentOngoingItem from '../../../components/molecules/Appointments/AppointmentOngoingItem';
import AppointmentUpcomingItem from '../../../components/molecules/Appointments/AppointmentUpcomingItem';

import {GetAppointments} from '../../../reduxV2/action/PatientAction';
import {ListingWithThumbnailLoader} from '../../../components/atoms/Loader/Loader';
import LottieView from 'lottie-react-native';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Appointments = ({navigation}) => {
  const {
    gettingAppointments,
    appointments,
    errorGettingAppointments,
    patient,
  } = useSelector((state) => state.PatientReducer);
  const dispatch = useDispatch();

  const [tablocation, setTabLocation] = useState(0);
  const [upcomingAppointmentList, setUpcomingAppointmentList] = useState([]);
  const [historyAppointmentList, setHistoryAppointmentList] = useState([]);
  const [extractingAppointmentList, setExtractingAppointmentList] = useState(
    false,
  );
  useEffect(() => {
    !gettingAppointments && patient && dispatch(GetAppointments(patient._id));
    !gettingAppointments && setExtractingAppointmentList(true);
  }, []);
  useEffect(() => {
    const upcoming = [];
    const history = [];
    appointments.length !== 0 &&
      appointments?.forEach((item) => {
        const today = new Date();
        const bookedFor = new Date(item.bookedFor);

        const todayFullYear = today.getFullYear();
        const todayMonth = today.getMonth();
        const todayDate = today.getDate();
        const todayTime = today.getTime();

        const bookedForFullYear = bookedFor.getFullYear();
        const bookedForMonth = bookedFor.getMonth();
        const bookedForDate = bookedFor.getDate();
        const bookedForTime = bookedFor.getTime();

        if (
          bookedForFullYear >= todayFullYear &&
          bookedForMonth >= todayMonth &&
          bookedForDate >= todayDate &&
          bookedForTime > todayTime
        ) {
          upcoming.push(item);
        } else {
          history.push(item);
        }
      });
    setUpcomingAppointmentList(upcoming);
    setHistoryAppointmentList(history);
    setExtractingAppointmentList(false);
  }, [appointments]);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TopNavBar
        navigation={navigation}
        onLeftButtonPress={() => navigation.goBack(null)}
        headerText={'My Appointments'}
        style={{Section: {overflow: 'hidden', height: '20%', marginBottom: 0}}}
      />
      <View
        style={{
          backgroundColor: '#fff',
          padding: '2%',
          //   borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={[styles.tabView, {borderRightWidth: 1}]}>
          <TouchableOpacity onPress={() => setTabLocation(0)}>
            <Text
              style={
                tablocation === 0 ? styles.activeColor : styles.inactiveColor
              }>
              Upcoming
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.tabView, {borderLeftWidth: 1}]}>
          <TouchableOpacity onPress={() => setTabLocation(1)}>
            <Text
              style={
                tablocation === 1 ? styles.activeColor : styles.inactiveColor
              }>
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, backgroundColor: GREY_BACKGROUND}}>
        {tablocation === 1 ? (
          <FlatList
            style={{flex: 1, padding: '3%'}}
            data={historyAppointmentList}
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
            keyExtractor={(item) => item._id}
            renderItem={({item}) => (
              <AppointmentHistoryItem item={item} style={{margin: '2%'}} />
            )}
          />
        ) : (
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionHead}>Upcoming Appointments</Text>
              {gettingAppointments && extractingAppointmentList ? (
                <ListingWithThumbnailLoader />
              ) : upcomingAppointmentList.length === 0 ? (
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
                  <Text>0 Upcoming Appointments</Text>
                </View>
              ) : (
                upcomingAppointmentList.map((item) => (
                  <AppointmentUpcomingItem
                    key={item._id}
                    item={item}
                    style={{margin: '2%'}}
                  />
                ))
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Appointments;

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    borderColor: NEW_PRIMARY_COLOR,
    alignItems: 'center',
    padding: 5,
  },
  inactiveColor: {
    fontFamily: 'Montserrat-Regular',
    color: INPUT_PLACEHOLDER,
    fontSize: 18,
  },
  activeColor: {
    fontFamily: 'Montserrat-SemiBold',
    color: NEW_HEADER_TEXT,
    fontSize: 18,
  },
  section: {
    marginBottom: 15,
  },
  sectionHead: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: NEW_HEADER_TEXT,
    marginTop: 10,
    marginBottom: 15,
  },
});
