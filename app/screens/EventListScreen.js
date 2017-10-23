import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import { connect } from 'react-redux';
import {
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import store from '../store'

@connect(
  state => ({
    events: state.events,
    loading: state.loading,
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_EVENTS'}),
  }),
)

export default class EventList extends Component {
  showEvent = (event) => {
    console.log('showEvent');
    this.props.navigation.navigate('Event', { ...event });
  };
  componentWillMount() {
    console.log('componentWillMount');
    store.dispatch({type: 'GET_EVENTS'});
  }
  render() {
    console.log('FOO1');
    console.log(this.props);
    const { events, loading, refresh } = this.props;
    // console.log(events);
    console.log(loading);
    console.log(refresh);

    // events ? events.map((event, index) => console.log(event)) : console.log('NO events');
    return (
       <View style={styles.container}>
        {events
          ? <ScrollView
              contentContainerStyle={styles.scrollContent}
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
              {events.map((event, index) => <ListItem
                key={index}
                title={ event.category.name }
                subtitle={ event.user_name + ' - ' + event.readable_date}
                onPress={() => this.showEvent(event)}
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
    flex: 1,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
