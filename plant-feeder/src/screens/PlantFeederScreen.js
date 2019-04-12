import * as React from 'react'
import {
 View, StyleSheet, Image, Button, FlatList, Text 
} from 'react-native'
import PlantIcon1 from '../../assets/images/plant1.png'
import PlantIcon2 from '../../assets/images/plant2.png'
import NewPlantIcon from '../../assets/images/newplant.png'
import SettingIcon from '../../assets/images/settings.png'
import colors from '../../config/colors'

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
      // dev data of plants to be showed. Will be fetched form server.
      items: [
        {
          id:0,
          id2:'a',
          name: 'Espatifilo',
          image: PlantIcon1,
          humidity: '20%',
          luminosity: '200lux'
        },
        {
          id:1,
          id2:'b',
          name: 'Ciclamen',
          image: PlantIcon2,
          humidity: '22%',
          luminosity: '200lux'
        },
        {
          id:2,
          id2:'c',
          name: ' Adiantum',
          image: PlantIcon1,
          humidity: '25%',
          luminosity: '200lux'
        },
      ],
    }
  }

  _onWaterButtonPressed = async (item) => { 
    fetch(`http://192.168.0.13:80/api/v1/waterpump?id=${item.id}`, {
      method: 'POST',
    })
      .then((response) =>  {
        if (response.ok) {
          console.log(response);
          alert(`You have watered plant ${  response._bodyInit}`);
        }
        else{
            alert("Error, not Watered");
        }
      })
      .catch((error) => {
        alert(error);
      });  
  };

  _getHumidity = async (item) => { 
    fetch(`http://192.168.0.13:80/api/v1/humidity?id=${item.id2}`, {
      method: 'GET',
    })
      .then((response) =>  {
        if (response.ok) {
          console.log(response);
          alert(`Success, ${response._bodyInit} `);
          return response._bodyInit;
        }

            alert("Error");
            return 20;

      })
      .catch((error) => {
        alert(error);
      });  
  };

  _onUpdateDataButtonPressed = async (item) => { 
    fetch(`http://192.168.0.13:80/api/v1/waterpump?id=${item.id}`, {
      method: 'POST',
    })
      .then((response) =>  {
        if (response.ok) {
          console.log(response);
          alert(`You have watered plant ${  response._bodyInit}`);
        }
        else{
            alert("Error, not Watered");
        }
      })
      .catch((error) => {
        alert(error);
      });  
  };

  _selectScreen = (item) => {
    this.props.navigation.navigate(item)
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => (
            <View>
              <View style={styles.descriptionInfo}> 
                <Image style={styles.imageThumbnail} source={item.image} />
                <Text style={styles.paragraph}>{item.name}</Text>
              </View>
              <View style={styles.statusInfo}>
                <Text style={styles.paragraph}>luminosity : {item.luminosity}</Text>
                <Text style={styles.paragraph}>humidity: {item.humidity}</Text>
              </View>
              <View style={styles.buttonLayout}>
                <Button 
                  style = { {marginHorizontal: 30} }
                  onPress={() => {
                    this._onWaterButtonPressed(item);
                  }}
                  title='Water now'
                  color= {colors.DODGER_BLUE}     
                />
                <Button 
                  style = { {marginHorizontal: 30} }
                  onPress={() => {
                    this._getHumidity(item);
                  }}
                  title='Update Data Now'
                  color= {colors.DODGER_BLUE}     
                />
              </View>
              
            </View>
          )}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={  ()=>(
            <View
              style={{
                height: 1,
                width: "86%",
                backgroundColor: "#CED0CE",
                alignSelf: 'center',
              }}
            />
          )}
          ListFooterComponent={ ()=>(
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

  descriptionInfo:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',

  },

  statusInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2%'

  },

  buttonLayout:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1

  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
    height: 150,
    width: 150,
  },
})
