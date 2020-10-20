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
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions} from 'react-native';
import MyDoctors from '../screens/patient/mydoctors/MyDoctors';
import FamilyMember from '../screens/patient/familyMember/Newfamily';
import ProfileScreen from '../screens/examples/Profile/NewProfile';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
import {func} from 'prop-types';

const screenWidth = Dimensions.get('screen').width;
const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function PatientLanding() {
  return (
    <Stack.Navigator
      initialRouteName={'PatientLandingScreen'}
      headerMode={'none'}>
      <Stack.Screen name={'PatientLandingScreen'} component={LandingPage} />
      <Stack.Screen name={'DoctorProfile'} component={DoctorProfile} />
      <Stack.Screen name={'TimeSlotScreen'} component={TimeSlotScreen} />
      <Stack.Screen
        name={'ConfirmAppointment'}
        component={ConfirmAppointment}
      />
      <Stack.Screen name={'Questionnaire'} component={QuestionnairePP} />
      <Stack.Screen name={'Payments'} component={PaymentsV2} />
      <Stack.Screen name={'Auth'} component={AuthNavigationV2} />
    </Stack.Navigator>
  );
}

function PatientNavigationHome() {
  return (
    <BottomTabs.Navigator
      initialRouteName={'PatientLanding'}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#047b7b',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
      }}>
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({focused, horizontal, tintColor}) => {
            return (
              <Icon
                name="home"
                size={25}
                color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
              />
            );
          },
        }}
        name={'PatientLanding'}
        component={PatientLanding}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({focused, horizontal, tintColor}) => {
            return (
              <Icon
                name="account"
                size={25}
                color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
              />
            );
          },
        }}
        name={'MedicalHistory'}
        component={MedicalHistory}
      />
      {/* <BottomTabs.Screen name={'Chat'} component={} /> */}
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({focused, horizontal, tintColor}) => {
            return (
              <Icon
                name="account"
                size={25}
                color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
              />
            );
          },
        }}
        name={'Appointments'}
        component={Appointments}
      />
    </BottomTabs.Navigator>
  );
}
function PatientNavigationV2({navigation, route}) {
  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      drawerPosition={'right'}
      drawerType={'slide'}
      backBehavior={'history'}
      drawerContent={(props) => <ProfileScreen {...props} />}
      drawerStyle={{
        width: screenWidth,
        drawerBackgroundColor: 'rgba(255,255,255,.9)',
      }}>
      <Drawer.Screen name={'Home'} component={PatientNavigationHome} />
      <Drawer.Screen name={'MedicalHistory'} component={MedicalHistory} />
      <Drawer.Screen name={'FamilyMember'} component={FamilyMember} />
      <Drawer.Screen name={'HealthCare'} component={HealthCare} />
      <Drawer.Screen name={'Appointments'} component={Appointments} />
      <Drawer.Screen name={'MyDoctors'} component={MyDoctors} />
      <Drawer.Screen name={'Dashboard'} component={PatientDashboard} />
      <Drawer.Screen name={'WaitingRoom'} component={WaitingRoom} />
      {/* // Setting,
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
    // VoiceCall: {screen: VoiceCall}, */}
    </Drawer.Navigator>
  );
}
export default PatientNavigationV2;
