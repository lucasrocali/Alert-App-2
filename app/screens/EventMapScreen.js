import React, { Component, PropTypes } from 'react';
import { Constants, MapView, Location, Permissions } from 'expo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getEvents } from '../actions'
import { RefreshControl } from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Toast, Button, Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

class EventMap extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      seenMessage: false,
      locationResult: null,
      location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    };
  };
  componentWillMount() {
    const { events, getEvents } = this.props;
    if (!events || events.length == 0) {
      getEvents()
    }
    this.getLocationAsync();
  }
  componentDidUpdate() {
    const { message } = this.props;
    if (message && !this.state.seenMessage) {
      this.setState({seenMessage:true})
      Toast.show({
              text: message,
              position: 'bottom',
              buttonText: 'Ok'
            })
    }
  }
  handleMapRegionChange = mapRegion => {
    console.log("handleMapRegionChange ");
  };

  getLocationAsync = async () => {
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
  render() {
    const { loading, events } = this.props;
    
    return (
      <MapView
          style={{ flex: 1 }}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          onRegionChange={this.handleMapRegionChange}
        >
         
         {events && events.map((event) => 
             <MapView.Marker
              key={event.id}
              coordinate= { { latitude: event.location.lat, longitude: event.location.lon } }
              title= { event.category.name }
              description="Some description"
              onPress={() => this.showEvent(event)}
            />
          )}
        </MapView>
    );
  }
}


EventMap.propTypes = {
  // data
  message: PropTypes.string,
  loading: PropTypes.bool,
  events: PropTypes.array,

  // actions
  getEvents: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    message: state.reducers.events.message,
    loading: state.reducers.events.loading,
    events: state.reducers.events.events,
  }),
  { getEvents }
)(EventMap)