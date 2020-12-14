import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import LandingPage from '../screens/common/LandingPage/LandingPage';
import DoctorProfile from '../screens/doctor/DoctorProfile/DoctorProfile';
// import GetStarted from '../screens/common/GetStarted/GetStarted';
import Splash from '../screens/common/Splash/Splash';
import {Dimensions} from 'react-native';
import CustomNoAuthDrawer from '../components/organisms/drawer/custom/CustomNoAuthDrawer';

import AuthNavigationV2 from './AuthNavigationV2';
let PatientNavigationV2 = null;
//  './PatientNavigationV2';
let DoctorNavigationV2 = null;
//  './DoctorNavigationV2';

const screenWidth = Dimensions.get('screen').width;
const NoAuthDrawerNavigator = createDrawerNavigator();

function NoAuthNavigation() {
  return (
    <NoAuthDrawerNavigator.Navigator
      drawerPosition={'right'}
      initialRouteName={'LandingPage'}
      drawerType={'slide'}
      statusBarAnimation
      minSwipeDistance={20}
      backBehavior="history"
      drawerContent={(props) => <CustomNoAuthDrawer {...props} />}
      drawerStyle={{
        width: screenWidth * 0.75,
        drawerBackgroundColor: 'rgba(255,255,255,.9)',
      }}>
      <NoAuthDrawerNavigator.Screen
        name={'LandingPage'}
        component={LandingPage}
      />
      <NoAuthDrawerNavigator.Screen
        name={'DoctorProfile'}
        component={DoctorProfile}
      />
      <NoAuthDrawerNavigator.Screen
        name={'Auth'}
        component={AuthNavigationV2}
      />
    </NoAuthDrawerNavigator.Navigator>
  );
}

const MainController = ({navigation, route}) => {
  const {isLoggedin, isDoctor} = useSelector((state) => state.AuthReducer);
  if (isLoggedin) {
    if (isDoctor) {
      if (DoctorNavigationV2 === null) {
        DoctorNavigationV2 = require('./DoctorNavigationV2').default;
      }
      return <DoctorNavigationV2 />;
    } else {
      if (PatientNavigationV2 === null) {
        PatientNavigationV2 = require('./PatientNavigationV2').default;
      }
      return <PatientNavigationV2 />;
    }
  } else {
    return <NoAuthNavigation />;
  }
};

const MainStack = createStackNavigator();
function MainNavigation() {
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplash(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <NavigationContainer>
      <MainStack.Navigator headerMode={'none'}>
        {splash ? (
          <MainStack.Screen name={'Splash'} component={Splash} />
        ) : (
          <MainStack.Screen
            name={'MainController'}
            component={MainController}
          />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
export default MainNavigation;
