import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions'
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import * as selectors from '../reducers/reducers';

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

  handleLoginPress() {
    const { login } = this.props;
    const { email, password } = this.state
    login( email, password )
  }

  handleSignupPress() {
    this.props.navigation.navigate('Signup');
  }
  
  render() {
    return (
       <Container>
        <Content padder>
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
          <Button primary block style= {{ margin: 10 }} onPress={this.handleLoginPress.bind(this)}>
            <Text>Login</Text>
          </Button>
          <Button info block style= {{ margin: 10 }} onPress={this.handleSignupPress.bind(this)}>
            <Text>Signup</Text>
          </Button>
        </Content>
      </Container>
      
    );
  }
}

Login.propTypes = {
  success: PropTypes.bool,

  login: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    success: selectors.isAuthenticated(state)
  }),
  { login }
)(Login)