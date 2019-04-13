import * as React from 'react'
import {
 Image, StyleSheet, View, Text,
} from 'react-native'
import Button from '../../components/Button'
import FormTextInput from '../../components/FormTextInput'
import imageLogo from '../../assets/images/icon.png'
import colors from '../../config/colors'
import strings from '../../config/strings'

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to your Smart House',
  };

  state = {
    email: '',
    isLoading: false,
    message: '',
    password: '',
  };

  handleEmailChange = (email) => {
    this.setState({ email })
  };

  handlePasswordChange = (password) => {
    this.setState({ password })
  };

  verifyCredentials = async () => {
    const obj = { username: this.state.email, password: this.state.password }
    fetch(`${strings.LOCALAPI}/login`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then((response) => {
        if (response.ok) {
          this.props.navigation.navigate('Home')
        } else {
          this.setState({
            isLoading: false,
            message: 'Error: Invalid Username or Password',
          })
        }
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          message: 'Error: Invalid Username or Password',
        })
      })
  };

  handleLoginPress = () => {
    this.verifyCredentials()
  };

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null

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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    alignSelf: 'center',
    flex: 1,
    height: '45%',
    resizeMode: 'contain',
    width: '45%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  description: {
    color: '#656500',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
})

export default LoginScreen
