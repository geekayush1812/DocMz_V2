import {createStackNavigator} from 'react-navigation-stack';

import {createAppContainer} from 'react-navigation';
import LoginV2 from '../screens/authentication/LoginV2/LoginV2';
import SignupV2 from '../screens/authentication/SignupV2/SignupV2';
const AuthNavigationV2 = createStackNavigator(
  {
    loginScreen: LoginV2,
    signupScreen: SignupV2,
  },
  {
    initialRouteName: 'loginScreen',
    headerMode: 'none',
  },
);

export default createAppContainer(AuthNavigationV2);
