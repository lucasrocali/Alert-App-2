import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getEvents } from '../actions'
import { RefreshControl } from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Toast, Button, Icon } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

class EventList extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      seenMessage: false
    };
  };
  componentWillMount() {
    const { events, getEvents } = this.props;
    if (!events || events.length == 0) {
      getEvents()
    }
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
  render() {
    const { loading, events, getEvents } = this.props;
    
    return (
       <Container>
        <Content refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => {
                    this.setState({seenMessage:false})
                    getEvents()
                  }}
                />
              }>
          <List>
            {events && events.map((event, index) => 
              <ListItem 
                key={index}
                style= {{ marginLeft: 0 }}
                onPress={() => {
                                console.log('showevent');
                                console.log(event);
                                this.props.navigation.navigate('Event', { ...event } );
                              }}>
                <Body>
                  <Text>{event.category.name}</Text>
                  <Text note>{event.user_name}</Text>

                </Body>
                <Right>
                  <Text note>{event.readable_date}</Text>
                </Right>
              </ListItem>
            )}
          </List>
        </Content>
      </Container>
    );
  }
}


EventList.propTypes = {
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
)(EventList)