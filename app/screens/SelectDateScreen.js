import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import {Agenda} from 'react-native-calendars';

export default class AgendaScreen extends Component {
  render() {
    console.log('AgendaScreen');
    const  slot_times = this.props.navigation.state.params.slot_times ? this.props.navigation.state.params.slot_times : [];
    return (
        <Agenda
          items={slot_times}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={new Date()}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          //markingType={'interactive'}
          //markedDates={{
          //  '2017-05-08': [{textColor: '#666'}],
          //  '2017-05-09': [{textColor: '#666'}],
          //  '2017-05-14': [{startingDay: true, color: 'blue'}, {endingDay: true, color: 'blue'}],
          //  '2017-05-21': [{startingDay: true, color: 'blue'}],
          //  '2017-05-22': [{endingDay: true, color: 'gray'}],
          //  '2017-05-24': [{startingDay: true, color: 'gray'}],
          //  '2017-05-25': [{color: 'gray'}],
          //  '2017-05-26': [{endingDay: true, color: 'gray'}]}}
          // monthFormat={'yyyy'}
          // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        />
    );
  }

  loadItems(day) {
    // var { slot_times } = this.props;
    // const { fromDateTime } = this.props.navigation.state.params;
    // setTimeout(() => {
    //   for (let i = -15; i < 85; i++) {
    //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //     const strTime = this.timeToString(time);
    //     if (!this.state.items[strTime]) {
    //       this.state.items[strTime] = [];
    //       const numItems = Math.floor(Math.random() * 5);
    //       for (let j = 0; j < numItems; j++) {
    //         this.state.items[strTime].push({
    //           name: 'Item for ' + strTime,
    //           height: Math.max(50, Math.floor(Math.random() * 150))
    //         });
    //       }
    //     }
    //   }
    //   console.log(this.state.items);
    //   const newItems = {};
    //   Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
    //   this.setState({
    //     items: newItems
    //   });
    // }, 1000);
    // console.log('before');
    // console.log(fromDateTime);
    // console.log(slot_times);
    // if (fromDateTime) {
    //   slot_times = Object.keys(slot_times).map(key => {
    //     return slot_times[key].filter( ( slot_time ) => {
    //       return Date.parse(slot_time.slot_datetime) > Date.parse(fromDateTime);
    //     });
    //   });
    // }
    // console.log('after');
    // console.log(slot_times);

    // this.setState({ slot_times: slot_times });

    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item]}>
      <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              this.props.navigation.state.params.selectedDate(item);
              this.props.navigation.goBack(null);
            }}
          >
            <Text>
              {item.slot_time}
            </Text>
          </TouchableOpacity>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.slot_time !== r2.slot_time;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    height: 50
  },
  emptyDate: {
    height: 50,
    flex:1,
    paddingTop: 30
  }
});