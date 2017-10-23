import React from 'react';
import { Root } from "native-base";
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from "react-navigation";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import Counter from './app/containers/Counter';
import LoginScreen from './app/screens/LoginScreen'
import reducer from './app/reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { root } from './app/sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
));

sagaMiddleware.run(root);


const AppNavigator = StackNavigator(
  {
    Login: { screen: LoginScreen },
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      	<Root>
        <AppNavigator />
        </Root>
       </Provider>
    );
  }
}