import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Store from './src/reduxV2/config/store';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => Store);
