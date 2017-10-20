import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { List, ListItem } from 'react-native-elements'; // 0.17.0
import { Constants } from 'expo';

export default class SelectFeatureOptionScreen extends Component {
  render() {
    console.log('render');
    console.log(this.props.navigation.state.params);
    const feature = this.props.navigation.state.params;

    var feature_options = feature ? feature.feature_options : [];
    return (

      <View style={styles.container}>
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
          <List>
            {feature_options.map((feature_option, index) => 
              <ListItem
                key={index}
                title={feature_option.name}
                onPress={() => {
                  console.log('Selected '+feature_option.name);
                  this.props.navigation.state.params.returnData(feature.id,feature_option);
                  this.props.navigation.goBack(null);
                }}
              />)}
            
          </List>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 loader: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
  }
});