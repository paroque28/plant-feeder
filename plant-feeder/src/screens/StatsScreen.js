import * as React from 'react'

import {
 Button, Dimensions, StyleSheet, Picker, Text, View,
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
      dataHumidity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      dataLuminosity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      potName: '',
      potNames: ['no plants'],
    }
    // Fetch Pot Names
    fetch(`${strings.LOCALAPI}/potname`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((response) => {
        this.state.potNames = response
      })
      .catch((error) => {
        alert(error)
      })  }

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

  componentDidMount() {
    this.requestPotNames()
  }

  render() {
    const serviceItems = this.state.potNames.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
  });
    return (
      <View style={styles.container}>
        <Text style={styles.label}> Humidity </Text>
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
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            decimalPlaces: 2, // optional, defaults to 2dp
            style: {
              borderRadius: 16,
            },
          }}

          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />

        <Text style={styles.label}> Luminosity </Text>
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
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            decimalPlaces: 2, // optional, defaults to 2dp
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
          <Text style={styles.label}>Pot Name: </Text>
          <Picker
            selectedValue={this.state.potName}
            style={{height: 50, width: 200}}
            onValueChange={(potName) => {
                       this.setState({ potName })
                      }}
          >
            {serviceItems}
          </Picker>

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
    backgroundColor: colors.WHITE,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 30,
  },

  label: {
    fontWeight: 'bold',
  },

  inputForm: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    resizeMode: 'stretch',
  },
})
