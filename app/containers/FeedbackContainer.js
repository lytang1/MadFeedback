import React, { Component } from 'react';
import {
	View,
	Text,
	Platform
} from 'react-native';
import styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';
import FeedBackForm from '../components/FeedBackForm';

import { connect } from 'react-redux';
import {sendMail} from '../actions/FeedbackEmail';
import { bindActionCreators } from 'redux';

const CATEGORIES = ['Quality','Speed','Value','Creativity','Strategy'];

const Container = styled.View`
	width:100%;
	flex:1;
`;
class FeedBackContainer extends Component <{}> {
	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	errorMessage:null,
	   	successMessage:null,
	   };
	}

	componentDidMount() {
		if(Platform.OS != 'android'){
		  setTimeout(() => SplashScreen.hide(),2500);
		}
	}
	
	sendEmail(obj){
		const {user, rating, category, feedback} = obj;
		let errorMessage = null;
		let successMessage = null;
		if(user == null || user==''){
			errorMessage="Please tell us who you are "
		}else if(category == null || category==''){
			errorMessage = "Please select a category before submitting the form"
		}else if( rating ==0){
			errorMessage="Please rate us before submitting the form"
		}
		if(errorMessage == null ){
			let mail = `This is an feedback email from ${user}. \nHe/She rates ${rating} ${rating>1?'stars':'star'} for ${category} of Mäd.\n${feedback?'Here is their feedback':''} ${feedback!=null && feedback!= ''? feedback:"\n"}`;
			this.props.sendMail(mail)
			successMessage = "Your feedback have been submitted successfully."
			this.setState({successMessage:successMessage, errorMessage:null})
		}else{
			this.setState({errorMessage:errorMessage, successMessage:null})
		}
	}
	render(){
		const { rating } = this.state;
		return(
		<Container>
			<FeedBackForm {...this.props} sendEmail={(obj)=>this.sendEmail(obj)} errorMessage={this.state.errorMessage} successMessage={this.state.successMessage}/>
		</Container>
	)}
}


function mapStateToProps(state) {
  const { isFetching, errors, isSuccess} = state.feedbackMail

  return {
    state,
    fetchingErrorMessage:errors.message,
    isFetching:isFetching,
    isSuccess: isSuccess
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendMail: bindActionCreators(sendMail,dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(FeedBackContainer);

