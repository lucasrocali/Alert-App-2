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
    appointments: state.appointments,
    loading: state.loading,
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_APPOINTMENTS'}),
  }),
)

export default class AppointmentList extends Component {
  showAppointment = (appointment) => {
    console.log('showAppointment');
    this.props.navigation.navigate('Appointment', { ...{appointment: appointment} });
  };
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
        headerRight: <Button title="Criar" onPress={() => params.handleAdd()} />
    };
  };
    
  add() {
     console.log('clicked');
     this.props.navigation.navigate('Appointment', { ...{appointment: null} });
  }
  componentWillMount() {
    // console.log('componentWillMount');
    store.dispatch({type: 'GET_APPOINTMENTS'});
    this.props.navigation.setParams({ handleAdd: this.add.bind(this) });
  }
  render() {
    // console.log('FOO1');
    // console.log(this.props);
    const { appointments, loading, refresh } = this.props;
    // console.log(appointments);
    // console.log(loading);
    // console.log(refresh);

    // appointments ? appointments.map((appointment, index) => console.log(appointment)) : console.log('NO appointments');
    return (
       <View style={styles.container}>
        {appointments
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
              {appointments.map((appointment, index) => <ListItem
                key={index}
                title={appointment.element.name}
                subtitle={appointment.slot.name + ' ' + appointment.from_datetime + ' - ' + appointment.to_datetime}
                onPress={() => this.showAppointment(appointment)}
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
