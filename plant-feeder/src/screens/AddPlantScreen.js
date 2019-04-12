import * as React from 'react';
import {Button, Image, FlatList, StyleSheet, Text, TouchableHighlight, View, Modal, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';

export default class AddPlantScreen extends React.Component {
  static navigationOptions = {
    title: 'Add a New Plant',
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
      isVisibleModal: false,
      items: [],
      selectedPlant: {
        name: '',
        description: '',
        minHumidity: '',
        imageURL: '',
      }
    };
  }

  componentDidMount() {
    this.requestPlantList();
  }

   setSelectedPlant(item) {
    this.setState({
      selectedPlant: {
        name: item.name,
        description: item.description,
        imageURL: item.imageURL,
        minHumidity: item.minHumidity
      },
      isVisibleModal: true,
    });

  }

  renderModal = () =>(
    <View>
      <View style={styles.descriptionInfo}>
        <Image style={styles.imageThumbnail} source={{uri: this.state.selectedPlant.imageURL}} />
        <View style={styles.statusInfo}>
          <Text>Name: {this.state.selectedPlant.name}</Text>
          <Text>Minimum Humidity: {this.state.selectedPlant.minHumidity}</Text>
        </View>
      </View>
      <Text>Description: {this.state.selectedPlant.description}</Text>
      <Text>Do you want to add this to a pot?</Text>
      <View style={styles.buttonLayout}>
        <Button
          style={{ padding: 12, margin: 16 }}
          onPress={() => {
           //TODO
          }}
          title="Add"
          color={colors.DODGER_BLUE}
        />
        <Button
          style={{ padding: 12, margin: 16 }}
          onPress={() => {
            //TODO
          }}
          title="Cancel"
          color={colors.DODGER_BLUE}
        />
      </View>

      <TouchableOpacity onPress={() => this.setState({ isVisibleModal: false })}>
        <View style={styles.button}>
          <Text> close </Text>
        </View>
      </TouchableOpacity>
    </View>

  ) ;

  requestPlantList= async () => { 
    fetch('http://192.168.0.13:80/api/v1/plant', {
 
       method: 'GET',
     })
       .then(response => response.json())
       .then((response) =>  {
         console.log(response)
         this.setState({items: response})
       })
       .catch((error) => {
         alert(error);
       });  
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
                <TouchableHighlight
                  onPress={() => {
                    this.setSelectedPlant(item);
                  }}>
                  <Image style={styles.imageThumbnail} source={{uri: item.imageURL}} />
                </TouchableHighlight>
                  <Text style={styles.paragraph}>{item.name}</Text>
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
        <View>
          <Modal 
            visible={this.state.isVisibleModal}
            onRequestClose={() => {
              this.setState({ isVisibleModal: false })
            }}
          >
            {this.renderModal()}
          </Modal>
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightblue',
    padding: 11,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonLayout:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    padding: 12,
    margin: 16,

  },
  container: {
    justifyContent: 'center',
    flex: 1,  
    backgroundColor: colors.WHITE,
  },

  descriptionInfo:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,

  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
    height: 150,
    width: 150,
  },
  statusInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    margin: 16,

  },
})

