import * as React from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import Logo from '../../assets/snack-icon.png';
import styles from './styles';

export default class SearchPage extends React.Component {
  static navigationOptions = {
    title: 'Iniciar Sesion',
  };

  constructor(props) {
    super(props);
    this.state = {
      usernameString: '',
      passwordString: '',
      isLoading: false,
      message: '',
    };
  }

  _login = login => {
    this.setState({ isLoading: true });
    if (this.state.usernameString == 'a' && this.state.passwordString == 'b') {
      this.setState({
        isLoading: false,
        message: ``,
      });
      this.props.navigation.navigate('Home', {});
    } else {
      this.setState({
        isLoading: false,
        message: `Usuario o contraseña incorrecto`,
      });
    }
  };

  _onLoginPressed = () => {
    this._login();
  };

  _onUsernameTextChanged = event => {
    this.setState({
      usernameString: event.nativeEvent.text,
    });
  };
  
  _onPasswordTextChanged = event => {
    this.setState({
      passwordString: event.nativeEvent.text,
    });
  };

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;

    return (
      <View style={styles.container}>
        <Text style={styles.description}>Usuario</Text>
        <TextInput
          underlineColorAndroid={'transparent'}
          style={styles.searchInput}
          placeholder="usuario@gmail.com"
          value={this.state.usernameString}
          onChange={this._onUsernameTextChanged}
          placeholderTextColor="#656565"
        />
        <Text style={styles.description}>Contraseña</Text>
        <TextInput
          type="password"
          underlineColorAndroid={'transparent'}
          style={styles.searchInput}
          placeholder="**********"
          value={this.state.passwordString}
          onChange={this._onPasswordTextChanged}
          placeholderTextColor="#656565"
        />
        <Button
          onPress={this._onLoginPressed}
          color="#48BBEC"
          title="Iniciar Sesion"
        />
        <Image source={Logo} style={styles.image} />
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}
