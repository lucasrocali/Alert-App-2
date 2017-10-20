import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Dimensions
} from 'react-native';

import Picker from 'react-native-picker';

export default class PickerScreen extends Component {

	constructor(props, context){
		super(props, context);
		this.state = {
			pickerData: ['Nick','Branca'],
      		selectedValue: ['Branca']
		};
	}

	_onPressHandle(){
		this.picker.toggle();
	}

	render(){
		return (
			<View style={{height: Dimensions.get('window').height}}>
				<TouchableOpacity style={{marginTop: 20}} onPress={this._onPressHandle.bind(this)}>
					<Text>Select</Text>
				</TouchableOpacity>
				<Picker
					ref={picker => this.picker = picker}
					style={{height: 320}}
					showDuration={300}
					pickerData={this.state.pickerData}
					selectedValue={this.state.selectedValue}
					onPickerDone={(pickedValue) => {
						console.log(pickedValue);
					}}
				/>
			</View>
		);
	}
};