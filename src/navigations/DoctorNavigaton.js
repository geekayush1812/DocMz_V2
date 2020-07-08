import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/doctor/home/Home';
import FindDoctor from '../screens/doctor/FindDoctor/FindDoctor';
import DoctorDetailsScreen from '../screens/doctor/DoctorDetail/DoctorDetail';
import Chats from '../screens/doctor/Chats/Chats';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AtomExample from '../../example/atomExample';
import Medication from '../screens/examples/medication/Medication';
import Payments from '../screens/examples/payments/Payments';
import Collapsible from '../screens/examples/Collapsible/Collapsible';
import Login from '../screens/examples/Login/Login';
import Otp from '../screens/examples/OTP/Otp';
import Signup from '../screens/examples/Signup/Signup';
import ForgotPassword from '../screens/examples/ForgetPassword/ForgotPassword';
import VerticalSlider from '../screens/examples/VerticalSlider/VerticalSlider';
import DmzLogin from '../screens/examples/DmzLogin/DmzLogin';
import Expandable from '../screens/examples/Expandable/Expandable';
import Profile from '../screens/doctor/Profile/Profile';
import Splash from '../screens/examples/Splash/Splash';
import {View, Text} from 'react-native';
import {Colors} from '../styles';
import AddAppointments from '../screens/doctor/AddAppointments/AddAppointments';
import AddQuestionnaire from '../screens/doctor/AddQuestionnaire/AddQuestionnaire';
import QuestionnairePP from '../screens/patient/questionnaire/QuestionnairePP';
import DoctorProfile from '../screens/examples/DoctorProfile/DoctorProfile';
import Settings from '../screens/examples/Settings/Settings';
import LandingPageScreen from '../screens/examples/LandingPage/LandingPageScreen';
import FindADoctor from '../screens/examples/FindADoctor/FindADoctor';
// import QuestionViewPager from '../screens/examples/Questions/QuestionViewPager';
import DmzSignupV2 from '../screens/examples/DmzSignup/DmzSignupV2';
import DmzloginV2 from '../screens/examples/DmzLogin/DmzloginV2';
import {createAppContainer} from 'react-navigation';

// import Login from '../screens/examples/Login/Login';
// import FallBg from '../screens/examples/FallBg/FallBg';

// const DoctorNavigation = createStackNavigator(
//   {
//     homeScreen: Home,
//     findDoctorScreen: FindDoctor,
//     doctorDetail: DoctorDetailsScreen,
//     chats: Chats,
//     // testing: Expandable,
//     // testing: DmzLogin,
//     // testing: VerticalSlider,
//     // testing: ForgotPassword,
//     // testing: Otp,
//     // testing: Signup,
//     // testing: Login,
//     // testing: Collapsible,
//     // testing: Payments,
//     // testing: Medication,
//     // testing: AtomExample,
//     // testing: Profile,
//     // testing: Splash,
//   },
//   {
//     initialRouteName: 'homeScreen',
//     headerMode: 'none',
//   },
// );

// export default DoctorNavigation;

const DoctorNavigationContent = createBottomTabNavigator(
  {
    homeScreen: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          return (
            <FontAwesome
              name="home"
              color={focused ? tintColor : '#555'}
              size={24}
            />
          );
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
    // doctorDetail: {
    //   screen: DoctorDetailsScreen,
    //   navigationOptions: {
    //     tabBarIcon: ({focused, tintColor}) => {
    //       return (
    //         <MaterialCommunityIcons
    //           name="details"
    //           color={focused ? tintColor : '#555'}
    //           size={24}
    //         />
    //       );
    //     },
    //   },
    // },
    chats: {
      screen: Chats,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          return (
            <MaterialCommunityIcons
              name="chat"
              color={focused ? tintColor : '#555'}
              size={24}
            />
          );
        },
      },
    },
    doctorProfile: {
      screen: () => <DoctorProfileNavigatorContainer />,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          return (
            <MaterialCommunityIcons
              name="face-profile"
              color={focused ? tintColor : '#555'}
              size={24}
            />
          );
        },
      },
    },
    settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          return (
            <MaterialCommunityIcons
              name="settings"
              color={focused ? tintColor : '#555'}
              size={24}
            />
          );
        },
      },
    },
  },
  {
    // tabBarComponent: props => <BottomTabs {...props} />,
    // initialRouteName: 'test',
    order: ['homeScreen', 'chats', 'doctorProfile', 'settings'],
    tabBarOptions: {
      showLabel: false,
    },
  },
);

const DoctorProfileNavigator = createStackNavigator(
  {
    Profile: Profile,
    AddAppointments: AddAppointments,
    AddQuestionnaire: AddQuestionnaire,
  },
  {
    initialRouteName: 'Profile',
    headerMode: 'none',
  },
);
const DoctorProfileNavigatorContainer = createAppContainer(
  DoctorProfileNavigator,
);

export default createAppContainer(DoctorNavigationContent);
// const BottomTabs = props => {
//   console.log('#######------------#########--------#####');
//   console.log(props.navigation.state);
//   return (
//     <View style={{backgroundColor: 'red'}}>
//       <Text>he</Text>
//     </View>
//   );
// };
