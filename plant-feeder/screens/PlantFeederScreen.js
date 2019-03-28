import * as React from 'react';
import { View, StyleSheet, Image, TouchableHighlight, FlatList, Text } from 'react-native';
import PlantIcon1 from '../assets/images/plant1.png';
import PlantIcon2 from '../assets/images/plant2.png';
import NewPlantIcon from '../assets/images/newplant.png';
import SettingIcon from '../assets/images/settings.png';
import colors from '../config/colors';

export default class PlantFeederScreen extends React.Component {
  static navigationOptions = {
    title: 'Plant Feeder',
    headerStyle: {
      backgroundColor: colors.WHITE,
    },
    headerTitleStyle: {
      color: 'green',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          name: 'Plant1 1',
          image: PlantIcon1,
          screen: 'Plant',
        },
        {
          name: 'Plant 2',
          image: PlantIcon2,
          screen: 'Plant',
        },
        {
          name: 'Add Plant',
          image: NewPlantIcon,
          screen: 'AddPlant',
        },
        {
          name: 'Settings',
          image: SettingIcon,
          screen: 'Settings',
        },
      ],
    };
  }

  _selectScreen = item => {
    this.props.navigation.navigate(item);
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                margin: 1,
                alignItems: 'center',
              }}>
              <TouchableHighlight
                onPress={() => {
                  this._selectScreen(item.screen);
                }}>
                <Image style={styles.imageThumbnail} source={item.image} />
              </TouchableHighlight>
              <Text style={styles.paragraph}>{item.name}</Text>
            </View>
          )}
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.WHITE,
  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
    height: 150,
    width: 150,
  },
});
