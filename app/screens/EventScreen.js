import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, TextInput, Button, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import StatusBarAlert from 'react-native-statusbar-alert';

import store from '../store'

@connect(
  state => ({
    loading: state.loading,
    message: state.message
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_EVENTS'}),
  }),
)
export default class App extends Component {
  state = {
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    inputValue: "Buscar",
    category: null,
    tags: [],
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    console.log("_handleMapRegionChange ");
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location), location, });
 };

  locationChanged = (location) => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.005,
    },
    this.setState({location, region})
  }

  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  _handleSearchButtonPress = () => {
    Alert.alert(
      'Button Search!',
      'You did it!',
    );
  };
  
  _handleCreateBtnPress = () => {
    console.log("_handleCreateBtnPress");
    if (this.state.category != null){
      store.dispatch({type: 'CREATE_EVENT', lat: this.state.location.coords.latitude, lon: this.state.location.coords.longitude, category: this.state.category, tags: this.state.tags });
    }
    
  };
  _handleUpVoteBtnPress = () => {
    console.log("_handleStrengthVoteBtnPress");
    const event = this.props.navigation.state.params;
    store.dispatch({type: 'SET_STRENGTH', event_id: event.id, up_down: 1 });
  };

  _handleDownVoteBtnPress = () => {
    console.log("_handleStrengthVoteBtnPress");
    const event = this.props.navigation.state.params;
    store.dispatch({type: 'SET_STRENGTH', event_id: event.id, up_down: 0 });
  };

  returnCategory(category) {
    this.setState({ category: category });
  }

  returnTags(tags) {
    console.log('returnTags');
    console.log(tags);
    this.setState({ tags: tags});
  }

  render() {
    const { loading, message } = this.props;

    const event = this.props.navigation.state.params;
    console.log('render event');
    console.log(this.props);
    const create = event ? false : true;
    return (
      <View style={styles.container}>
        <StatusBarAlert
              visible={message != null}
              message= { message}
              backgroundColor="#3CC29E"
              color="white"
          />
        <ScrollView>
          <Text style={styles.title}> Category </Text>
          <Text 
            style={styles.input}
            onPress={() => {
              if (create) {
                console.log('On Select Category');
                console.log(this.props);
                this.props.navigation.navigate('SelectCategory', {returnCategory: this.returnCategory.bind(this)});
              }
            }}> { event ? event.category.name : this.state.category ? this.state.category.name : 'Select Category' } </Text>
          
          <Text style={styles.title}> Location </Text>

          { false ? 

            <View>
          
              <TextInput
                value={this.state.inputValue}
                onChangeText={this._handleTextChange}
                style={{ width: 100, height: 44, padding: 8 }}
              />
            
              <TouchableOpacity activeOpacity={.5} onPress={this._handleSearchButtonPress}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{'Buscar'}</Text>
                </View>
              </TouchableOpacity> 

            </View>

            :
            null

         }
          
          <MapView
            style={{ alignSelf: 'stretch', height: 200 }}
            region={ { latitude: event ? event.location.lat : this.state.location.coords.latitude, longitude: event ? event.location.lon : this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } }
            onRegionChange={this._handleMapRegionChange}

            >
          
            <MapView.Marker
              coordinate={ { latitude: event ? event.location.lat : this.state.location.coords.latitude, longitude: event ? event.location.lon : this.state.location.coords.longitude } }
              title={ event ? event.category.name : 'My Location' }
              description="Some description"
            />
       
          </MapView>
        
          <Text style={styles.title}> Tags </Text>
          <Text style={styles.input}
                onPress={() => {
                    if (create) {
                      console.log('On Select Tags');
                      console.log(this.props);
                      this.props.navigation.navigate('SelectTags', {returnTags: this.returnTags.bind(this)});
                    }
                  }}> { event ? event.event_tags.map(event_tag => event_tag.tag.name).toString() : this.state.tags.length > 0 ? this.state.tags.map(tag => tag.name).toString() : 'Select Tags' } </Text>

           { create ? 
          
            <TouchableOpacity activeOpacity={.5} onPress={this._handleCreateBtnPress}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{!loading? 'Create' : 'Loading'}</Text>
              </View>
            </TouchableOpacity>

            :
            <View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Text style={styles.text}> Up { event.up_count }</Text>
                <Text style={styles.text}> Down { event.down_count }</Text>
              </View>
              <View>
                <TouchableOpacity activeOpacity={.5} onPress={this._handleUpVoteBtnPress}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>{!loading? 'Reforçar' : 'Loading'}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.5} onPress={this._handleDownVoteBtnPress}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>{!loading? 'Denuciar' : 'Loading'}</Text>
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
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    padding: 5,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#34495e',
    backgroundColor: '#ecf0f1',
  },
  button: {
    backgroundColor: "#555555",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  input: {
    padding: 5,
    fontSize: 16,
    textAlign: 'center',
    color: '#34495e',
  },
  text: {
    flex:1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  }
});