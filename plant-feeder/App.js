import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';


import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import PlantFeederScreen from "./screens/PlantFeederScreen";
import SettingsScreen from "./screens/SettingsScreen";;

const RootStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    
  },
  Home: {
    screen: HomeScreen,
  },
  Pets: {
    screen: PlantFeederScreen
  },
  Settings: {
    screen: SettingsScreen
  }
  
  
});

const App = createAppContainer(RootStack);


export default App;
