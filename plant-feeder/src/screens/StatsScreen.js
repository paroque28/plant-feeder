import * as React from 'react'

import {
 Button, Dimensions, StyleSheet, TextInput, Text, View,
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import colors from '../../config/colors'
import strings from '../../config/strings'

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
    super(props)
    this.state = {
      dataLuminosity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      dataHumidity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      potName: '',
      potNames:[],
    }
  }

  requestHistoryDataHumidity = async () => {
    fetch(`${strings.LOCALAPI}/pot-history?potName=${this.state.potName}&type=humidity`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((response) => {
        this.setState({ dataHumidity: response })
      })
      .catch((error) => {
        this.setState({ dataHumidity: [] })
        alert(error)
      })
  };

  requestHistoryDataLuminosity = async () => {
    fetch(`${strings.LOCALAPI}/pot-history?potName=${this.state.potName}&type=luminosity`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((response) => {
        this.setState({ dataLuminosity: response })
      })
      .catch((error) => {
        this.setState({ dataLuminosity: [] })
        alert(error)
      })
  };

  requestPotNames = async () => {
    fetch(`${strings.LOCALAPI}/potname`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((response) => {
        this.setState({ potNames: response })
      })
      .catch((error) => {
        this.setState({ potNames: [] })
        alert(error)
      })
  };

  render() {
    this.requestPotNames()
    return (
      <View style={styles.container}>
        <Text> Humidity </Text>
        <LineChart
          data={{
            labels: ['-10h', '-9h', '-8h', '-7h', '-6h', '-5h', '-4h', '-3h', '-2h', '-1h'],
            datasets: [{
              data: this.state.dataHumidity,
            }],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={200}
          yAxisLabel="%"
          chartConfig={{
            backgroundColor: '#42E80C',
            backgroundGradientFrom: '#0CC445',
            backgroundGradientTo: '#0DFD9F',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}

          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />

        <Text> Luminosity </Text>
        <LineChart
          data={{
            labels: ['-10h', '-9h', '-8h', '-7h', '-6h', '-5h', '-4h', '-3h', '-2h', '-1h'],
            datasets: [{
              data: this.state.dataLuminosity,
            }],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={200}
          yAxisLabel="lux"
          chartConfig={{
            backgroundColor: '#FFF34D',
            backgroundGradientFrom: '#D3E83A',
            backgroundGradientTo: '#A6FF40',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}

          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />

        <View style={styles.inputForm}>
          <Text>Pot Name: </Text>
          <TextInput
            value={this.state.potName}
            onChangeText={(potName) => {
              this.setState({ potName })
            }}
          />


          <Button
            style={{ padding: 12, margin: 16 }}
            onPress={() => {
              this.requestHistoryDataHumidity()
              this.requestHistoryDataLuminosity()
            }}
            title="Generate"
            color={colors.DODGER_BLUE}
          />
        </View>

      </View>
    )
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
  inputForm: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
    flexDirection: 'column',
  },
})
