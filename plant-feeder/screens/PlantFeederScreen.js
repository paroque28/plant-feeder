import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';

import PlantFeederIcon from '../assets/images/plantfeeder.png';
import colors from '../config/colors'


export default class PlantFeederScreen extends React.Component {
  static navigationOptions = {
    title: 'PlantFeeder',
    headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTitleStyle:{
        color: "green"
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
      <Image source={PlantFeederIcon} />
       </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: 30,
        backgroundColor: colors.DODGER_BLUE,
    },
});
