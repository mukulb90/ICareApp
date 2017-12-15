// @flow
import React, {Component} from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import Login from "./container/LoginContainer";
import Home from "./container/HomeContainer";
import BlankPage from "./container/BlankPageContainer";
import Sidebar from "./container/SidebarContainer";
import SignUp from "./container/SignUpContainer";
import {Platform} from 'react-native';
import { AsyncStorage } from 'react-native';

export const endPoint = 'http://ec2-54-153-51-19.us-west-1.compute.amazonaws.com:8080/';

const Drawer = DrawerNavigator(
	{
		Home: { screen: Home },
	},
	{
		initialRouteName: "Home",
		contentComponent: props => <Sidebar {...props} />,
	}
);

const App = StackNavigator(
	{
		Login: { screen: Login },
		BlankPage: { screen: BlankPage },
		Drawer: { screen: Drawer },
		SignUp: {screen: SignUp},
		Home: { screen: Home }
	},
	{
		initialRouteName: "Login",
		headerMode: "none",
	}
);

export default class RootApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            renderComponents: false
        }
        AsyncStorage.getItem("username").then((value)=>{


            const url = endPoint + 'user/username/' + value;

            fetch(url, {
                     method: 'GET',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      }
            }).then(response => {
                    if(response.status == 200)
                        return response.json()
                    return response;
                    })
                .then(responseJson => {
                    if(responseJson.username == this.state.username){
                        this.setState({user: responseJson});
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })


            AsyncStorage.getItem("Authorization").then((authHeader)=>{
                this.setState(
            {
                username: value,
                renderComponents: true,
                authHeader
            });
            });
        });
    }

    rerender = (user) => {
        AsyncStorage.getItem("username").then((value)=>{
            AsyncStorage.getItem("Authorization").then((authHeader)=>{

                this.setState(
            {
                username: value,
                renderComponents: true,
                authHeader,
                user: user
            });
            });
        });
    }

    logout = () => {
        AsyncStorage.removeItem("username");
        AsyncStorage.removeItem("Authorization");
        this.setState({
            username: undefined,
            authHeader: undefined,
            renderComponents: false,
            user: undefined
        });
    }

	render(){ 
        if(!this.renderComponents){
            null;
        }
        const screenProps = {
            state:this.state, rerender:this.rerender, logout: this.logout, user: this.state.user
        };

        return (
            <Root>
			     <App screenProps={screenProps}/>
	       </Root>);
    }
}