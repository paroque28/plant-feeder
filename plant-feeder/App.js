import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import PlantFeederScreen from './screens/PlantFeederScreen';
import SettingsScreen from './screens/SettingsScreen';
import PlantScreen from './screens/PlantScreen';
import AddPlantScreen from './screens/AddPlantScreen';

const RootStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  PlantFeeder: {
    screen: PlantFeederScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
  Plant: {
    screen: PlantScreen,
  },
  AddPlant: {
    screen: AddPlantScreen,
  },
});

const App = createAppContainer(RootStack);

export default App;
