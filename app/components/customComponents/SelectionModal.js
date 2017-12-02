import { Modal, Text, View} from 'react-native';
import React, { Component } from 'react';
import Styles from '../../assets/styles/appStyle';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {
	ModalCustomButton,
	ModalWrapper,
	SelectBoxView,SelectData,
	FeedbackBtnLabel,
	CategoryWrapper,
	SelectBox } from '../../assets/StyledComponents';

class SelectionModal extends Component<{}>{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	category:false,
	  	categories:this.props.data,
	  	isModalOpen:false,
	  	selectedCategory:this.props.selectedCategory
	  };
	}
	componentWillReceiveProps(nextProps) {
	  if(this.props.data != nextProps.data){
	  	this.setStateData('data',nextProps.data);
	  }
	  if(this.props.selectedCategory != nextProps.selectedCategory){
	  	this.setStateData('selectedCategory',nextProps.selectedCategory);
	  }
	}
	setStateData(name,data){
		if(name == 'data') this.setState({categories:data});
		else if(name == 'selectedCategory'){
			this.setState({selectedCategory:data});
		}
	}
	setSelectedData(category){
		this.props.setCategory(category);
		this.setState({isModalOpen:false, category:category})
	}

	render(){
		const { categories, isModalOpen } = this.state;
		return(
			<View style={{alignItems:'center'}}>
				<CategoryWrapper accessibilityLabel="category_selectbox"
					onPress={()=>{this.setState({isModalOpen:true});}}>
					<SelectBox>{this.state.category}</SelectBox>
					<IonIcon name="md-arrow-dropdown" size={20} 
						style={{position:'absolute',right:10}}/>
				</CategoryWrapper>
				<Modal
					onRequestClose={()=>{console.log('close')}}
					visible={isModalOpen}
					style={Styles.modalContainer}
					animationType="slide"
	        transparent>
				 <ModalWrapper>
	        <ModalCustomButton accessibilityLabel="cancel_selectbox"
	        	onPress={()=>this.setState({isModalOpen:false})}>
	      		<FeedbackBtnLabel>Cancel</FeedbackBtnLabel>
	        </ModalCustomButton>
					<SelectBoxView>
						{
							categories.map((category, index)=>{
							return(
									<SelectData accessibilityLabel="categories" key={index}
										onPress={()=>{this.setSelectedData(category)}}>
										<Text style={{ color:this.state.selectedCategory ==category? 'red':'#000', textAlign:'center'}}>
											{category}
										</Text>
									</SelectData>
								)
							})
						}
					</SelectBoxView>
					</ModalWrapper>
				</Modal>
			</View>
		)
	}
}

export default SelectionModal;