import React, { Component } from 'react';
import { StatusBar, ActivityIndicator } from 'react-native';
import StarRating from 'react-native-star-rating';
import Notification from './customComponents/Notification';
import SelectionBox from './customComponents/SelectionModal';
import Label from './customComponents/Label';
import {USERS, CATEGORIES} from '../constant/constants';
import { CustomButton, FeedbackBtnLabel,FeedBack, ViewContainer,Title,HeaderTitle,
Container, HeaderWrapper, UserWrapper,UserSelection,User,RatingWrapper} from '../assets/StyledComponents';

class FeedBackForm extends Component <{}> {
	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	feedback:'',
	   	rating:0,
	   	categoryModalIsOpen:false,
	   	category:null,
	   	user:null,
	   	backgroundColor:null,
	   	message:null,
	   }
	}

	componentWillReceiveProps(nextProps) {
	  if(this.props != nextProps){
	  	if(nextProps.errorMessage){
	  		this.setToastMessage(nextProps.errorMessage,'red')
	  	}else if(nextProps.successMessage && nextProps.isSuccess){
	  		this.setToastMessage(nextProps.successMessage, 'green')
	  	}
	  }
	}

	hideToast(){
		setTimeout(() => this.setState({visible:false}),2500);
	}
	setToastMessage(message, bgcolor){
		this.setState({visible:true, backgroundColor:bgcolor, message:message});
	  this.hideToast();
	}

	setRating(value){
		this.setState({rating:value});
	}

	setCategory(value){
		this.setState({category:value})
	}
	
	sendEmail(){
		const {user, rating, category, feedback} = this.state;
		let errorMessage = null;
		let FeedbackData = {user:user,rating:rating,category:category, feedback:feedback};
		this.props.sendEmail(FeedbackData);
	}
	render(){
		const { rating } = this.state;
		return(
		<Container>
			<StatusBar barStyle="light-content"/>
			<HeaderWrapper >
				<HeaderTitle accessibilityLabel ='title'>Mäd</HeaderTitle>
			</HeaderWrapper>
		<ViewContainer>
			<Title>{'Feedback Form'.toUpperCase()}</Title>
			<Label labelTitle="Who are you?" required={true} />
			<Notification bgcolor={this.state.backgroundColor} message={this.state.message} visible={this.state.visible} />
			<UserWrapper>
				{
					USERS.map((user,index)=>(
						<UserSelection key={index} accessibilityLabel="Users" onPress={()=>{this.setState({user:user.value})}} 
							style={{backgroundColor: this.state.user == user.value ? 'red' : 'transparent'}}>
							<User style={{color: this.state.user ==user.value?'#fff':'red'}}>{user.label}</User>
						</UserSelection>
					))
				}
			</UserWrapper>

			<Label labelTitle="Category Selection" required={true} />
			<SelectionBox data={CATEGORIES} selectedCategory={this.state.category} 
				setCategory={(data)=>this.setCategory(data)}
			/>

			<Label labelTitle="Rating" required={true} />
			<RatingWrapper>
				<StarRating
					accessibilityLabel="rating"
					emptyStarColor='red'
					style={{width:200}}
	        disabled={false}
	        maxStars={5}
	        rating={this.state.rating}
	        selectedStar={(rating) => this.setRating(rating)}
	        starColor={'red'}
     		 />
      </RatingWrapper>
      <Label labelTitle="Opinion" />
			<FeedBack accessibilityLabel="feedback" placeholder='Feedback' multiline={true}
				onChangeText={(text)=>this.setState({feedback:text})}/>
			
			<CustomButton accessibilityLabel="send_button" onPress={()=>this.sendEmail()}>
				<FeedbackBtnLabel>Send</FeedbackBtnLabel>
			</CustomButton>
		</ViewContainer>
		</Container>
	)}
}

export default FeedBackForm;