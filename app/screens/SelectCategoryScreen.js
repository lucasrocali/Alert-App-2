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
import { List, ListItem } from 'react-native-elements'; // 0.17.0
import { NavigationActions } from "react-navigation";

import { Constants } from 'expo';

import { connect } from 'react-redux';

import store from '../store'

@connect(
  state => ({
    create_event: state.create_event,
    categories: state.categories,//state.itens,
    loading: state.loading,
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_CATEGORIES'}),
  }),
)

export default class SelectCategoryScreen extends Component {
   componentWillMount() {
    console.log('componentWillMount');
    store.dispatch({type: 'GET_CATEGORIES'});
  }
  render() {
    // const elements = null;
    // const itens = [{"name":"a"},{"name":"b"},{"name":"c"}];
    const selectionName = 'name';
    const actionType = 'GET_CATEGORIES';
    // const loading = false;
    // const refresh  = () => dispatch({type:'GET_ELEMENTS'});
    const { create_event, categories, loading, refresh } = this.props;
    console.log('PROPS');
    console.log(this.props);
    console.log(create_event);
    return (

      <View style={styles.container}>
        {categories ? <ScrollView
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
              {categories.map((category, index) => 
                <ListItem
                  key={index}
                  title={category.name}
                  onPress={() => {
                    console.log('Selected '+category.name);
                    // this.setState({event: { category_id: category.id }})
                    console.log(this.props);
                    // create_event.category = category;
                    // store.dispatch({type: 'SELECTED_CATEGORY', category: category });
                    this.props.navigation.state.params.returnCategory(category);
                    this.props.navigation.goBack(null);
                    // store.dispatch(NavigationActions.back());
                  }}
                />)}
              
            </List>
            </ScrollView>
            :
            <ActivityIndicator
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
    flex: 1,
  },
 loader: {
    flex: 1,
    alignItems: 'center',     // center horizontally
    justifyContent: 'center', // center vertically
  }
});