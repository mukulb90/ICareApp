import * as React from "react";
import { Image, Platform } from "react-native";
import { Container, Content, Header, Body, Title, Button, Text, View, Icon, Footer, Row, H1 } from "native-base";
import styles from "./styles";
var iconUrl = require('../../../../assets/icare-logo.png')

export interface Props {
	loginForm: any,
	onLogin: Function,
}

export interface State {

}

class Login extends React.Component<Props, State> {

	handleSignupClick = () => {
		this.props.navigation.navigate("SignUp");
	}

	render() {
		return (
			<Container style={styles.container}>
				<Header style={styles.header}>
					<Body style={styles.headerBody}>
						<Row style={styles.titleWrap}>
							<Image source={iconUrl} style={styles.logo}/>
							<Title style={styles.title}> ICare </Title>
						</Row>
						<Row style={styles.subtitleExtra}>
							<Text style={styles.subtitle2}> Sign in to continue</Text>
						</Row>
					</Body>
				</Header>
				<Content style={styles.content}>
					{this.props.loginForm}
					<View padder>
						<Button style={styles.loginbtn} block onPress={() => this.props.onLogin()}>
							<Text style={styles.loginbtnText}>Login</Text>
						</Button>
					</View>
				</Content>
				<Row style={styles.signupbtnWrap}>
					<Button style={styles.signupbtn} onPress={this.handleSignupClick}>
						<Text style={styles.signupbtnText}> Do not have an account?
							<Text style={{fontWeight: 'bold', padding:100}}>
									Sign Up
						  </Text>
						</Text>
					</Button>
				</Row>
			</Container>
		);
	}
}

export default Login;
