import * as React from 'react';

import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import colors from '../../config/colors';


export default class StatsScreen extends React.Component {
  static navigationOptions = {
    title: 'Stats',
    headerStyle: {
      backgroundColor: colors.WHITE,
    },
    headerTitleStyle: {
      color: 'green',
    },
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //this.requestHistoryData();
  }

  requestHistoryData= async (name,type) => { 
    fetch(`${strings.LOCALAPI}/pot-history?potName=${name}&type=${type}`, {
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
        <Text> Still Pending </Text>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }]
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel={'$'}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}

          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />


        <Text> Humidity Chart </Text>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }]
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel={'$'}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}

          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
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
    flexDirection: 'column',
  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
    height: 150,
    width: 150,
  },
});
