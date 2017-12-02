import React, { Component } from 'react';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import FeedBackForm from '../components/FeedBackForm';
import { Container } from '../assets/StyledComponents';
import { connect } from 'react-redux';
import { sendMail } from '../actions/FeedbackEmail';
import { bindActionCreators } from 'redux';

const CATEGORIES = ['Quality','Speed','Value','Creativity','Strategy'];

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
	
	sendEmail(data){
		const {user, rating, category, feedback} = data;
		let message = null;
		
		if(user == null || user==''){
			message="Please tell us who you are "
		}else if(category == null || category==''){
			message = "Please select a category before submitting the form"
		}else if( rating ==0){
			message="Please rate us before submitting the form"
		}
		if(message == null ){
			let mail = `This is an feedback email from ${user}. \nHe/She rates ${rating} 
						${rating>1?'stars':'star'} for ${category} of Mäd.\n${feedback?'Here is their feedback':''}
						${feedback!=null && feedback!= ''? feedback:"\n"}`;
			this.props.sendMail(mail)
			message = "Your feedback have been submitted successfully."
			this.setState({successMessage:message, errorMessage:null})
		}else{
			this.setState({errorMessage:message, successMessage:null})
		}
	}
	render(){
		const { rating } = this.state;
		return(
		<Container>
			<FeedBackForm {...this.props} sendEmail={(data)=>this.sendEmail(data)}
			errorMessage={this.state.errorMessage} successMessage={this.state.successMessage}/>
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

