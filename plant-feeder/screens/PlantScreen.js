import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  FlatList,
  Text
} from 'react-native';

import colors from '../config/colors';


export default class PlantScreen extends React.Component {
  static navigationOptions = {
    title: 'Plant 1',
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
                Here is your plant (TODO)
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
