import * as React from 'react';
import { View, StyleSheet, Image, TouchableHighlight, FlatList, Text } from 'react-native';
import PlantFeederIcon from '../assets/images/plantfeeder.png';
import SettingIcon from '../assets/images/settings.png';
import colors from '../config/colors';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Smart House',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#2c3e50',
    },
    headerTitleStyle: {
      color: 'white',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          name: 'PlantFeeder',
          image: PlantFeederIcon,
        },
        {
          name: 'Settings',
          image: SettingIcon,
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
                  this._selectScreen(item.name);
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
