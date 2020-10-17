// import Home from '../screens/doctor/home/Home';
// import {Colors} from '../styles';
// import AddAppointments from '../screens/doctor/AddAppointments/AddAppointments';
// import QuestionnairePP from '../screens/patient/questionnaire/QuestionnairePP';
// import DoctorProfile from '../screens/examples/DoctorProfile/DoctorProfile';
// import Settings from '../screens/examples/Settings/Settings';
// import Referrals from '../screens/doctor/Referrals/Referrals';
// import Languages from '../screens/doctor/Languages/Languages';
// import Settings from '../screens/doctor/Settings/Settings';
// import AddCategoryQuestions from '../screens/doctor/AddQuestionnaire/AddCategoryQuestions';

import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Chats from '../screens/doctor/Chats/Chats';
import CustomDoctorDrawer from '../components/organisms/drawer/custom/CustomDoctorDrawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';
import AddQuestionnaire from '../screens/doctor/AddQuestionnaire/AddQuestionnaire';
import {createAppContainer} from 'react-navigation';
import PatientDetails from '../screens/doctor/PatientDetails/PatientDetails';
import Skins from '../screens/doctor/Skins/Skins';
import Appointments from '../screens/doctor/Appointments/Appointments';
import Dashboard from '../screens/doctor/Dashboard/Dashboard';
import Onboarding from '../screens/doctor/Onboarding/Onboarding';
import Patients from '../screens/doctor/Patients/Patients';
import {useSelector} from 'react-redux';
const {width: screenWidth} = Dimensions.get('screen');

const DoctorLanding = createBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          return <FontAwesome name="home" color={tintColor} size={24} />;
        },
      },
    },
    Appointments: {
      screen: Appointments,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          return (
            <MaterialCommunityIcons
              name="doctor"
              color={focused ? tintColor : '#555'}
              size={24}
            />
          );
        },
      },
    },
    Chats: {
      screen: Chats,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          return (
            <MaterialCommunityIcons name="chat" color={tintColor} size={24} />
          );
        },
      },
    },
    //waiting room
  },
  {
    order: ['Dashboard', 'Appointments', 'Chats'],
    initialRouteName: 'Dashboard',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#fff',
      inactiveTintColor: 'rgba(255,255,255,0.4)',
      style: {
        backgroundColor: '#047b7b',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    },
  },
);

const DoctorDrawer = createDrawerNavigator(
  {
    Home: DoctorLanding,
    Questionnaire: AddQuestionnaire,
    PatientsList: Patients,
    PatientDetails: PatientDetails,
    //clinics and then
    Skins: Skins,

    // Referrals: Referrals,
    // Languages: Languages,
    // Settings: Settings,
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'right',
    headerMode: 'none',
    drawerType: 'slide',
    drawerWidth: screenWidth,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    contentComponent: (props) => <CustomDoctorDrawer {...props} />,
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
    backBehavior: 'initialRoute',
  },
);

const DoctorDrawerContainer = createAppContainer(DoctorDrawer);

const DoctorNavigationV2 = (props) => {
  const {doctorProfile} = useSelector((state) => state.DoctorReducer);
  if (doctorProfile.onboarding) {
    return <DoctorDrawerContainer {...props} />;
  } else {
    return Onboarding;
  }
};
export default DoctorNavigationV2;
