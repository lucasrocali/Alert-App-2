import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, View, Button, ActivityIndicator, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as counterActionCreators from '../actions/CounterActions';

class Counter extends Component {
  render() {
    const { counter, actions } = this.props;
    return (
      <View>
        <View style={styles.container}>
          <Text style={{ fontSize: 50}}>Counter</Text>
          { counter.loading ? <ActivityIndicator size={Platform.OS === 'ios' ? "large" : 64}/> : <Text style={{ color: 'red', fontSize: 50}}>{counter.count}</Text>}
        </View>
        <View style={styles.layoutButtonContainer}>
          <Button disabled={counter.loading} onPress={actions.increment} title="Increase" />
          <Button disabled={counter.loading} onPress={actions.decrement} title="Decrease" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  layoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

function select(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(counterActionCreators, dispatch) }
}

export default connect(select, mapDispatchToProps)(Counter);