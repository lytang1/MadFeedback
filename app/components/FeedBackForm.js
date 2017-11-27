import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Modal,
	StatusBar
} from 'react-native';
import styled from 'styled-components/native';
import StarRating from 'react-native-star-rating';
import SplashScreen from 'react-native-splash-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';

const CustomeButton = styled.TouchableOpacity`
	border:1px solid;
	margin-top:10;
	width: 100%;
	height:40px;
	border-radius: 15px;
	justify-content:center;
	border-color:red;
`;

const FeedbackBtnLabel = styled.Text`
	background-color:transparent;
	text-align:center;
	justify-content:center;
	font-size:20px;
	color:red;
`

const FeedBack = styled.TextInput`
	width: 100%;
	height:100px;
	border: 1px solid;
	border-radius: 15;
	padding-left:10;
	margin-top:10px;
	margin-bottom:10px;
`;

const RatingLabel = styled.Text`
 text-align:left;
`;

const ViewContainer = styled.View`
	flex: 1;
	padding: 15px 15px;
`;

const Title = styled.Text`
	font-size:20px;
`;

const ModalWrapper = styled.View`
	background-color:rgba(238,238,238, 0.7);
	flex-direction: column;
  justify-content: center;
  align-items: center; 
  height:100%;
`;
const HeaderTitle = styled.View`
	 height:55;
	 width:100%;
	 background-color:red;
	 align-items:center;
	 justify-content:center;
	 padding-top:20;
	 padding-bottom:10;
`;
const Container = styled.View`
	width:100%;
	flex:1;
`;

const LabelWrapper = styled.View`
	flex-direction:row;
`;

const Required = styled.Text`
	color: red;
`;

const HeaderText = styled.Text`
color: #fff;
font-size: 25px;
text-align: center;
font-weight: bold;
`;

const UserWrapper = styled.View`
flex-direction: column;
justify-content: center;
align-items: center;
`;

const UserSelection = styled.TouchableOpacity`
background-color: ${(props) => props.user == 'client' ? 'red' : 'transparent'};
justify-content: center;
margin:10px 10px;
width:150px;
height:30px;
border: 1px solid red;
border-radius:15px;
`

const User = styled.Text`
text-align: center;
color: ${(props)=>props.user =='client'?'#fff':'red'};
padding: 10px 10px;
background-color: transparent;
`;

const CategoryWrapper = styled.TouchableOpacity`
flex-direction: row;
justify-content: center;
align-items: center;
margin-top: 10px;
border-radius: 10px;
height: 30px;
border-width:1px solid;
width:200px
`;

const SelectBox = styled.Text`
text-align: center;
color: red;
padding: 5px 5px;
background-color: transparent
`;

const RatingWrapper = styled.View`
justify-content: center;
align-items: center;
`;

const SelectBoxView = styled.View`
position: absolute;
top: 150px;
left: 20px;
right: 20px;
height: 300px;
background-color: #F5F5F5;
flex-direction:column;
border-radius: 10px;
`;

const SelectData = styled.TouchableOpacity`
flex:1;
background-color: white;
height: 50px;
justify-content: center;
border-radius:15px;
margin: 5px 5px;
`;

