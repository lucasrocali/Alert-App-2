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
import { Constants } from 'expo';

import { connect } from 'react-redux';

import store from '../store'

@connect(
  state => ({
    itens: [{"name":"a"},{"name":"b"},{"name":"c"}],//state.itens,
    loading: state.loading,
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_ELEMENTS'}),
  }),
)

export default class SelectItemScreen extends Component {
  render() {
    // const elements = null;
    // const itens = [{"name":"a"},{"name":"b"},{"name":"c"}];
    const selectionName = 'name';
    const actionType = 'GET_ELEMENTS';
    // const loading = false;
    // const refresh  = () => dispatch({type:'GET_ELEMENTS'});
    const { itens, loading, refresh } = this.props;
    // console.log('PROPS');
    // console.log(this.props);
    return (

      <View style={styles.container}>
        {itens ? <ScrollView
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
              {itens.map((item, index) => 
                <ListItem
                  key={index}
                  title={item[selectionName]}
                  onPress={() => {
                    console.log('Selected '+item[selectionName]);
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