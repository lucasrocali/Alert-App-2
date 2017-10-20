import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';
import StatusBarAlert from 'react-native-statusbar-alert';
import { List, ListItem } from 'react-native-elements';

import { connect } from 'react-redux';

import store from '../store'

@connect(
  state => ({
    currentScreen: state.currentScreen,
    elements: state.elements,
    slot_times: state.slot_times,
    loading: state.loading,
    message: state.message,
    success: state.success
  })
)
class AppointmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_appointment: {
        slot_id:null,
        possible_slot_ids:[],
        elements:[],
        from_datetime:null,
        to_datetime:null,
        status:null
      }
    };
  }
  handlePress = () => {
    console.log('Save');
    console.log(this.state);
    if (this.state && this.state.new_appointment.possible_slot_ids.length > 0 && this.state.new_appointment.elements.length > 0 && this.state.new_appointment.from_datetime && this.state.new_appointment.to_datetime ) {
      store.dispatch({type: 'CREATE_APPOINTMENT',new_appointment: this.state.new_appointment });
    }
  };

  selectedElement(element) {
    console.log('selectedElement'+element.name);
    
    var { new_appointment } = this.state;
    if (new_appointment.elements.includes(element)){
      alert('Já inserido');
    } else {
       if (new_appointment.elements.length > 0 && new_appointment.elements[0].element_feature_option.combination != element.element_feature_option.combination) {
        alert('Elementos com características diferentes');
       } else {
        new_appointment.elements.push(element);  
        this.setState({ new_appointment: new_appointment });

        const { slot_times } = this.props;
        if (slot_times == null || slot_times.length == 0) {
          store.dispatch({type: 'GET_SLOT_TIMES'});
        }
       }
    }

    
  }
  selectedFromDate(date_slots) {
    console.log('selectedFromDate'+date_slots);
    var { new_appointment } = this.state;
    new_appointment.from_datetime = date_slots.slot_datetime;
    new_appointment.possible_slot_ids = date_slots.slot_ids;
    this.setState({ new_appointment: new_appointment });
  }
  selectedToDate(date_slots) {
    console.log('selectedToDate'+date_slots);
    var { new_appointment } = this.state;
    new_appointment.to_datetime = date_slots.slot_datetime;
    this.setState({ new_appointment: new_appointment });
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
    console.log(this.props);
    const { message, currentScreen, success } = this.props;
    if (success && currentScreen == 'appointment') {
      store.dispatch({type: 'GET_APPOINTMENTS'});
      this.props.navigation.goBack(null);
    }
  }
  render() {
    console.log('Navigation props - Appointment');
    console.log(this.props.navigation.state);
    const { appointment } = this.props.navigation.state.params;
    console.log('AppointmentScreen');

    const { loading, message, success } = this.props;

    console.log(appointment);
    const { new_appointment } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
        {
        appointment ?
          <View style={styles.wrapper}>
            <View 
              style={styles.inputWrap}>
              <Text
                style={styles.input}
              >{ appointment.slot.name + ' ' + appointment.slot.capacity }</Text>
            </View>
            <View 
              style={styles.inputWrap}>
              <Text
                style={styles.input}
              >{ appointment.element.name }</Text>
            </View>
            <View 
              style={styles.inputWrap}>
              <Text
                style={styles.input}
              >{ appointment.from_datetime }</Text>
            </View>
            <View 
              style={styles.inputWrap}>
              <Text
                style={styles.input}
              >{ appointment.to_datetime }</Text>
            </View>

          </View>
          :
          <View>
            <StatusBarAlert
                style = {{height: 60 }}
                visible={message != null}
                message= { message}
                backgroundColor="#3CC29E"
                color="white"
              />
              <View style={styles.wrapper}>
                
                  {new_appointment.elements
                  ? <ScrollView
                      contentContainerStyle={styles.scrollContent}
                      // Hide all scroll indicators
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                    >
                    <List>
                      {new_appointment.elements.map((element, index) => 
                        <ListItem
                          key={index}
                          title={element.name}
                          hideChevron={true}
                          onPress={() => {
                            var { new_appointment } = this.state;
                            
                            new_appointment.elements.splice( new_appointment.elements.indexOf(element), 1 );  
                            this.setState({ new_appointment: new_appointment });
                          }}
                        />)
                      }
                      <ListItem
                        title={'+ Element'}
                        hideChevron={true}
                        onPress={() => {
                          const { elements } = this.props;
                          this.props.navigation.navigate('SelectElement', { elements: elements, selectedElement: this.selectedElement.bind(this) });
                        }}
                      />
                    </List>
                    </ScrollView>
                  : null
                }
                {
                  new_appointment && 
                  new_appointment.elements.length > 0
                  ?
                  <View>
                    <View 
                      style={styles.inputWrap}>
                      <Text
                        style={new_appointment && 
                         new_appointment.from_datetime ? styles.input : styles.inputHint }
                        onPress={ () => {
                          const { slot_times } = this.props;
                          this.props.navigation.navigate('SelectDate', { slot_times: slot_times, selectedDate: this.selectedFromDate.bind(this) });
                        }}
                      >{
                        new_appointment && 
                        new_appointment.from_datetime 
                        ?
                        new_appointment.from_datetime 
                        :
                        'Select From Datetime'}</Text>
                    </View>
                    <View 
                      style={styles.inputWrap}>
                      <Text
                        style={new_appointment && 
                         new_appointment.to_datetime ? styles.input : styles.inputHint }
                        onPress={ () => {
                          const { slot_times } = this.props;
                          this.props.navigation.navigate('SelectDate', { slot_times: slot_times, selectedDate: this.selectedToDate.bind(this), fromDateTime: this.state.new_appointment.from_datetime, possibleSlotIds: this.state.new_appointment.possible_slot_ids });
                        }}
                      >{
                        new_appointment && 
                        new_appointment.to_datetime 
                        ?
                        new_appointment.to_datetime 
                        :
                        'Select To Datetime'}</Text>
                    </View>
                  </View>
                  :
                  null
                }
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={this.handlePress}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>{!loading? 'Salvar' : 'Carregando'}</Text>
                  </View>
                </TouchableOpacity>
              </View>
          </View>
        }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingVertical: 10,
  },
  inputWrap: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  inputHint: {
    flex: 1,
    color: '#999',
    paddingHorizontal: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#555555',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});


export default AppointmentScreen;
