import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import { connect } from 'react-redux';

import store from '../store'

@connect(
  state => ({
    elements: state.elements,
    loading: state.loading,
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_ELEMENTS'}),
  }),
)

export default class ElementList extends Component {
  showElement = (element) => {
    console.log('showElement');
    this.props.navigation.navigate('Element', { ...{element: element} });
  };
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        headerRight: <Button title="Criar" onPress={() => params.handleAdd()} />
    };
  };
    
  add() {
     console.log('clicked');
     this.props.navigation.navigate('Element', { ...{element: null} });
  }
  componentWillMount() {
    // console.log('componentWillMount');
    store.dispatch({type: 'GET_ELEMENTS'});
    this.props.navigation.setParams({ handleAdd: this.add.bind(this) });
  }
  render() {
    // console.log('FOO1');
    // console.log(this.props);
    const { elements, loading, refresh } = this.props;
    // console.log(loading);
    // console.log(refresh);

    return (
       <View style={styles.container}>
        {elements
          ? <ScrollView
              contentContainerStyle={styles.scrollContent}
              // Hide all scroll indicators
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={refresh}
                />
              }
            >
            <List>
              {elements.map((element, index) => <ListItem
                key={index}
                title={element.name}
                subtitle={element.element_feature_option &&
                          element.element_feature_option.feature_options ?
                          element.element_feature_option.feature_options.map(function(feature_option){
                              return feature_option.name;
                          }).join(", ")
                          :''}
                onPress={() => this.showElement(element)}
              />)}
            </List>
            </ScrollView>
          :  <ActivityIndicator
                animating={loading}
                style={styles.loader}
                size="large"
              />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
