import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Constants } from 'expo';

export default class SelectElementScreen extends Component {
  render() {
    const  elements = this.props.navigation.state.params.elements ? this.props.navigation.state.params.elements : [];
    return (

      <View style={styles.container}>
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
          <List>
            {elements.map((element, index) => 
              <ListItem
                key={index}
                title={element.name}
                subtitle={element.element_feature_option &&
                          element.element_feature_option.feature_options ?
                          element.element_feature_option.feature_options.map(function(feature_option){
                              return feature_option.name;
                          }).join(", ")
                          :''}
                onPress={() => {
                  console.log('Selected '+element.name);
                  this.props.navigation.state.params.selectedElement(element);
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