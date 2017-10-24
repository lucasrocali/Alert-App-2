import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../actions'
import { Container, Header, Content, Form, Item, Input, Label, Toast, Button, Text } from 'native-base';
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
    const { success, message } = this.props;
    if (success) {
      this.props.navigation.navigate('Main');
    } else if (message && !this.state.seenMessage) {
      this.setState({seenMessage:true})
      Toast.show({
              text: message,
              position: 'bottom',
              buttonText: 'Ok'
            })
    }
  }
  render() {
    const { loading, login } = this.props;
    
    return (
       <Container>
        <Content padder>
          <Spinner visible={loading} textStyle={{color: '#FFF'}} />
          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input onChangeText={(text) => this.setState({email:text})} />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input secureTextEntry onChangeText={(text) => this.setState({password:text})} />
            </Item>
          </Form>
          <Button primary block style= {{ margin: 10 }} onPress={()=> {
                                                          // this.props.navigation.navigate('Main');
                                                          this.setState({seenMessage:false})
                                                          // login('rocali@outlook.com', 'password')
                                                          login(this.state.email, this.state.password);
                                                        }}>
            <Text>Login</Text>
          </Button>
          <Button info block style= {{ margin: 10 }} onPress={()=> {
                                                          this.props.navigation.navigate('Signup');
                                                          // this.setState({seenMessage:false})
                                                          // login(this.state.email, this.state.password);
                                                        }}>
            <Text>Signup</Text>
          </Button>
        </Content>
      </Container>
      
    );
  }
}

Login.propTypes = {
  // data
  message: PropTypes.string,
  loading: PropTypes.bool,
  success: PropTypes.bool,

  // actions
  login: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    message: state.reducers.login.message,
    loading: state.reducers.login.loading,
    success: state.reducers.login.success
  }),
  { login }
)(Login)