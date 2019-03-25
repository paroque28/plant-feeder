import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation';



import LoginPage from './screens/login-page';
import SearchPage from './screens/search-page';
import SearchResults from './screens/search-results';

const App = createStackNavigator({
  Login: { screen: LoginPage },
  Home: { screen: SearchPage },
  Results: { screen: SearchResults }
})

export default App
