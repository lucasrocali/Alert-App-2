import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { List, ListItem } from 'react-native-elements'; // 0.17.0
import { NavigationActions } from "react-navigation";
import StatusBarAlert from 'react-native-statusbar-alert';

import { Constants } from 'expo';

import { connect } from 'react-redux';

import store from '../store'

@connect(
  state => ({
    currentScreen: state.currentScreen,
    tags: state.tags,
    loading: state.loading,
    message: state.message,
    success: state.success
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_TAGS'}),
  }),
)

export default class SelectTagsScreen extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      new_tag_name: "",
      selected_tags: [],
    };
  }
  componentWillMount() {
    console.log('componentWillMount');
    store.dispatch({type: 'GET_TAGS'});
  }
  handleAddPress = () => {
    console.log('handleAddPress');
    if (this.state.new_tag_name != "") {
      store.dispatch({type: 'CREATE_TAG', tag_name: this.state.new_tag_name});
    }
  };
  handleDonePress = () => {
    console.log('handleDonePress');
    this.props.navigation.state.params.returnTags(this.state.selected_tags);
    this.props.navigation.goBack(null);
  };
  
  componentDidUpdate() {
    console.log("componentDidUpdate");
    console.log(this.props);
    const { success, message, currentScreen, loading } = this.props;

    if (success && currentScreen == 'tags' && !loading) {
      this.setState({new_tag_name:""});
      store.dispatch({type: 'GET_TAGS'});
    }
  }
  render() {
    const { tags, loading, refresh, message, success } = this.props;
    console.log('PROPS');
    console.log(this.props);
    return (

      <View style={styles.container}>
        <StatusBarAlert
              visible={message != null}
              message= { message}
              backgroundColor="#3CC29E"
              color="white"
          />
        {tags ? <ScrollView
              contentContainerStyle={styles.scrollContent}
              // Hide all scroll indicators
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={refresh}
                />
              }
            >
            <View style={{flexDirection: 'row', flex: 1, paddingTop:20, paddingRight:20, paddingLeft:20}}>
              <View style={styles.inputWrap}>
                <TextInput 
                  placeholder="New Tag" 
                  placeholderTextColor="#333"
                  style={styles.input} 
                  onChangeText={(text) => this.setState({new_tag_name:text})}
                />
              </View>
              <TouchableOpacity activeOpacity={.5} onPress={this.handleAddPress}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{!loading? 'Add' : '...'}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <List>
              {tags.map((tag, index) => 
                <ListItem
                  key={index}
                  title={tag.name}
                  subtitle={this.state.selected_tags.includes(tag) ? 'Selected' : ''}
                  onPress={() => {
                    var selected_tags = this.state.selected_tags;
                    if (this.state.selected_tags.includes(tag)) {
                       this.state.selected_tags.splice( this.state.selected_tags.indexOf(tag), 1 );  
                    } else {
                      this.state.selected_tags.push(tag);
                    }
                    this.setState({selected_tags:selected_tags});
                    // if (this.state.selected_tags.some((e) => e.id == tag.id)) {
                    //   console.log('has '+tag.id)
                      
                    // } else {
                    //   console.log('does not has '+tag.id)
                    //   this.state.selected_tags.push(tag);
                    // }
                    // this.setState({selected_tags:selected_tags});
                    // } else {
                    //   // this.state.selected_tags.push(tag);
                    // }
                  }}
                />)}
              
            </List>
            </ScrollView>
            :
            <ActivityIndicator
                animating={loading}
                style={styles.loader}
                size="large"
              />
        }
        <TouchableOpacity activeOpacity={.5} onPress={this.handleDonePress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{'Done'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

// <View style={styles.inputWrap}>
//             <TextInput 
//               placeholder="New Tag" 
//               placeholderTextColor="#333"
//               style={styles.input} 
//               onChangeText={(text) => this.setState({email:text})}
//             />
//           </View>
//           <TouchableOpacity activeOpacity={.5} onPress={this.handleDonePress}>
//             <View style={styles.button}>
//               <Text style={styles.buttonText}>{'Add'}</Text>
//             </View>
//           </TouchableOpacity>
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrap: {
    flex:1,
    flexDirection: "row",
    margin: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#555555",
    paddingVertical: 10,
    alignItems: "center",
    margin: 10,
    padding: 10
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
 loader: {
    flex: 1,
    alignItems: 'center',     // center horizontally
    justifyContent: 'center', // center vertically
  },
  text: {
    flex:1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  }
});