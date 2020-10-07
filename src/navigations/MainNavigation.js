import React, {useEffect} from 'react';
import {createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';
import AuthNavigation from './AuthNavigation';
import PatientNavigation from './PatientNavigation';
import DoctorNavigation from './DoctorNavigaton';
import DocProfileLite from '../screens/patient/docProfileLite/DocProfileLite';
import AppointmentForm from '../screens/patient/appointmentForm/AppointmentForm';
import ConfirmAppointment from '../components/molecules/ConfirmAppointment/ConfirmAppointment';
import NewQuestionnaire from '../screens/patient/questionnaire/NewQuestionnaire';
import {useSelector} from 'react-redux';
import WaitingRoom from '../screens/patient/waitingRoom/WaitingRoom';
import DoctorProfile from '../screens/examples/DoctorProfile/DoctorProfile';
import QuestionnairePP from '../screens/patient/questionnaire/QuestionnairePP';
import PatientCalendarScreen from '../screens/examples/PatientCalendar/PatientCalendarScreen';

function GetAuth({navigation}) {
  const {isDoctor} = useSelector((state) => state.AuthReducer);

  if (isDoctor) {
    navigation.replace('DoctorHomePage');
  } else {
    navigation.replace('PatientHomePage');
  }
  return null;
}

const docMainStream = createStackNavigator(
  {
    AppointmentsStack: {
      screen: DoctorProfile,
    },
    QuestionnairePP,
    PatientCalendarScreen,
    ConfirmAppointment,
    AppointmentForm,
  },
  {
    initialRouteName: 'AppointmentsStack',
    headerMode: 'none',
  },
);

const MainNavigation = createStackNavigator(
  {
    authentication: AuthNavigation,
    pageNavigation: GetAuth,
    DoctorHomePage: DoctorNavigation,
    PatientHomePage: PatientNavigation,
    docPatientStrem: docMainStream,
    WaitingRoom: WaitingRoom,
  },
  {
    initialRouteName: 'pageNavigation',
    headerMode: 'none',
  },
);

export default createAppContainer(MainNavigation);
