import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { LabelWrapper, Required } from '../../assets/StyledComponents';

class Label extends Component <{}>{
	render(){
		return(
			<LabelWrapper>
				<Text>{this.props.labelTitle} </Text>
				{
					this.props.required?
						<Required>*</Required>
					:null
				}
			</LabelWrapper>
		)
	}
}

export default Label;