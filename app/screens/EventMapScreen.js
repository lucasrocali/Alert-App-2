import React, { Component, PropTypes } from 'react';
import { MapView, Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import { loadEvents } from '../actions'
import * as selectors from '../reducers/reducers';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

class EventMap extends Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      locationResult: null,
      location: null,
    }
  }

  componentDidMount() {
    const { events, loadEvents } = this.props;
    if (!events || events.length == 0) {
      loadEvents()
    }
    this.getLocationAsync();
  }

  async getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location });
  };

  showEventScreen(event) {
    this.props.navigation.navigate('Event', { ...event } )
  }

  renderEventMarker(event) {
    return (
      <MapView.Marker
        key={event.id}
        coordinate= { { latitude: event.location.lat, longitude: event.location.lon } }
        onPress={() => this.showEventScreen(event)}
      />
    )
  }

  getRegion() {
    const { location } = this.state;
    return location && { 
      latitude: location.coords.latitude, 
      longitude: location.coords.longitude, 
      latitudeDelta: 0.0922, 
      longitudeDelta: 0.0421 
    }
  }

  render() {
    const { events } = this.props;
    return (
      <MapView
        style={{ flex: 1 }}
        region={this.getRegion()} >
        {events && events.map((event) => this.renderEventMarker(event))}
      </MapView>
    );
  }
}


EventMap.propTypes = {
  events: PropTypes.array,

  loadEvents: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    events: selectors.getEvents(state)
  }),
  { loadEvents }
)(EventMap)