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
      password: ""
    };
  }
  componentDidUpdate() {
    const { success } = this.props;
    if (success) {
      this.props.navigation.navigate('Main');
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
  success: PropTypes.bool,

  // actions
  login: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    success: state.reducers.success
  }),
  { login }
)(Login)