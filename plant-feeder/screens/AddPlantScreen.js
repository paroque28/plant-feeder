import * as React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import colors from '../config/colors';


export default class AddPlantScreen extends React.Component {
  static navigationOptions = {
    title: 'Add a New Plant',
    headerStyle: {
      backgroundColor: colors.WHITE,
    },
    headerTitleStyle: {
      color: 'green'
    }

  };

  constructor(props) {
    super(props);
    this.state = {


    };
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
                Here you can add a plant (TODO)
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.WHITE
  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
    height: 150,
    width: 150
  },
});
