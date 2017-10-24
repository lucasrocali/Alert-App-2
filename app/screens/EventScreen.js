import React, { Component, PropTypes } from 'react';
import { Constants, MapView, Location, Permissions } from 'expo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveEvent, getCategories, getTags, getEvents } from '../actions'
import { Container, Header, Content, Form, Item, Input, Label, Toast, Button, Text, Picker, Left } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

class Event extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      locationResult: null,
      location: {coords: { latitude: 37.78825, longitude: -122.4324}},
      seenMessage: false,
      selected_category_index: undefined,
      selected_tag_index: undefined
    };
  }
  componentWillMount() {
    const { categories, getCategories , tags, getTags } = this.props;
    if (!categories || categories.length == 0) {
      getCategories()
    }
    if (!tags || tags.length == 0) {
      getTags()
    }
  }
  onCategoryChange(index: string) {
    console.log('onCategoryChange' + index)
    this.setState({selected_category_index: index});
  }
  onTagChange(index: string) {
    console.log('onCategoryChange' + index)
    this.setState({selected_tag_index: index});
  }
  componentDidMount() {
    this._getLocationAsync();
  }

  componentDidUpdate() {
    const { success, message, getEvents } = this.props;
    if (success) {
      getEvents();
      this.props.navigation.navigate('Events');
    } else if (message && !this.state.seenMessage) {
      this.setState({seenMessage:true})
      Toast.show({
              text: message,
              position: 'bottom',
              buttonText: 'Ok'
            })
    }
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

  render() {
    console.log(this.props.navigation.state);
    const event = this.props.navigation.state.params;
    console.log(event);

    const { loading, categories, tags, saveEvent } = this.props;
    
    return (
       <Container style= {{ backgroundColor: '#FFF' }}>
       {event ?
        <Content padder>
        <Spinner visible={loading} textStyle={{color: '#FFF'}} />
          
          <Form>
            <Item stackedLabel>
              <Label>Category</Label>
              <Input disabled
                value = {event.category.name}
                onChangeText={(text) => this.setState({email:text})} />
            </Item>
            <Item stackedLabel>
              <Label>User</Label>
              <Input disabled
                value = {event.user_name}
                onChangeText={(text) => this.setState({password:text})} />
            </Item>
          </Form>
          <Button primary block style= {{ margin: 10 }} onPress={()=> {
                                                          // this.props.navigation.navigate('Main');
                                                          // this.setState({seenMessage:false})
                                                          // login(this.state.email, this.state.password);
                                                        }}>
            <Text>Edit</Text>
          </Button>
        </Content>
        : 
        <Content padder>
          <Item stackedLabel>
              <Label>Category</Label>
              <Picker 
                  mode="dropdown"
                  placeholder="Select Category"
                  selectedValue={this.state.selected_category_index}
                  onValueChange={this.onCategoryChange.bind(this)}>
                  { categories && categories.map((category, index) => 
                                <Item key={index} label={category.name} value={index} />
                  )}
                  
              </Picker>
          </Item>
          <Item stackedLabel>
              <Label>Tags</Label>
              <Picker 
                  mode="dropdown"
                  placeholder="Select Category"
                  selectedValue={this.state.selected_tag_index}
                  onValueChange={this.onTagChange.bind(this)}>
                  { tags && tags.map((tag, index) => 
                                <Item key={index} label={tag.name} value={index} />
                  )}
                  
              </Picker>
          </Item>
          <MapView
            style={{ alignSelf: 'stretch', height: 200, marginTop: 20 }}
            region={ { latitude: event ? event.location.lat : this.state.location.coords.latitude, longitude: event ? event.location.lon : this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } }
            onRegionChange={this._handleMapRegionChange}>
          
            <MapView.Marker
              coordinate={ { latitude: event ? event.location.lat : this.state.location.coords.latitude, longitude: event ? event.location.lon : this.state.location.coords.longitude } }
              title={ event ? event.category.name : 'My Location' }
              description="Some description"
            />
       
          </MapView>
          <Button primary block style= {{ margin: 10 }} onPress={()=> {
                                                          console.log('Save');
                                                          this.setState({seenMessage:false})
                                                          saveEvent(this.state.location.coords.latitude, this.state.location.coords.longitude, categories[this.state.selected_category_index], tags[this.state.selected_tag_index])
                                                          // this.props.navigation.navigate('Main');
                                                          // this.setState({seenMessage:false})
                                                          // login(this.state.email, this.state.password);
                                                        }}>
            <Text>Save</Text>
          </Button>
        </Content> 
        }
      </Container>
      
    );
  }
}

Event.propTypes = {
  // data
  message: PropTypes.string,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  categories: PropTypes.array,
  tags: PropTypes.array,

  // actions
  saveEvent: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  getTags: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    message: state.reducers.new_event.message,
    loading: state.reducers.new_event.loading,
    success: state.reducers.new_event.success,
    categories: state.reducers.categories.categories,
    tags: state.reducers.tags.tags
  }),
  { saveEvent, getCategories, getTags, getEvents }
)(Event)