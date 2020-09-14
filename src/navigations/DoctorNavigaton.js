import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Home from '../screens/doctor/home/Home';
import Chats from '../screens/doctor/Chats/Chats';
import CustomDoctorDrawer from '../components/organisms/drawer/custom/CustomDoctorDrawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';
import {Colors} from '../styles';
import AddAppointments from '../screens/doctor/AddAppointments/AddAppointments';
import AddQuestionnaire from '../screens/doctor/AddQuestionnaire/AddQuestionnaire';
import QuestionnairePP from '../screens/patient/questionnaire/QuestionnairePP';
import DoctorProfile from '../screens/examples/DoctorProfile/DoctorProfile';
// import Settings from '../screens/examples/Settings/Settings';
import {createAppContainer} from 'react-navigation';
import PatientDetails from '../screens/doctor/PatientDetails/PatientDetails';
import Referrals from '../screens/doctor/Referrals/Referrals';
import Skins from '../screens/doctor/Skins/Skins';
import Languages from '../screens/doctor/Languages/Languages';
import Settings from '../screens/doctor/Settings/Settings';
import Appointments from '../screens/doctor/Appointments/Appointments';
import Dashboard from '../screens/doctor/Dashboard/Dashboard';
import Onboarding from '../screens/doctor/Onboarding/Onboarding';
import Patients from '../screens/doctor/Patients/Patients';
import AddCategoryQuestions from '../screens/doctor/AddQuestionnaire/AddCategoryQuestions';
const {width: screenWidth} = Dimensions.get('screen');

const DoctorNavigationContent = createBottomTabNavigator(
  {
    homeScreen: {
      screen: () => <DoctorDrawerContainer />,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          return <FontAwesome name="home" color={tintColor} size={24} />;
        },
      },
    },
    // findDoctorScreen: {
    //   screen: FindDoctor,
    //   navigationOptions: {
    //     tabBarIcon: ({focused, tintColor}) => {
    //       return (
    //         <MaterialCommunityIcons
    //           name="doctor"
    //           color={focused ? tintColor : '#555'}
    //           size={24}
    //         />
    //       );
    //     },
    //   },
    // },
    Patients: {
      screen: AddCategoryQuestions,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          return (
            <MaterialCommunityIcons
              name="details"
              color={tintColor}
              size={24}
            />
          );
        },
      },
    },
    // chats: {
    //   screen: Chats,
    //   navigationOptions: {
    //     tabBarIcon: ({focused, tintColor}) => {
    //       return (
    //         <MaterialCommunityIcons name="chat" color={tintColor} size={24} />
    //       );
    //     },
    //   },
    // },
    // settings: {
    //   screen: Settings,
    //   navigationOptions: {
    //     tabBarIcon: ({focused, tintColor}) => {
    //       return (
    //         <MaterialCommunityIcons
    //           name="settings"
    //           color={tintColor}
    //           size={24}
    //         />
    //       );
    //     },
    //   },
    // },
  },
  {
    order: ['homeScreen', 'Patients'],
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
    Home,
    PatientDetails: PatientDetails,
    Referrals: Referrals,
    Skins: Skins,
    Languages: Languages,
    Settings: Settings,
    Appointments: Appointments,
    Dashboard: Dashboard,
    Onboarding: Onboarding,
    PatientsList: Patients,
  },
  {
    initialRouteName: 'Onboarding',
    drawerPosition: 'right',
    headerMode: 'none',
    drawerType: 'none',
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

export default createAppContainer(DoctorNavigationContent);
