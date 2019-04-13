import * as React from 'react'
import {
 View, StyleSheet, Image, Button, FlatList, Text,
} from 'react-native'
import colors from '../../config/colors'
import strings from '../../config/strings'

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
    super(props)
    this.state = {
      refresh: false,
      items: [
      ],
    }
  }

  componentDidMount() {
    this.requestPotList()
  }

  onWaterButtonPressed = async (item) => {
    fetch(`${strings.LOCALAPI}/water-pot?name=${item.name}`, {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          alert(` ${ response._bodyInit}`)
        } else {
            alert('Error, not Watered')
        }
      })
      .catch((error) => {
        alert(error)
      })
  };

  onUpdateDataButtonPressed() {
    this.requestPotList()
    this.setState({ refresh: !this.state.refresh })
  }

  requestPotList= async () => {
    fetch(`${strings.LOCALAPI}/pot`, {

       method: 'GET',
     })
       .then(response => response.json())
       .then((response) => {
         console.log(response)
         this.setState({ items: response })
       })
       .catch((error) => {
         alert(error)
       })
   };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.items}
          extraData={this.state.refresh}
          renderItem={({ item }) => (
            <View>
              <View style={styles.descriptionInfo}>
                <Image style={styles.imageThumbnail} source={{ uri: item.plant.imageURL }} />
                <Text style={styles.paragraph}>{item.name}</Text>
              </View>
              <View style={styles.statusInfo}>
                <Text style={styles.paragraph}>
luminosity :
                  {item.luminosity}
                </Text>
                <Text style={styles.paragraph}>
humidity:
                  {item.humidity}
                </Text>
              </View>
              <View style={styles.buttonLayout}>
                <Button
                  style={{ padding: 12, margin: 16 }}
                  onPress={() => {
                    this.onWaterButtonPressed(item)
                  }}
                  title="Water now"
                  color={colors.DODGER_BLUE}
                />
                <Button
                  style={{ padding: 12, margin: 16 }}
                  onPress={() => {
                    this.onUpdateDataButtonPressed()
                  }}
                  title="Update Data Now"
                  color={colors.DODGER_BLUE}
                />
              </View>

            </View>
          )}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={() => (
            <View
              style={{
                alignSelf: 'center',
                backgroundColor: '#CED0CE',
                height: 1,
                width: '86%',
              }}
            />
          )}
          ListFooterComponent={() => (
            <View
              style={{
                height: 90,
                backgroundColor: colors.WHITE,

              }}
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
    justifyContent: 'center',
  },

  descriptionInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 16,
    padding: 12,

  },

  statusInfo: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 16,
    padding: 12,

  },

  buttonLayout: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 16,
    padding: 12,

  },

  imageThumbnail: {
    alignItems: 'center',
    height: 150,
    justifyContent: 'center',
    resizeMode: 'stretch',
    width: 150,

  },
})
