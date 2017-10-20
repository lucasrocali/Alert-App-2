import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';
import StatusBarAlert from 'react-native-statusbar-alert';
import { Tile, List, ListItem } from 'react-native-elements';

import { connect } from 'react-redux';

import store from '../store'

const { width, height } = Dimensions.get("window");

@connect(
  state => ({
    currentScreen: state.currentScreen,
    features: state.features,
    loading: state.loading,
    message: state.message,
    success: state.success
  })
)
class ElementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_element: {
        name:"",
        element_info_attributes: {
          photo_url:"url.com"
        },
        element_feature_option_attributes:{
          selected_feature_option_ids: {}
        },
        selected_feature_options: {}
      }
    };
  }
  
  handlePress = () => {
    console.log('Save');
    console.log(this.state);
    if (this.state && this.state.new_element.name && this.state.new_element.element_info_attributes && this.state.new_element.element_feature_option_attributes ) {
      store.dispatch({type: 'CREATE_ELEMENT',new_element: this.state.new_element });
    }
    //this.props.navigation.navigate('Main');
    // this.props.navigation.goBack(null);
  };

  componentWillMount() {
    const { features, loading } = this.props;
    if (!features) {
      console.log('GET FEATURES');
      store.dispatch({type: 'GET_FEATURES'});
    }
  }
  // static navigationOptions = ({ navigation }) => {
  //     const { state } = navigation;
  //     const { renderHeaderRight } = state.params;
  //     return {
  //         headerRight: renderHeaderRight && renderHeaderRight()
  //     }
  // };

  // componentWillMount() {
  //     this.props.navigation.setParams({
  //         renderHeaderRight: () => <Button title={"Save"} onPress={() => console.log('Save!')} />
  //     });
  // }
  returnData(feature_id,feature_option) {
    feature_id = parseInt(feature_id);
    console.log('returnData');
    console.log(feature_id);
    console.log(feature_option);
    var { new_element } = this.state;
    console.log(new_element);
    new_element.element_feature_option_attributes.selected_feature_option_ids[feature_id] = feature_option.id.toString();
    new_element.selected_feature_options[feature_id] = feature_option;
    console.log(new_element);
    this.setState({ new_element: new_element });
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    console.log(this.props);
    const { message, currentScreen, success } = this.props;
    if (success && currentScreen == 'element') {
      store.dispatch({type: 'GET_ELEMENTS'});
      this.props.navigation.goBack(null);
    }
  }

    
  render() {
    console.log(this.props);
    console.log(this.state);
    console.log('Navigation props - Element');
    console.log(this.props.navigation.state);
    const { element } = this.props.navigation.state.params;
    const { features, loading, message, success } = this.props;

    const { new_element } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
        {
          element ?
          <View style={styles.wrapper}>
            <View 
              style={styles.inputWrap}>
              <Text
                style={styles.input}
              >{ element.name }</Text>
            </View>
            {
              element.element_feature_option &&
              element.element_feature_option.feature_options ?
              element.element_feature_option.feature_options.map((feature_option, index) => 
              <View 
                style={styles.inputWrap}
                key={index}>
                <Text
                  key={index}
                  style={styles.input}
                >{ feature_option.name }</Text>
              </View>
              )
              : null
            }
          </View>
          :
          <View>
            <StatusBarAlert
              visible={message != null}
              message= { message}
              backgroundColor="#3CC29E"
              color="white"
            />
            <View style={styles.wrapper}>
              <View style={styles.inputWrap}>
                <TextInput
                  placeholder="Nome"
                  placeholderTextColor="#999"
                  style={styles.input}
                  onChangeText={text => {
                    new_element.name = text;
                    this.setState({ new_element: new_element });
                  }}
                  value={ element && element.name }
                />
              </View>
              <View style={styles.inputWrap}>
                <TextInput
                  placeholderTextColor="#999"
                  placeholder="Raça"
                  style={styles.input}
                  onChangeText={text => this.setState({ password: text })}
                />
              </View>
              { features ?
                features.map((feature, index) => 
                <View 
                  style={styles.inputWrap}
                  key={index}>
                  <Text
                    key={index}
                    style={new_element && 
                     new_element.selected_feature_options &&
                     new_element.selected_feature_options[feature.id] ? styles.input : styles.inputHint }
                    onPress={ () => {
                      console.log('On Select');
                      this.props.navigation.navigate('SelectFeatureOption', { ...feature, returnData: this.returnData.bind(this) });
                    }}
                  >{ new_element && 
                     new_element.selected_feature_options &&
                     new_element.selected_feature_options[feature.id] 
                     ? new_element.selected_feature_options[feature.id].name
                     : feature.name }</Text>
                </View>
                )
                :
                null
              }
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.handlePress}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: 'row',
    margin: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  inputHint: {
    flex: 1,
    color: '#999',
    paddingHorizontal: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#555555',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default ElementScreen;
