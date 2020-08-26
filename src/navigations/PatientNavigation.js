import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Dimensions} from 'react-native';
import Home from '../screens/patient/home/Home';
import Setting from '../screens/patient/settings/Setting';
import Wishlist from '../screens/patient/wishlist/Wishlist';

import Appointments from '../screens/patient/appointments/NewAppointments';
import AppointmentsDoctor from '../screens/doctor/Appointments/Appointments';
// import Appointments from '../screens/patient/appointments/Appointments';
import Consultations from '../screens/patient/consultations/Consultations';
import MyDoctors from '../screens/patient/mydoctors/MyDoctors';
import MedicalRecords from '../screens/patient/medicalrecords/MedicalRecords';
import Orders from '../screens/patient/orders/Orders';
import Payments from '../screens/patient/payments/Payments';
import AppSettings from '../screens/patient/more/settings/Settings';
import Help from '../screens/patient/more/help/Help';
import NotFound from '../components/organisms/NotFound/NotFound';

import Custom from '../components/organisms/drawer/custom/Custom';
import DocProfileLite from '../screens/patient/docProfileLite/DocProfileLite';
import AppointmentForm from '../screens/patient/appointmentForm/AppointmentForm';
import ConfirmAppointment from '../components/molecules/ConfirmAppointment/ConfirmAppointment';
import BookingDetails from '../screens/patient/questionnaire/BookingDetails';
// import FamilyMember from '../screens/patient/familyMember/FamilyMember';
import FamilyMember from '../screens/patient/familyMember/Newfamily';
import WaitingRoom from '../screens/patient/waitingRoom/WaitingRoom';
// import ProfileScreen from '../screens/examples/Profile/Profile';
import ProfileScreen from '../screens/examples/Profile/NewProfile';
import LandingPageScreen from '../screens/examples/LandingPage/LandingPageScreen';
import PatientAdressList from '../screens/examples/PatientAddress/PatientAdressList';
import PatienDashboard from '../screens/examples/PatientDashboard/PatienDashboard';
import AddAdressScreen from '../screens/examples/PatientAddress/AddAdressScreen';
import PatientSubscription from '../screens/examples/PatientSubscription/PatientSubscription';
import RedeemVoucher from '../screens/examples/RedeemVoucher/RedeemVoucher';
import Calendar from '../screens/examples/PatientCalendar/PatientCalendarScreen';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import EditPhoneNumber from '../components/molecules/EditPhoneNumber/EditPhoneNumber';
import PhoneNumberOtp from '../components/molecules/EditPhoneNumber/PhoneNumberOtp';
import EditEmailId from '../components/molecules/EditEmailId/EditEmailId';
import EmailIdOtp from '../components/molecules/EditEmailId/EmailIdOtp';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PRIMARY_COLOR} from '../styles/colors';
import NewPatientDashboard from '../screens/examples/PatientDashboard/NewPatientDashboard';
import NewPayment from '../screens/examples/payments/NewPayments';
import Pay from '../screens/examples/payments/Pay';
import BookingConfirmed from '../screens/examples/payments/BookingConfirmed';
import NewCard from '../screens/examples/payments/NewCard';
import NewWaitingRoom from '../screens/patient/waitingRoom/NewWaitingRoom';
import VoiceCall from '../screens/patient/Calls/Voicecall';
import MedicalHistory from '../screens/examples/MedicalHistory/MedicalHistory';
import HealthCare from '../screens/patient/HealthCare/HealthCare';
import PatientDetails from '../screens/doctor/PatientDetails/PatientDetails';
import PatientList from '../screens/doctor/Patients/Patients';
// const PatientBottomNavigation = createSwitchNavigator(
//   {
//     patientHomeScreen: Home,
//     patientSettingScreen: Setting,
//     widhlistScreen: Wishlist,
//   },
//   {
//     initialRouteName: 'patientHomeScreen',
//     headerMode: 'none',
//   },
// );

// const AppointmentsStack = createStackNavigator(
//   {
//     AppointmentForm,
//     DocProfileLite,
//     ConfirmAppointment
//   },
//   {
//     initialRouteName: 'DocProfileLite',
//     headerMode: 'none',
//   },
// );

// const tabNav = createTabNavigator({
//   about: About,
//   calender: Calender,
//   feedback: Feedback
// }, {
//   navigationOptions: ({ navigation }) => ({
//     tabBarIcon: ({ focused, horizontal, tintColor }) => {
//       const { routeName } = navigation.state;
//       let iconName;
//       if (routeName === 'Home') {
//         iconName = `ios-information-circle${focused ? '' : '-outline'}`;
//       } else if (routeName === 'Settings') {
//         iconName = `ios-options${focused ? '' : '-outline'}`;
//       }

//       // You can return any component that you like here! We usually use an
//       // icon component from react-native-vector-icons
//       return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
//     },
//   }),
//   tabBarOptions: {
//     activeTintColor: 'tomato',
//     inactiveTintColor: 'gray',
//   },
// })

const screenWidth = Dimensions.get('screen').width;
const ProfileStack = createStackNavigator(
  {
    ProfileScreen,
    EditPhoneNumber,
    PhoneNumberOtp,
    EmailIdOtp,
    EditEmailId,
    MedicalHistory,
  },
  {headerMode: 'none', initialRouteName: 'ProfileScreen'},
);
const AddressStack = createStackNavigator(
  {
    PatientAdressList,
    AddAdressScreen,
  },
  {headerMode: 'none', initialRouteName: 'PatientAdressList'},
);

const PatientNavigationHome = createBottomTabNavigator(
  // const PatientNavigation = createBottomTabNavigator(
  {
    patientHomeScreen: {
      screen: LandingPageScreen,
      // screen: PatientDetails,
      navigationOptions: {
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          return (
            <Icon
              name="home"
              size={25}
              color={focused ? PRIMARY_COLOR : '#E9E5FF'}
            />
          );
        },
      },
    },
    patientDashboardNav: {
      screen: MedicalHistory,
      navigationOptions: {
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          return (
            <Icon
              name="account"
              size={25}
              color={focused ? PRIMARY_COLOR : '#E9E5FF'}
            />
          );
        },
      },
    },
    test: {
      screen: NewWaitingRoom,
      navigationOptions: {
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          return (
            <Icon
              name="test"
              size={25}
              color={focused ? PRIMARY_COLOR : '#E9E5FF'}
            />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
    },
    initialRouteName: 'patientHomeScreen',
  },
);

const PatientNavigation = createDrawerNavigator(
  {
    // Home,
    Home: PatientNavigationHome,
    // Home: Calendar,
    AppointmentsStack: {
      screen: DocProfileLite,
    },
    ConfirmAppointment,
    AppointmentForm,
    Setting,
    Wishlist,
    Appointments,
    Orders,
    Consultations,
    MyDoctors,
    MedicalRecords,
    Payments,
    Help,
    AppSettings,
    NotFound,
    FamilyMember,
    PatientSubscription,
    RedeemVoucher,
    Profile: {screen: ProfileStack},
    Address: {screen: AddressStack},
    VoiceCall: {screen: VoiceCall},
    HealthCare,
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'right',
    headerMode: 'none',
    drawerType: 'none',
    drawerWidth: screenWidth,
    // hideStatusBar: true,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    contentComponent: (props) => <ProfileScreen {...props} />,
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
    backBehavior: 'initialRoute',
  },
);

export default createAppContainer(PatientNavigation);
