import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signup } from '../actions'
import { Container, Header, Content, Form, Item, Input, Label, Toast, Button, Text } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

class Signup extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
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
    const { logged, loading, signup } = this.props;
    
    return (
       <Container>
        <Content padder>
        <Spinner visible={loading} textStyle={{color: '#FFF'}} />
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
          <Button primary style= {{ margin: 10 }} block onPress={()=> {
                                                          // console.log('Signup');
                                                          this.setState({seenMessage:false})
                                                          signup(this.state.name,this.state.email, this.state.password,this.state.password_confirmation);
                                                        }}>
            <Text>Signup</Text>
          </Button>
          <Button light style= {{ margin: 10 }} block onPress={()=> {
                                                          this.props.navigation.goBack(null);
                                                          // this.setState({seenMessage:false})
                                                          // login(this.state.email, this.state.password);
                                                        }}>
            <Text>Back</Text>
          </Button>
        </Content>
      </Container>
      
    );
  }
}


Signup.propTypes = {
  // data
  message: PropTypes.string,
  loading: PropTypes.bool,
  success: PropTypes.bool,

  // actions
  signup: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    message: state.reducers.signup.message,
    loading: state.reducers.signup.loading,
    success: state.reducers.signup.success
  }),
  { signup }
)(Signup)