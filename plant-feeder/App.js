import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'

import LoginScreen from './src/screens/LoginScreen'
import HomeScreen from './src/screens/HomeScreen'
import PlantFeederScreen from './src/screens/PlantFeederScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import StatsScreen from './src/screens/StatsScreen'
import AddPlantScreen from './src/screens/AddPlantScreen'

const RootStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Home: {
    screen: HomeScreen,
  },
  PlantFeeder: {
    screen: createBottomTabNavigator({
      PlantFeeder: {
        screen: PlantFeederScreen,
      },
      AddPlant: {
        screen: AddPlantScreen,
      },
      Stats: {
        screen: StatsScreen,
      },
      Settings: {
        screen: SettingsScreen,
      },


    }),
  },
  Settings: {
    screen: SettingsScreen,
  },
})

const App = createAppContainer(RootStack)

export default App
