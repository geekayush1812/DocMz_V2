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
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Chats from '../screens/common/Chats/Chats';
import CustomDoctorDrawer from '../components/organisms/drawer/custom/CustomDoctorDrawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions, useWindowDimensions} from 'react-native';
import AddQuestionnaire from '../screens/doctor/AddQuestionnaire/AddQuestionnaire';
import PatientDetails from '../screens/doctor/PatientDetails/PatientDetails';
import Skins from '../screens/doctor/Skins/Skins';
import Appointments from '../screens/doctor/Appointments/Appointments';
import Dashboard from '../screens/doctor/Dashboard/Dashboard';
import Onboarding from '../screens/doctor/Onboarding/Onboarding';
import Patients from '../screens/doctor/Patients/Patients';
import {useSelector} from 'react-redux';
import Conversations from '../screens/common/Chats/Conversations';
import io from 'socket.io-client';
import {SocketContext} from '../utils/socketContext';
const {width: screenWidth} = Dimensions.get('screen');

const BottomTabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

import {Host} from '../utils/connection';
import Testing from '../screens/common/Chats/Testing';

const socket = io(Host);

function Chatting() {
  return (
    <SocketContext.Provider value={socket}>
      <Stack.Navigator headerMode={'none'} initialRouteName={'Conversations'}>
        <Stack.Screen name={'Conversations'} component={Conversations} />
        <Stack.Screen
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name={'Chats'}
          component={Chats}
        />
      </Stack.Navigator>
    </SocketContext.Provider>
  );
}

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
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome
                name="home"
                color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
                size={24}
              />
            );
          },
        }}
        name={'Dashboard'}
        component={Dashboard}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <MaterialCommunityIcons
                name="doctor"
                color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
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
          tabBarIcon: ({focused}) => {
            return (
              <MaterialCommunityIcons
                name="format-list-checkbox"
                color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
                size={24}
              />
            );
          },
        }}
        name={'PatientsList'}
        component={Patients}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <MaterialCommunityIcons
                name="chat"
                color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
                size={24}
              />
            );
          },
          tabBarVisible: false,
        }}
        name={'Chats'}
        component={Chatting}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <MaterialCommunityIcons
                name="chat"
                color={focused ? '#fff' : 'rgba(255,255,255,0.6)'}
                size={24}
              />
            );
          },
          tabBarVisible: false,
        }}
        name={'testing'}
        component={Testing}
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