const CATEGORIES = ['Quality','Speed','Value','Creativity','Strategy'];

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
	   	message:null
	   }
	}

	componentWillReceiveProps(nextProps) {
	  if(this.props != nextProps){
	  	if(nextProps.errorMessage){
	  		this.setToastErrorMessage(nextProps.errorMessage)
	  	}else if(nextProps.successMessage && nextProps.isSuccess){
	  		this.setToastSuccessfulMessage(nextProps.successMessage)
	  	}
	  }
	}

	hideToast(){
		setTimeout(() => this.setState({visible:false}),2500);
	}
	setToastSuccessfulMessage(message){
		this.setState({visible:true, backgroundColor:'#4CAF50', message:message});
	  this.hideToast();
	}

	setToastErrorMessage(message){
		this.setState({visible:true, message:message, backgroundColor:'red'});
		this.hideToast();
	}

	setRating(value){
		this.setState({rating:value});
	}

	openSelectbox(){
		this.setState({categoryModalIsOpen:true})
	}

	setCategory(value){
		this.setState({category:value, categoryModalIsOpen:false})
	}
	setUser(value){
		this.setState({user:value})
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
			<HeaderTitle >
				<HeaderText accessibilityLabel ='title'>Mäd</HeaderText>
			</HeaderTitle>
		<ViewContainer>
			<Toast
				accessibilityLabel="toast"
        visible={this.state.visible}
        position={60}
        shadow={false}
        animation={false}
        hideOnPress={true}
        backgroundColor={this.state.backgroundColor}
        textColor='#fff'>
         {this.state.message}
       </Toast>
			<Title>{'Feedback Form'.toUpperCase()}</Title>
			<LabelWrapper style={{marginTop:10}}>
				<Text>Who are you? </Text>
				<Required>*</Required>
			</LabelWrapper>
			<UserWrapper>
				<UserSelection accessibilityLabel="Users" onPress={()=>{this.setState({user:'client'})}} user= {this.state.user}>
					<User user ={this.state.user}>I am a Client</User>
				</UserSelection>

				<UserSelection accessibilityLabel="Users" onPress={()=>{this.setState({user:'employee'})}} user={this.state.user}>
					<User user={this.state.user}>I am an Employee</User>
				</UserSelection>
			</UserWrapper>

			<LabelWrapper style={{flexDirection:'row'}}>
				<Text>Category Selection </Text>
				<Required>*</Required>
			</LabelWrapper>

			<View style={{alignItems:'center'}}>
				<CategoryWrapper accessibilityLabel="category_selectbox" onPress={()=>{this.openSelectbox();}}>
					<SelectBox>{this.state.category}</SelectBox>
					<IonIcon name="md-arrow-dropdown" size={20}  style={{position:'absolute',right:10}}/>
				</CategoryWrapper>
			</View>
			<LabelWrapper style={{marginTop:10}}>
				<RatingLabel>Rate </RatingLabel>
				<Required>*</Required>
			</LabelWrapper>
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
			<LabelWrapper style={{marginTop:10}}>
				<Text style={{fontSize:20, textAlign:'left'}}>Opinion </Text>
			</LabelWrapper>
			<FeedBack accessibilityLabel="feedback" placeholder='Feedback' multiline={true} onChangeText={(text)=>this.setState({feedback:text})}/>
			<CustomeButton accessibilityLabel="send_button" onPress={()=>this.sendEmail()}>
				<FeedbackBtnLabel>Send</FeedbackBtnLabel>
			</CustomeButton>
				<Modal visible={this.state.categoryModalIsOpen} onRequestclose={()=>alert('close')}
					style={{height:'100%', width:'100%', backgroundColor:'red', justifyContent:'center',alignItems:'center'}}
					animationType="slide"
          transparent>
				 <ModalWrapper>
          <CustomeButton accessibilityLabel="cancel_selectbox" onPress={()=>this.setState({categoryModalIsOpen:false})} style={{position:'absolute', bottom:10,left:20, right:20, width:'90%', backgroundColor:'#fff'}}>
          		<FeedbackBtnLabel>Cancel</FeedbackBtnLabel>
          </CustomeButton>
					<SelectBoxView>
						{
							CATEGORIES.map((category, index)=>{
								return(
										<TouchableOpacity accessibilityLabel="categories" key={index} onPress={()=>{this.setCategory(category);}} category={this.state.category} style={{}}>
											<Text style={{ paddingLeft:10, color:this.state.category ==category? 'red':'#000', textAlign:'center'}}>{category}</Text>
										</TouchableOpacity>
									)
							})
						}
					</SelectBoxView>
					</ModalWrapper>
				</Modal>
		</ViewContainer>
		</Container>
	)}
}

export default FeedBackForm;