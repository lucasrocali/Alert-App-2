import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../actions'
import { RefreshControl } from 'react-native'
import { Container, Content, List, ListItem, Body, Right, Text } from 'native-base';

class EventList extends Component {

  showEventScreen(event) {
    this.props.navigation.navigate('Event', { ...event } )
  }

  renderRefreshControl() {
    const { getEvents } = this.props;
    return (
      <RefreshControl
        refreshing={false}
        onRefresh={ () => getEvents() }
      />
    )
  }

  renderEventItem(event) {
    return (
      <ListItem 
        key={event.id}
        style= {{ marginLeft: 0 }}
        onPress={() => this.showEventScreen(event)} >
        <Body>
          <Text>{event.category.name}</Text>
          <Text note>{event.user_name}</Text>
        </Body>
        <Right>
          <Text note>{event.readable_date}</Text>
        </Right>
      </ListItem>
    )
  }
  
  render() {
    const { events } = this.props;
    return (
       <Container>
        <Content refreshControl={this.renderRefreshControl()}>
          <List>
            {events && events.map((event) => this.renderEventItem(event)) }
          </List>
        </Content>
      </Container>
    );
  }
}


EventList.propTypes = {
  events: PropTypes.array,

  getEvents: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    events: state.reducers.events,
  }),
  { getEvents }
)(EventList)