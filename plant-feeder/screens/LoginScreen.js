import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import FormTextInput from '../components/FormTextInput';
import imageLogo from '../assets/images/icon.png';
import colors from '../config/colors';
import strings from '../config/strings';


class LoginScreen extends React.Component{
    state = {
        email: "",
        password: ""
    };

    handleEmailChange = (email) => {
        this.setState({ email: email})
    };

    handlePasswordChange = (password) => {
        this.setState({ password: password});
    };

    handleLoginPress = () => {
        alert("Login Successful!!");
        this.props.navigation.navigate('HomeScreen');
    }

    render(){
        return (
            <View style={styles.container} >
                <Image source={imageLogo} style={styles.logo}/>
                <View style={styles.form}>
                    <FormTextInput 
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                        placeholder={strings.EMAIL_PLACEHOLDER} />
                    <FormTextInput
                        value={this.state.password}
                        onChangeText={this.handlePasswordChange}
                        placeholder={strings.PASSWORD_PLACEHOLDER} />
                    <Button label={strings.LOGIN} onPress={this.handleLoginPress} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
        {
            container: {
                flex: 1,
                backgroundColor: colors.WHITE,
                alignItems: "center",
                justifyContent: "space-between",
            },
            logo: {
                flex: 1,
                width: "45%",
                height: "45%",
                resizeMode: "contain",
                alignSelf: "center",
            },
            form: {
                flex: 1,
                justifyContent: "center",
                width: "80%",
            },
        }
);

export default LoginScreen;