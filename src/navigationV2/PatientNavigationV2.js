// import Setting from '../screens/patient/settings/Setting';
// import Wishlist from '../screens/patient/wishlist/Wishlist';

// import Consultations from '../screens/patient/consultations/Consultations';
// import MedicalRecords from '../screens/patient/medicalrecords/MedicalRecords';
// import Orders from '../screens/patient/orders/Orders';
// import AppSettings from '../screens/patient/more/settings/Settings';
// import Help from '../screens/patient/more/help/Help';
// import NotFound from '../components/organisms/NotFound/NotFound';
// import DocProfileLite from '../screens/patient/docProfileLite/DocProfileLite';
// import AppointmentForm from '../screens/patient/appointmentForm/AppointmentForm';
// import LandingPageScreen from '../screens/examples/LandingPage/LandingPageScreen';
// import PatientAdressList from '../screens/examples/PatientAddress/PatientAdressList';
// import AddAdressScreen from '../screens/examples/PatientAddress/AddAdressScreen';
// import PatientSubscription from '../screens/examples/PatientSubscription/PatientSubscription';
// import RedeemVoucher from '../screens/examples/RedeemVoucher/RedeemVoucher';
// import EditPhoneNumber from '../components/molecules/EditPhoneNumber/EditPhoneNumber';
// import PhoneNumberOtp from '../components/molecules/EditPhoneNumber/PhoneNumberOtp';
// import EditEmailId from '../components/molecules/EditEmailId/EditEmailId';
// import EmailIdOtp from '../components/molecules/EditEmailId/EmailIdOtp';
// import VoiceCall from '../screens/patient/Calls/Voicecall';

import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Dimensions} from 'react-native';
import MyDoctors from '../screens/patient/mydoctors/MyDoctors';
import FamilyMember from '../screens/patient/familyMember/Newfamily';
import ProfileScreen from '../screens/examples/Profile/NewProfile';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MedicalHistory from '../screens/examples/MedicalHistory/MedicalHistory';
import HealthCare from '../screens/patient/HealthCare/HealthCare';
import LandingPage from '../screens/common/LandingPage/LandingPage';
import DoctorProfile from '../screens/doctor/DoctorProfile/DoctorProfile';
import TimeSlotScreen from '../screens/examples/TimeSlotScreen/TimeSlotScreen';
import PaymentsV2 from '../screens/examples/payments/PaymentsV2';
import ConfirmAppointment from '../components/molecules/ConfirmAppointment/ConfirmAppointment';
import QuestionnairePP from '../screens/patient/questionnaire/QuestionnairePP';
import AuthNavigationV2 from '../navigationV2/AuthNavigationV2';
import Appointments from '../screens/patient/appointments/Appointments';
import PatientDashboard from '../screens/patient/PatientDashboard/PatientDashboard';
import WaitingRoom from '../screens/patient/waitingRoom/WaitingRoom';
const screenWidth = Dimensions.get('screen').width;

const PatientLanding = createStackNavigator(
  {
    PatientLandingScreen: LandingPage,
    DoctorProfile: DoctorProfile,
    TimeSlotScreen: TimeSlotScreen,
    ConfirmAppointment: ConfirmAppointment,
    Questionnaire: QuestionnairePP,
    Payments: PaymentsV2,
    Auth: AuthNavigationV2,
  },
  {headerMode: 'none', initialRouteName: 'PatientLandingScreen'},
);

// const AddressStack = createStackNavigator(
//   {
//     PatientAdressList,
//     AddAdressScreen,
//   },
//   {headerMode: 'none', initialRouteName: 'PatientAdressList'},
// );

const PatientNavigationHome = createBottomTabNavigator(
  {
    PatientLanding: {
      screen: PatientLanding,
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
    MedicalHistory: {
      screen: MedicalHistory,
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
    // Chat: {
    //   screen: MedicalHistory,
    //   navigationOptions: {
    //     tabBarIcon: ({focused, horizontal, tintColor}) => {
    //       return (
    //         <Icon
    //           name="account"
    //           size={25}
    //           color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
    //         />
    //       );
    //     },
    //   },
    // },
    Appointments: {
      screen: Appointments,
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
    initialRouteName: 'PatientLanding',
  },
);

const PatientNavigationV2 = createDrawerNavigator(
  {
    Home: PatientNavigationHome,
    MedicalHistory: MedicalHistory,
    FamilyMember: FamilyMember,
    HealthCare: HealthCare,
    Appointments: Appointments,
    MyDoctors: MyDoctors,
    Dashboard: PatientDashboard,
    WaitingRoom: WaitingRoom,
    // Setting,
    // Wishlist,
    // Orders,
    // Consultations,
    // Help,
    // AppSettings,
    // NotFound,
    // PatientSubscription,
    // RedeemVoucher,
    // Questionnaire: QuestionnairePP,
    // Profile: {screen: ProfileStack},
    // Address: {screen: AddressStack},
    // VoiceCall: {screen: VoiceCall},
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'right',
    headerMode: 'none',
    drawerType: 'none',
    drawerWidth: screenWidth,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    contentComponent: (props) => <ProfileScreen {...props} />,
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
    backBehavior: 'initialRoute',
  },
);

export default createAppContainer(PatientNavigationV2);
