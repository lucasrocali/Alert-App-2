import React, { Component, PropTypes } from 'react';
import { MapView, Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import { saveEvent, loadCategories, loadTags, loadEvents } from '../actions'
import { Container, Content, Item, Input, Label, Toast, Button, Text, Picker, Left } from 'native-base';
import * as selectors from '../reducers/reducers';

class Event extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      locationResult: null,
      location: null,
      selected_category_index: undefined,
      selected_tag_index: undefined,
      comment: undefined
    };
  }

  componentDidMount() {
    const { categories, loadCategories , tags, loadTags } = this.props;
    if (!categories || categories.length == 0) {
      loadCategories()
    }
    if (!tags || tags.length == 0) {
      loadTags()
    }
    this.getLocationAsync();
  }

  onCategoryChange(index: string) {
    this.setState({selected_category_index: index});
  }

  onTagChange(index: string) {
    this.setState({selected_tag_index: index});
  }

  componentDidUpdate() {
    const { success, loadEvents } = this.props;
    if (success) {
      loadEvents();
      this.props.navigation.navigate('Events');
    }
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
   this.setState({ locationResult: JSON.stringify(location), location, });
 };

  locationChanged(location) {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.005,
    },
    this.setState({location, region})
  }

  getRegion(event = null) {
    const { location } = this.state;
    const lat = event ? event.location.lat : location ? location.coords.latitude : null
    const lon = event ? event.location.lon : location ? location.coords.longitude : null
    return lat && lon && { 
      latitude: lat, 
      longitude: lon, 
      latitudeDelta: 0.0922, 
      longitudeDelta: 0.0421 
    }
  }

  getCoordinate(event = null) {
    const { location } = this.state;
    const lat = event ? event.location.lat : location ? location.coords.latitude : null
    const lon = event ? event.location.lon : location ? location.coords.longitude : null
    return lat && lon && { 
      latitude: lat, 
      longitude: lon
    }
  }

  handleMarkerChanged(e) {
    this.setState({ location: { coords: e.nativeEvent.coordinate } })
  }

  handleSaveEventBtn() {
    const { categories, tags, saveEvent } = this.props;

    const { location, selected_category_index, selected_tag_index, comment } = this.state

    const category = categories[selected_category_index]
    const tag = tags[selected_tag_index]

    if (category == null) {
      Toast.show({
                  text: "Select a category",
                  position: 'bottom',
                  buttonText: 'Ok'
                })
      
    } else  if (tag == null){
      Toast.show({
                  text: "Select a tag",
                  position: 'bottom',
                  buttonText: 'Ok'
                })
    } else {
      saveEvent({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        category: category,
        tag: tag,
        comment: comment,
      })
    }
  }

  renderViewEvent(event) {
    return (
      <Content padder>
        <Item stackedLabel>
          <Label>User</Label>
          <Input disabled
            value = {event.user_name} />
        </Item>
        <Item stackedLabel>
          <Label>Category</Label>
          <Input disabled
            value = {event.category.name} />
        </Item>
        <MapView
          style={ { alignSelf: 'stretch', height: 200, marginTop: 20 } }
          region={ this.getRegion(event) } >

          <MapView.Marker
            coordinate= { this.getCoordinate(event) }
            title= { event.category.name }
            description = { event.user_name } />
        </MapView>
      </Content>
    )
  }

  renderPickerItem(item,index) {
    return (
      <Item key={index} label={item.name} value={index} />
    )
  }

  renderCreateEvent() {
    const { categories, tags } = this.props;
    return (
      <Content padder>
        <Item stackedLabel>
          <Label>Category</Label>
          <Picker 
              mode="dropdown"
              placeholder="Select Category"
              selectedValue={this.state.selected_category_index}
              onValueChange={this.onCategoryChange.bind(this)} >

              { categories && categories.map((category, index) => this.renderPickerItem(category,index))}
              
          </Picker>
        </Item>
        <Item stackedLabel>
          <Label>Tags</Label>
          <Picker 
              mode="dropdown"
              placeholder="Select Category"
              selectedValue={this.state.selected_tag_index}
              onValueChange={this.onTagChange.bind(this)} >

              { tags && tags.map((tag, index) => this.renderPickerItem(tag,index))}
              
          </Picker>
        </Item>
        <MapView
          style={{ alignSelf: 'stretch', height: 200, marginTop: 20 }}
          region={this.getRegion()} >
        
          <MapView.Marker draggable
            coordinate= { this.getCoordinate() }
            onDragEnd={(e) => this.handleMarkerChanged(e) }
          />

        </MapView>
        <Item stackedLabel>
          <Label>Comment</Label>
          <Input onChangeText={(text) => this.setState({comment:text})} />
        </Item>
        <Button primary block style= {{ margin: 10 }} onPress={this.handleSaveEventBtn.bind(this)}>
          <Text>Save</Text>
        </Button>
      </Content>
    )
  }

  render() {
    const event = this.props.navigation.state.params;
    return (
      <Container style= {{ backgroundColor: '#FFF' }}>
        {event ? this.renderViewEvent(event) : this.renderCreateEvent() }
      </Container>
      
    );
  }
}

Event.propTypes = {
  // data
  success: PropTypes.bool,
  categories: PropTypes.array,
  tags: PropTypes.array,

  // actions
  saveEvent: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  loadTags: PropTypes.func.isRequired,
  loadEvents: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    success: selectors.isEventCreated(state),
    categories:selectors.getCategories(state),
    tags: selectors.getTags(state)
  }),
  { saveEvent, loadCategories, loadTags, loadEvents }
)(Event)