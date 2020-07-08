import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  LayoutAnimation,
  Text,
  Platform,
  UIManager,
  InteractionManager,
  Easing,
  ActivityIndicator,
} from 'react-native';
import FancyHeader from '../../../components/organisms/FancyHeader/FancyHeader';
import ToggleButton from '../../../components/molecules/ToggleButton/ToggleButton';
import Container from '../../../components/organisms/Container/Container';
import DmzSwitch from '../../../components/molecules/DmzSwitch/DmzSwitch';
import ProfilePic from '../../../components/atoms/ProfilePic/ProfilePic';
import TimelineContainer from '../../../components/molecules/TimelineContainer/TimelineContainer';
import CalenderMonth from '../../../components/molecules/CalenderMonth/CalenderMonth';
import {useDispatch, useSelector} from 'react-redux';
import {
  GettingDocterLatestInfo,
  FetchAppointments,
  FetchAllAppointments,
} from '../../../redux/action/doctor/myDoctorAction';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Home = () => {
  const dispatch = useDispatch();
  const {
    appointmentLoading,
    appointments,
    appointmentFetchError,
    allAppointmentLoading,
    allAppointments,
    allAppointmentFetchError,
  } = useSelector(state => state.MyDoctorReducer);
  const {data} = useSelector(state => state.AuthReducer);
  const [tabIndex, settabIndex] = useState(0);
  const tabIndexPos = useRef(new Animated.Value(0)).current;
  const [timeline, setTimeline] = useState(1);

  // getting recent appointments
  // useEffect(() => {
  //   dispatch(GettingDocterLatestInfo());
  // }, []);

  useEffect(() => {
    console.log('$$$$$$$$$$$!!!!!!!!!!!!$$$$$$$$$$$$$$$$');
    // console.log(doctorProfile._id);
    const date = new Date();
    console.log(appointments);
    !appointmentLoading &&
      dispatch(FetchAppointments(data.id, date.toISOString()));
    // !appointmentFetchError && console.log(appointments);
    !allAppointmentLoading &&
      dispatch(
        FetchAllAppointments(
          data.id,
          new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString(),
        ),
      );
  }, []);

  const onTabPress = function(tab) {
    if (tabIndex === 0 && tab === 2) {
      InteractionManager.runAfterInteractions(() => {
        Animated.timing(tabIndexPos, {
          toValue: 1,
          easing: Easing.elastic(),
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          settabIndex(1);
        });
      });
    }
    if (tabIndex === 1 && tab === 1) {
      InteractionManager.runAfterInteractions(() => {
        Animated.timing(tabIndexPos, {
          toValue: 0,
          easing: Easing.elastic(),
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          settabIndex(0);
        });
      });
    }
  };
  return (
    <View style={Styles.Container}>
      <FancyHeader
        hideRightComp
        hideLeftComp
        headerText="Appointment"
        style={{Container: {height: '35%'}}}>
        <ToggleButton text0="online" text1="offline" onToggle={() => {}} />
      </FancyHeader>
      <Container
        style={{
          height: '75%',
          transform: [{translateY: -50}],
          zIndex: 999,
        }}>
        <DmzSwitch
          tabOne={{title: 'Appointments', onPress: () => onTabPress(1)}}
          tabTwo={{title: 'Calender', onPress: () => onTabPress(2)}}
          style={{
            Container: {
              marginTop: 0,
              borderRadius: 38,
              elevation: 5,
              backgroundColor: '#fff',
            },
            Button: {height: 60},
            Slider: {
              borderWidth: null,
              backgroundColor: '#6231CB',
              zIndex: -10,
            },
            activeStyle: {color: '#fff'},
          }}
        />

        {tabIndex === 0 ? (
          appointmentLoading ? (
            <ActivityIndicator />
          ) : (
            <Animated.FlatList
              style={{
                flex: 1,
                paddingTop: 10,
                transform: [
                  {
                    scale: tabIndexPos.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0],
                    }),
                  },
                ],
              }}
              data={appointments}
              keyExtractor={item => item._id.toString()}
              renderItem={({item, index}) => {
                console.log(index);
                console.log(item.bookedFor);
                const date = new Date(item.bookedFor);
                const bookingTime = `${date.getHours()}:${date.getMinutes()}`;
                return (
                  <TimelineContainer
                    PatientName={item.PatientName || 'MadeupName'}
                    Timing={bookingTime}
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.create(
                          500,
                          LayoutAnimation.Types.easeIn,
                          LayoutAnimation.Properties.opacity,
                        ),
                      );
                      setTimeline(item._id);
                    }}
                    Age={item.Age || '21'}
                    Disease={item.Disease || 'Headache'}
                    Profile={
                      item.Profile || (
                        <ProfilePic
                          sourceurl={require('../../../assets/jpg/person1.jpg')}
                          style={{
                            Container: Styles.ProfilePic,
                            Image: Styles.ProfilePicImage,
                          }}
                        />
                      )
                    }
                    active={item._id === timeline}
                  />
                );
              }}
            />
          )
        ) : null}
        {tabIndex === 1 ? (
          // <Animated.FlatList
          //   style={
          //     {
          //       // transform: [
          //       //   {
          //       //     scale: tabIndexPos.interpolate({
          //       //       inputRange: [0, 1],
          //       //       outputRange: [0, 1],
          //       //     }),
          //       //   },
          //       // ],
          //     }
          //   }
          //   data={months}
          //   keyExtractor={item => item.month.toString()}
          // renderItem={({item}) => (
          <CalenderMonth
            style={{
              Container: {
                transform: [
                  {
                    scale: tabIndexPos.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ],
              },
            }}
          />
        ) : // )}
        // />
        null}
      </Container>
    </View>
  );
};

const Styles = StyleSheet.create({
  Container: {flex: 1, backgroundColor: '#fff'},
  ProfilePic: {
    height: 60,
    width: 60,
    borderWidth: 0,
    borderRadius: 60,
  },
  ProfilePicImage: {
    borderRadius: 60,
  },
});

export default Home;
