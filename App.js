import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import Counter from './app/containers/Counter';
import reducer from './app/reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { root } from './app/sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
));

sagaMiddleware.run(root);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Counter/>
      </Provider>
    );
  }
}