import { AppRegistry, LogBox } from 'react-native';
import 'react-native-gesture-handler';
import 'reflect-metadata';
import App from './app/App';

import { name as appName } from './app.json';

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs([
  'EventEmitter.removeListener',
  'Require cycle:',
  'Non-serializable values were found in the navigation state. Check',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components"
]);

AppRegistry.registerComponent(appName, () => App);
