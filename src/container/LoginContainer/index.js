// @flow
import * as React from "react";
import { Item, Input, Icon, Toast, Form } from "native-base";
import { Field, reduxForm } from "redux-form";
import Login from "../../stories/screens/Login";

const required = value => (value ? undefined : "Required");
const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const maxLength15 = maxLength(15);
const minLength = min => value => (value && value.length < min ? `Must be ${min} characters or more` : undefined);
const minLength8 = minLength(5);
const email = value =>
	value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid email address" : undefined;
const alphaNumeric = value => (value && /[^a-zA-Z0-9 ]/i.test(value) ? "Only alphanumeric characters" : undefined);
import { endPoint } from "../../App.js";
import { AsyncStorage } from 'react-native';


export interface Props {
	navigation: any,
}
export interface State {}
class LoginForm extends React.Component<Props, State> {
	textInput: any;

	constructor(props){
		super(props);
		if(this.props.screenProps.state.username != undefined){
			console.log('REdirectng to Home');
			this.props.navigation.navigate("Drawer");
		}
		this.state = {
			username: "",
			password: ""
		}
	}

	componentWillReceiveProps(nextProps){
		if(this.props.screenProps.state.username == undefined && nextProps.screenProps.state.username != undefined){
			console.log('REdirectng to Home');
			this.props.navigation.navigate("Drawer");
		}
	}

	handleUsernameChange = (event) => {
		console.log("username change");
		this.setState({
			username: event.nativeEvent.text
		});
	}

	handlePasswordChange = (event) => {
		this.setState({
			password: event.nativeEvent.text
		});
	}

	renderInput = ({ input, label, type, meta: { touched, error, warning } }) => {
		return (
			<Item error={error && touched}>
				<Icon active name={input.name === "username" ? "person" : "unlock"} />
				<Input
					ref={c => (this.textInput = c)}
					placeholder={input.name === "username" ? "Username" : "Password"}
					value={input.name === "username" ? this.state.username : this.state.password}
					secureTextEntry={input.name === "password" ? true : false}
					{...input}
				/>
			</Item>
		);
	}

	login(form) {
		console.log(this.state);
		if (this.props.valid) {
			// this.props.navigation.navigate("Drawer");
			const key = "Authorization";
			const value =  "Basic " + btoa(this.state.username + ":" + this.state.password);
			console.log(value);
			
			const url = endPoint + 'user/username/' + this.state.username;

			fetch(url, {
					 method: 'GET',
					  headers: {
					    Accept: 'application/json',
					    'Content-Type': 'application/json',
					    "Authorization" : value
					  }
				})
				    .then(response => {
				    	if(response.status == 200)
				    		return response.json()
				    	Toast.show({
							text: "Enter Valid Username & password!",
							duration: 2000,
							position: "top",
							textStyle: { textAlign: "center" },
						});
						return response;
						})
				    .then(responseJson => {
				    	if(responseJson.username == this.state.username){
					    	AsyncStorage.setItem(key, value); 
					    	AsyncStorage.setItem("username", this.state.username); 
					    	this.props.screenProps.rerender(responseJson);
					    }
		    		})
		    		.catch((err)=>{
		    			console.log(err);
		    			Toast.show({
							text: "Enter Valid Username & password!",
							duration: 2000,
							position: "top",
							textStyle: { textAlign: "center" },
						});
		    		})

		} else {
			Toast.show({
				text: "Enter Valid Username & password!",
				duration: 2000,
				position: "top",
				textStyle: { textAlign: "center" },
			});
		}
	}

	render() {
		const form = (
			<Form>
				<Field name="username" component={this.renderInput} validate={[required]} onChange={this.handleUsernameChange} />
				<Field
					name="password"
					component={this.renderInput}
					onChange={this.handlePasswordChange}
					validate={[alphaNumeric, minLength8, maxLength15, required]}
				/>
			</Form>
		);
		return <Login navigation={this.props.navigation} loginForm={form} onLogin={() => this.login()} />;
	}
}
const LoginContainer = reduxForm({
	form: "login",
})(LoginForm);
export default LoginContainer;
