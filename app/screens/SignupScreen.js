import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Constants } from 'expo';
import StatusBarAlert from 'react-native-statusbar-alert';
import { connect } from 'react-redux';

import store from '../store'

@connect(
  state => ({
    currentScreen: state.currentScreen,
    success: state.success,
    loading: state.loading,
    message: state.message
  })
)
export default class SignupScreen extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  }
  handleSignupPress = () => {
    if (this.state.name != "" && this.state.email != "" && this.state.password != "" && this.state.password_confirmation != "") {
      store.dispatch({type: 'SIGNUP', name: this.state.name , email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation});
    }
  };
  handleBackPress = () => {
    this.props.navigation.goBack(null);
  };
  componentDidUpdate() {
    // console.log("componentDidUpdate");
    // console.log(this.props);
    const { success, currentScreen } = this.props;
    //DEBUG ONLY
    if (success && currentScreen == 'signup') {
      this.props.navigation.goBack(null);
      this.props.navigation.navigate('Main');
    }
  }

  render() {
    console.log('LoginScreen');
    const { success, loading, message } = this.props;
    console.log('render');
    console.log(this.props);
    return (
      <View style={styles.container}>
        <StatusBarAlert
            visible={message != null && success == false}
            message= { message}
            backgroundColor="#3CC29E"
            color="white"
          />
        <ScrollView>
            <View style={styles.markWrap}>
              <Image style={styles.mark} resizeMode="contain" />
            </View>
            <View style={styles.wrapper}>
              <View style={styles.inputWrap}>
                <TextInput 
                  placeholder="Name" 
                  placeholderTextColor="#333"
                  style={styles.input} 
                  onChangeText={(text) => this.setState({name:text})}
                />
              </View>
              <View style={styles.inputWrap}>
                <TextInput 
                  placeholder="Email" 
                  placeholderTextColor="#333"
                  style={styles.input} 
                  onChangeText={(text) => this.setState({email:text})}
                />
              </View>
              <View style={styles.inputWrap}>
                <TextInput 
                  placeholderTextColor="#333"
                  placeholder="Password" 
                  style={styles.input} 
                  secureTextEntry 
                  onChangeText={(text) => this.setState({password:text})}
                />
              </View>
              <View style={styles.inputWrap}>
                <TextInput 
                  placeholderTextColor="#333"
                  placeholder="Password Confirmation" 
                  style={styles.input} 
                  secureTextEntry 
                  onChangeText={(text) => this.setState({password_confirmation:text})}
                />
              </View>
              <TouchableOpacity activeOpacity={.5} onPress={this.handleSignupPress}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{!loading? 'Sign Up' : 'Loading'}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.5} onPress={this.handleBackPress}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{'Back'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    margin: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#555555",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 20
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#666",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#333"
  },
  signupLinkText: {
    color: "#666",
    marginLeft: 5,
  }
});