import {createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';
import AuthNavigation from './AuthNavigation';
import PatientNavigation from './PatientNavigation';
import DoctorNavigation from './DoctorNavigaton';
import AppointmentForm from '../screens/patient/appointmentForm/AppointmentForm';
import ConfirmAppointment from '../components/molecules/ConfirmAppointment/ConfirmAppointment';
import {useSelector} from 'react-redux';
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
  },
  {
    initialRouteName: 'pageNavigation',
    headerMode: 'none',
  },
);

export default createAppContainer(MainNavigation);
