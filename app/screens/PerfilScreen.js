import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import store from '../store'

@connect(
  state => ({
    elements: state.elements,
    loading: state.loading,
  })
)

export default class PerfilScreen extends Component {
  logout = () => {
    const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' }),
            ],
            key: null
        });
    console.log('logout');
    this.props.navigation.dispatch(resetAction);

    // this.props.navigation.navigate('Element', { ...element });
  };
  render() {

    return (
       <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          // Hide all scroll indicators
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
        <List>
          <ListItem
            title={'Logout'}
            onPress={() => this.logout()}
          />
            </List>
        </ScrollView>
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
