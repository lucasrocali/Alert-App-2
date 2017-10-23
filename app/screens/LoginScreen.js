import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { login } from '../actions'
import { Container, Header, Content, Form, Item, Input, Label, Toast, Button } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

class Login extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      email: "",
      password: "",
      seenMessage: false
    };
  }
  componentDidUpdate() {
    const { message } = this.props;
    if (message && !this.state.seenMessage) {
      this.setState({seenMessage:true})
      Toast.show({
              text: message,
              position: 'bottom',
              buttonText: 'Okay'
            })
    }
  }
  render() {
    const { logged, loading, login } = this.props;
    
    return (
       <Container>
        <Content padder>
        <Spinner visible={loading} textStyle={{color: '#FFF'}} />
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={(text) => this.setState({email:text})} />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input onChangeText={(text) => this.setState({password:text})} />
            </Item>
          </Form>
          <Button style= {{ margin: 10 }} block onPress={()=> {
            this.setState({seenMessage:false})
            login(this.state.email, this.state.password);
          }}>
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
      
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});


Login.propTypes = {
  // data
  message: PropTypes.string,
  loading: PropTypes.bool,

  // actions
  login: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    message: state.login.message,
    loading: state.login.loading,
  }),
  { login }
)(Login)