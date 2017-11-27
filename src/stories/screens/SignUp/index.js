import * as React from "react";
import { Image, Platform } from "react-native";
import { Container, Content, Form, Input, Label, Item, Text, Header, Body, Icon, Left, Button} from "native-base";
import styles from './styles.js';

export interface Props {
}

export interface State {}
class SignUp extends React.Component<Props, State> {

	handleBackClick = () => {
		this.props.navigation.navigate("Login");
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
							<Label>Email Id</Label>
							<Input />
						</Item>
					<Item floatingLabel style={styles.item}>
						 <Label>Full Name</Label>
						 <Input/>
					 </Item>
					 <Item floatingLabel style={styles.item}>
		 				 <Label>Device Id</Label>
		 				 <Input />
		 			 </Item>
				<Item floatingLabel style={styles.item}>
					 <Label>Password</Label>
					 <Input />
				 </Item>
			 <Item floatingLabel style={styles.item}>
					<Label>Confirm Password</Label>
					<Input />
				</Item>
				<Button style={styles.signupbtn}>
					<Text style={styles.signupbtnText}> Create Account </Text>
				</Button>
					</Form>
				</Content>
			</Container>
		);
	}

}

export default SignUp;
