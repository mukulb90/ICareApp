import * as React from "react";
import { Image, Platform } from "react-native";
import { Container, Content, Form, Input, Label, Item, Text, Header, Body, Icon, Left, Button} from "native-base";
import { 	 } from "native-base";
import styles from './styles.js';
import { endPoint } from "../../../App.js";

export interface Props {
}

export interface State {}
class SignUp extends React.Component<Props, State> {

	constructor(props){
		super(props);
		this.state = {

		}
	}

	handleEmailChange = (event) => {
		this.setState({
			email: event.nativeEvent.text
		});
	}

	handleNameChange = (event) => {
		this.setState({
			name: event.nativeEvent.text
		});
	}

	handleDeviceIdChange = (event) => {
		this.setState({
			deviceId: event.nativeEvent.text
		});
	}

	handlePasswordChange = (event) => {
		this.setState({
			password: event.nativeEvent.text
		});
	}

	handleConfirmPasswordChange = (event) => {
		this.setState({
			confirmPassword: event.nativeEvent.text
		});
	}

	handleUsernameChange = (event) => {
		this.setState({
			username: event.nativeEvent.text
		});
	}

	handleBackClick = () => {
		this.props.navigation.navigate("Login");
	}

	handleSignupClick = () => {
		if(this.state.password == this.state.confirmPassword){

				const url = endPoint + 'user/username/' + this.state.username;
				const body = {
					 		"deviceId": this.state.deviceId,
							"emailId": this.state.email,
							"password": this.state.password,
							"fullName": this.state.name
				};
				console.log(url);
				console.log(JSON.stringify(body));
				fetch(url, {
					 method: 'POST',
					 body: JSON.stringify(body),
					  headers: {
					    Accept: 'application/json',
					    'Content-Type': 'application/json',
					  }
				})
				    .then(response => response.json())
				    .then(responseJson => {
				    	console.log("response", responseJson);
					     this.handleBackClick();
		    		})
		    	.catch(error => {
		      		console.error(error);
		    	});
		}
	}

	render() {
		return (
			<Container style={styles.container}>
			<Header style={styles.header}>
			<Left style={styles.backIcon} >
				<Button onPress={this.handleBackClick} transparent> 
					<Icon name="ios-arrow-back" />
				</Button>
			</Left>
				<Body>
					<Text style={styles.headText}> Sign Up </Text>
				</Body>
			</Header>
				<Content>
					<Form>
					<Item floatingLabel style={styles.item}>
							<Label>Username</Label>
							<Input onChange={this.handleUsernameChange} value={this.state.username}/>
					</Item>
					 <Item floatingLabel style={styles.item}>
							<Label>Email Id</Label>
							<Input onChange={this.handleEmailChange} value={this.state.email}/>
						</Item>
					<Item floatingLabel style={styles.item}>
						 <Label>Full Name</Label>
						 <Input onChange={this.handleNameChange} value={this.state.name}/>
					 </Item>
					 <Item floatingLabel style={styles.item}>
		 				 <Label>Device Id</Label>
		 				 <Input onChange={this.handleDeviceIdChange} value={this.state.deviceId}/>
		 			 </Item>
				<Item floatingLabel style={styles.item}>
					 <Label>Password</Label>
					 <Input type="password" onChange={this.handlePasswordChange} value={this.state.password}/>
				 </Item>
			 <Item floatingLabel style={styles.item}>
					<Label>Confirm Password</Label>
					<Input type="password" onChange={this.handleConfirmPasswordChange} value={this.state.confirmPassword}/>
				</Item>
				<Button style={styles.signupbtn} onPress={this.handleSignupClick}>
					<Text style={styles.signupbtnText}> Create Account </Text>
				</Button>
					</Form>
				</Content>
			</Container>
		);
	}

}

export default SignUp;
