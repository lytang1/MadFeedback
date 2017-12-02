import React , { Component } from 'react';
import Toast from 'react-native-root-toast';

class Notification extends Component <{}> {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	message:this.props.message,
	  	bgcolor: this.props.bgcolor,
	  	visible:this.props.visible};
	}

	componentWillReceiveProps(nextProps) {
	  if(this.props.message != nextProps.message){
	  	this.setStateData('message', nextProps.message);
	  }
	  if(this.props.bgcolor != nextProps.bgcolor){
	  	this.setStateData('bgcolor', nextProps.bgcolor);
	  }
	  if(this.props.visible != nextProps.visible){
	  	this.setStateData('visible', nextProps.visible);
	  }
	}

	setStateData(name, value){
		if(name == 'message') this.setState({message:value});
		if(name == 'bgcolor') this.setState({bgcolor:value});
		if(name == 'visible') this.setState({visible:value});
	}

	render(){
		const {bgcolor, message, visible} = this.state;
		return (
		<Toast
			accessibilityLabel="toast"
      visible={this.state.visible}
      position={60}
      shadow={false}
      animation={false}
      hideOnPress={true}
      backgroundColor={this.state.bgcolor}
      textColor='#fff'>
       {this.state.message}
     </Toast>
     )
	}
}

export default Notification;