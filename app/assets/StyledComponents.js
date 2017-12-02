import {View, TouchableOpacity, Text, TextInput} from 'react-native';
import styled from 'styled-components/native';

export const CustomButton = styled.TouchableOpacity`
	border:1px solid;
	margin-top:10;
	width: 100%;
	height:40px;
	border-radius: 15px;
	justify-content:center;
	border-color:red;
`;

export const ModalCustomButton = styled.TouchableOpacity`
	border:1px solid;
	margin-top:10;
	width: 100%;
	height:40px;
	border-radius: 15px;
	justify-content:center;
	border-color:red;
	position: absolute;
	bottom: 10px;
	left:  20px;
	right: 20px;
	width: 90%;
	background-color: #fff;
`;

export const FeedbackBtnLabel = styled.Text`
	background-color:transparent;
	text-align:center;
	justify-content:center;
	font-size:20px;
	color:red;
`

export const FeedBack = styled.TextInput`
	width: 100%;
	height:100px;
	border: 1px solid;
	border-radius: 15;
	padding-left:10;
	margin-top:10px;
	margin-bottom:10px;
`;

export const ViewContainer = styled.View`
	flex: 1;
	padding: 15px 15px;
`;

export const Title = styled.Text`
	font-size:20px;
`;

export const ModalWrapper = styled.View`
	background-color:rgba(238,238,238, 0.7);
	flex-direction: column;
  justify-content: center;
  align-items: center; 
  height:100%;
`;
export const HeaderWrapper = styled.View`
	 height:55;
	 width:100%;
	 background-color:red;
	 align-items:center;
	 justify-content:center;
	 padding-top:20;
	 padding-bottom:10;
`;
export const Container = styled.View`
	flex:1;
`;

export const LabelWrapper = styled.View`
	flex-direction:row;
	margin-top:10px;
`;

export const Required = styled.Text`
	color: red;
`;

export const HeaderTitle = styled.Text`
color: #fff;
font-size: 25px;
text-align: center;
font-weight: bold;
`;

export const UserWrapper = styled.View`
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const UserSelection = styled.TouchableOpacity`
justify-content: center;
margin:10px 10px;
width:150px;
height:30px;
border: 1px solid red;
border-radius:15px;
`

export const User = styled.Text`
text-align: center;
padding: 10px 10px;
background-color: transparent;
`;

export const CategoryWrapper = styled.TouchableOpacity`
flex-direction: row;
justify-content: center;
align-items: center;
margin-top: 10px;
border-radius: 10px;
height: 30px;
border-width:1px;
width:150px
`;

export const SelectBox = styled.Text`
text-align: center;
color: red;
padding: 5px 5px;
background-color: transparent
`;

export const RatingWrapper = styled.View`
justify-content: center;
align-items: center;
`;

export const SelectBoxView = styled.View`
position: absolute;
top: 150px;
left: 20px;
right: 20px;
height: 300px;
background-color: #F5F5F5;
flex-direction:column;
border-radius: 10px;
`;

export const SelectData = styled.TouchableOpacity`
flex:1;
background-color: white;
height: 50px;
justify-content: center;
border-radius:15px;
margin: 5px 5px;
`;