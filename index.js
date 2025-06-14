import { registerRootComponent } from 'expo';

import signup from './src/screens/signup';
import login from './src/screens/login';;
import App from './App';
import Dashboard from './src/screens/dashboard';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Dashboard);
