import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadEvents } from '../actions'
import { RefreshControl } from 'react-native'
import { Container, Content, List, ListItem, Body, Right, Text } from 'native-base';
import * as selectors from '../reducers/reducers';

class EventList extends Component {

  showEventScreen(event) {
    this.props.navigation.navigate('Event', { ...event } )
  }

  renderRefreshControl() {
    const { loadEvents } = this.props;
    return (
      <RefreshControl
        refreshing={false}
        onRefresh={ () => loadEvents() }
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
          <Text note>{`${event.up_count} ups and ${event.down_count} downs`}</Text>
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

  loadEvents: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    events: selectors.getEvents(state)
  }),
  { loadEvents }
)(EventList)