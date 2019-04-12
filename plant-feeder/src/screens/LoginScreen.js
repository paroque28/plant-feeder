import * as React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import Button from '../../components/Button';
import FormTextInput from '../../components/FormTextInput';
import imageLogo from '../../assets/images/icon.png';
import colors from '../../config/colors';
import strings from '../../config/strings';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to your Smart House',
  };

  state = {
    email: '',
    password: '',
    isLoading: false,
    message: '',
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  verifyCredentials = async () => {
    let obj = { username: this.state.email, password: this.state.password };   
    fetch('http://192.168.0.13:80/api/v1/login', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
      .then((response) =>  {
        if (response.ok){
          this.props.navigation.navigate('Home');
        }else{
          this.setState({
            isLoading: false,
            message: 'Error: Invalid Username or Password',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isLoading: false,
          message: 'Error: Invalid Username or Password'
        });
      });  
  };

  handleLoginPress = () => {
    this.verifyCredentials();
  };

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;

    return (
      <View style={styles.container}>
        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form}>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            placeholder={strings.EMAIL_PLACEHOLDER}
          />
          <FormTextInput
            type="password"
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={strings.PASSWORD_PLACEHOLDER}
          />
          {spinner}
          <Button label={strings.LOGIN} onPress={this.handleLoginPress} />
          <Text style={styles.description}>{this.state.message}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flex: 1,
    width: '45%',
    height: '45%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  description: {
    marginBottom: 20,
    fontSize:  18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#656500'
  },
});

export default LoginScreen;