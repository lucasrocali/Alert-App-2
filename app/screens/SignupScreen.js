import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions'
import { Container, Header, Content, Form, Item, Input, Label, Toast, Button, Text } from 'native-base';
import * as selectors from '../reducers/reducers';

class Signup extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  }
  componentDidUpdate() {
    const { success, message } = this.props;
    if (success) {
      this.props.navigation.navigate('Main');
    }
  }
  handleSignupPress() {
    const { signup } = this.props;
    const { name, email, password, password_confirmation } = this.state
    signup( name, email, password, password_confirmation );
  }

  handleBackPress() {
    this.props.navigation.goBack(null); 
  }
  render() {
    return (
       <Container>
        <Content padder>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input onChangeText={(text) => this.setState({name:text})} />
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input onChangeText={(text) => this.setState({email:text})} />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input secureTextEntry onChangeText={(text) => this.setState({password:text})} />
            </Item>
            <Item stackedLabel>
              <Label>Password Confirmation</Label>
              <Input secureTextEntry onChangeText={(text) => this.setState({password_confirmation:text})} />
            </Item>
          </Form>
          <Button primary style= {{ margin: 10 }} block onPress={ this.handleSignupPress.bind(this)}>
            <Text>Signup</Text>
          </Button>
          <Button light style= {{ margin: 10 }} block onPress={ this.handleBackPress.bind(this)}>
            <Text>Back</Text>
          </Button>
        </Content>
      </Container>
      
    );
  }
}


Signup.propTypes = {
  success: PropTypes.bool,

  signup: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    success: selectors.isAuthenticated(state)
  }),
  { signup }
)(Signup)