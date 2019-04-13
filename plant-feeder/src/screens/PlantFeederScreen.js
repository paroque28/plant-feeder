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
                height: 1,
                width: '86%',
                backgroundColor: '#CED0CE',
                alignSelf: 'center',
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
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.WHITE,
  },

  descriptionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    margin: 16,

  },

  statusInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    margin: 16,

  },

  buttonLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 12,
    margin: 16,

  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
    height: 150,
    width: 150,
  },
})
