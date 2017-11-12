import React from 'react';
import { Root } from "native-base";
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from "react-navigation";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import RootNavigation from './app/navigation/RootNavigation';
import reducer from './app/reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { root } from './app/sagas/sagas';

//TODO
/*
- Melhorar reducers
- Up Down
- Set up Down
- Detox
- Logout
- Unmess stack views 
*/

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
        <RootNavigation />
       </Provider>
    );
  }
}