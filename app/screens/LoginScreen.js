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

const lockIcon = require("./../assets/icons/login_lock.png");
const personIcon = require("./../assets/icons/login_person.png");

@connect(
  state => ({
    email: '',
    password: '',
    currentScreen: state.currentScreen,
    logged: state.logged,
    loading: state.loading,
    message: state.message
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_MOVIE_DATA'}),
  }),
)
export default class LoginScreen extends Component {
  
  handleLoginPress = () => {
    console.log('Login');
    console.log(this.state);
    if (this.state && this.state.email && this.state.password) {
      store.dispatch({type: 'LOGIN',email: this.state.email,password: this.state.password});
    }
    //this.props.navigation.navigate('Main');
  };
  handleSignupPress = () => {
    console.log('Signup');
    this.props.navigation.navigate('Signup');
  };
  componentDidUpdate() {
    // console.log("componentDidUpdate");
    // console.log(this.props);
    const { logged, message, currentScreen } = this.props;
    if (logged && currentScreen == 'login') {
      this.props.navigation.navigate('Main');
    }
    if (message && !logged) {
      console.log('MSG ON LOGIN SCREEN '+message);
    }
  }
  componentDidMount() {
    // store.dispatch({type: 'LOGIN'});
  }

  render() {
    // console.log('LoginScreen');
    const { logged, loading, message } = this.props;
    // console.log('render');
    return (
      <View style={styles.container}>
        <StatusBarAlert
            visible={message != null && logged == false}
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
              <TouchableOpacity activeOpacity={.5}>
                <View>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.5} onPress={this.handleLoginPress}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{!loading? 'Sign In' : 'Loading'}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <View style={styles.signupWrap}>
                <Text style={styles.accountText}>Don't have an account?</Text>
                <TouchableOpacity activeOpacity={.5} onPress={this.handleSignupPress}>
                  <View>
                    <Text style={styles.signupLinkText}>Sign Up</Text>
                  </View>
                </TouchableOpacity>
              </View>
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
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10
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