import * as React from 'react'
import { View, StyleSheet } from 'react-native'


import colors from '../../config/colors'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: colors.WHITE,
    },
    headerTitleStyle: {
      color: 'white',
    },
  };

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <View style={styles.container} />
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
  },
})
