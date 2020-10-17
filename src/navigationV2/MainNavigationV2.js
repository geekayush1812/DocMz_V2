import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {useSelector} from 'react-redux';
import LandingPage from '../screens/common/LandingPage/LandingPage';
import DoctorProfile from '../screens/doctor/DoctorProfile/DoctorProfile';
// import GetStarted from '../screens/common/GetStarted/GetStarted';
import Splash from '../screens/common/Splash/Splash';
import AuthNavigationV2 from './AuthNavigationV2';
import PatientNavigationV2 from './PatientNavigationV2';
import DoctorNavigationV2 from './DoctorNavigationV2';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const NoAuthNavigation = createDrawerNavigator(
  {
    LandingPage: LandingPage,
    DoctorProfile: DoctorProfile,
    Auth: AuthNavigationV2,
  },
  {
    initialRouteName: 'LandingPage',
    drawerPosition: 'right',
    headerMode: 'none',
    drawerType: 'slide',
    drawerWidth: screenWidth,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
    backBehavior: 'initialRoute',
  },
);

const NoAuthContainer = createAppContainer(NoAuthNavigation);

const MainController = () => {
  const {isLoggedin, isDoctor} = useSelector((state) => state.AuthReducer);
  if (isLoggedin) {
    if (isDoctor) {
      return <DoctorNavigationV2 />;
    } else {
      return <PatientNavigationV2 />;
    }
  } else {
    return <NoAuthContainer />;
  }
};

const MainNavigation = createSwitchNavigator(
  {
    Splash: Splash,
    // GetStarted: GetStarted,
    MainController: {
      screen: (props) => <MainController {...props} />,
    },
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);

export default createAppContainer(MainNavigation);
