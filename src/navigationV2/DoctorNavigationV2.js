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

import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Chats from '../screens/doctor/Chats/Chats';
import CustomDoctorDrawer from '../components/organisms/drawer/custom/CustomDoctorDrawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';
import AddQuestionnaire from '../screens/doctor/AddQuestionnaire/AddQuestionnaire';
import PatientDetails from '../screens/doctor/PatientDetails/PatientDetails';
import Skins from '../screens/doctor/Skins/Skins';
import Appointments from '../screens/doctor/Appointments/Appointments';
import Dashboard from '../screens/doctor/Dashboard/Dashboard';
import Onboarding from '../screens/doctor/Onboarding/Onboarding';
import Patients from '../screens/doctor/Patients/Patients';
import {useSelector} from 'react-redux';

const {width: screenWidth} = Dimensions.get('screen');

const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DoctorLanding() {
  return (
    <BottomTabs.Navigator
      initialRouteName={'Dashboard'}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#fff',
        inactiveTintColor: 'rgba(255,255,255,0.4)',
        style: {
          backgroundColor: '#047b7b',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
      }}>
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({tintColor}) => {
            return <FontAwesome name="home" color={tintColor} size={24} />;
          },
        }}
        name={'Dashboard'}
        component={Dashboard}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({focused, tintColor}) => {
            return (
              <MaterialCommunityIcons
                name="doctor"
                color={focused ? tintColor : '#555'}
                size={24}
              />
            );
          },
        }}
        name={'Appointments'}
        component={Appointments}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({tintColor}) => {
            return (
              <MaterialCommunityIcons name="chat" color={tintColor} size={24} />
            );
          },
        }}
        name={'Chats'}
        component={Chats}
      />
      {/* <BottomTabs.Screen name={"WaitingRoom"} component={} /> */}
    </BottomTabs.Navigator>
  );
}
function DoctorDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      drawerPosition={'right'}
      drawerType={'slide'}
      drawerContent={(props) => <CustomDoctorDrawer {...props} />}
      drawerStyle={{
        width: screenWidth,
        drawerBackgroundColor: 'rgba(255,255,255,.9)',
      }}
      backBehavior={'initialRoute'}>
      <Drawer.Screen name={'Home'} component={DoctorLanding} />
      <Drawer.Screen name={'Questionnaire'} component={AddQuestionnaire} />
      <Drawer.Screen name={'PatientsList'} component={Patients} />
      <Drawer.Screen name={'PatientDetails'} component={PatientDetails} />
      <Drawer.Screen name={'Skins'} component={Skins} />
      {/* <Drawer.Screen name={'Clinics'} component={Skins} /> 
      // Referrals: Referrals,
    // Languages: Languages,
    // Settings: Settings,
      */}
    </Drawer.Navigator>
  );
}

function DoctorNavigationV2() {
  const {doctorProfile, forNow} = useSelector((state) => state.DoctorReducer);

  return (
    <Stack.Navigator headerMode={'none'}>
      {!forNow && !doctorProfile.onBoarding && (
        <Stack.Screen name={'OnBoarding'}>
          {(props) => <Onboarding {...props} />}
        </Stack.Screen>
      )}
      {(forNow || doctorProfile.onBoarding) && (
        <Stack.Screen name={'DoctorMain'} component={DoctorDrawer} />
      )}
    </Stack.Navigator>
  );
}
export default DoctorNavigationV2;
