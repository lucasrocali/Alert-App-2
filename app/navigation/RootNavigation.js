import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'native-base'; 
import Spinner from 'react-native-loading-spinner-overlay';
import { Root } from "native-base";
import { RootStack } from './Routers';
import * as selectors from '../reducers/reducers';

class RootNavigator extends React.Component {

  componentDidUpdate() {
    const { message } = this.props;
    if (message) {
      Toast.show({text: message,position: 'bottom',buttonText: 'Ok'})
    }
  }

  render() {
     const { loading } = this.props;
    return (
      <Root>
        <Spinner visible={loading} textStyle={{color: '#FFF'}} />
        <RootStack />
      </Root>
    );
  }
}

RootNavigator.propTypes = {
  message: PropTypes.string,
  loading: PropTypes.bool,
}

export default connect(
  state => ({
    message: selectors.getMessage(state),
    loading: selectors.isLoading(state)
  })
)(RootNavigator)