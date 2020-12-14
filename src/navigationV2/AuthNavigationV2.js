import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginV2 from '../screens/authentication/LoginV2/LoginV2';
import SignupV2 from '../screens/authentication/SignupV2/SignupV2';

const Stack = createStackNavigator();

function AuthNavigationV2() {
  return (
    <Stack.Navigator initialRouteName={'loginScreen'} headerMode={'none'}>
      <Stack.Screen name={'loginScreen'} component={LoginV2} />
      <Stack.Screen name={'signupScreen'} component={SignupV2} />
    </Stack.Navigator>
  );
}

export default AuthNavigationV2;
