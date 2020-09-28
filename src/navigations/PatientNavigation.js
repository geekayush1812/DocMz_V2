import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Dimensions} from 'react-native';
import Setting from '../screens/patient/settings/Setting';
import Wishlist from '../screens/patient/wishlist/Wishlist';

import Appointments from '../screens/patient/appointments/Appointments';
import Consultations from '../screens/patient/consultations/Consultations';
import MyDoctors from '../screens/patient/mydoctors/MyDoctors';
import MedicalRecords from '../screens/patient/medicalrecords/MedicalRecords';
import Orders from '../screens/patient/orders/Orders';
import AppSettings from '../screens/patient/more/settings/Settings';
import Help from '../screens/patient/more/help/Help';
import NotFound from '../components/organisms/NotFound/NotFound';
import DocProfileLite from '../screens/patient/docProfileLite/DocProfileLite';
import AppointmentForm from '../screens/patient/appointmentForm/AppointmentForm';
import ConfirmAppointment from '../components/molecules/ConfirmAppointment/ConfirmAppointment';
import FamilyMember from '../screens/patient/familyMember/Newfamily';
import ProfileScreen from '../screens/examples/Profile/NewProfile';
import LandingPageScreen from '../screens/examples/LandingPage/LandingPageScreen';
import PatientAdressList from '../screens/examples/PatientAddress/PatientAdressList';
import AddAdressScreen from '../screens/examples/PatientAddress/AddAdressScreen';
import PatientSubscription from '../screens/examples/PatientSubscription/PatientSubscription';
import RedeemVoucher from '../screens/examples/RedeemVoucher/RedeemVoucher';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import EditPhoneNumber from '../components/molecules/EditPhoneNumber/EditPhoneNumber';
import PhoneNumberOtp from '../components/molecules/EditPhoneNumber/PhoneNumberOtp';
import EditEmailId from '../components/molecules/EditEmailId/EditEmailId';
import EmailIdOtp from '../components/molecules/EditEmailId/EmailIdOtp';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import VoiceCall from '../screens/patient/Calls/Voicecall';
import MedicalHistory from '../screens/examples/MedicalHistory/MedicalHistory';
import HealthCare from '../screens/patient/HealthCare/HealthCare';
import NewPayment from '../screens/examples/payments/NewPayments';
import QuestionnairePP from '../screens/patient/questionnaire/QuestionnairePP';
import TimeSlots from '../screens/doctor/TimeSlots/TimeSlots';

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
              color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
            />
          );
        },
      },
    },
    patientDashboardNav: {
      // screen: MedicalHistory,
      screen: TimeSlots,
      navigationOptions: {
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          return (
            <Icon
              name="account"
              size={25}
              color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
            />
          );
        },
      },
    },
    // test: {
    //   screen: NewPayment,
    //   navigationOptions: {
    //     tabBarIcon: ({focused, horizontal, tintColor}) => {
    //       return (
    //         <Icon
    //           name="setting"
    //           size={25}
    //           color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
    //         />
    //       );
    //     },
    //   },
    // },
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: '#047b7b',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    },
    initialRouteName: 'patientHomeScreen',
  },
);

const PatientNavigation = createDrawerNavigator(
  {
    Home: PatientNavigationHome,
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
    NewPayment,
    Help,
    AppSettings,
    NotFound,
    FamilyMember,
    PatientSubscription,
    RedeemVoucher,
    Questionnaire: QuestionnairePP,
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
