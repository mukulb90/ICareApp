// @flow
import * as React from "react";
import { Item, Input, Icon, Toast, Form } from "native-base";
import { Field, reduxForm } from "redux-form";
import SignUp from "../../stories/screens/SignUp";

export interface Props {
	navigation: any,
}
export interface State {}

class SignUpForm extends React.Component<Props, State> {
	textInput: any;

	render() {
		return <SignUp navigation={this.props.navigation} />;
	}
}
const SignUpContainer = reduxForm({
	form: "signup",
})(SignUpForm);
export default SignUpContainer;
