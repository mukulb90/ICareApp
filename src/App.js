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
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {
    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    if(notif.local_notification){
      //this is a local notification
    }
    if(notif.opened_from_tray){
      //iOS: app is open/resumed because user clicked banner
      //Android: app is open/resumed because user clicked banner or tapped app icon
    }
    // await someAsyncCall();

    if(Platform.OS ==='ios'){
      //optional
      //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application.
      //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
      //notif._notificationType is available for iOS platfrom
      switch(notif._notificationType){
        case NotificationType.Remote:
          notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
          break;
        case NotificationType.NotificationResponse:
          notif.finish();
          break;
        case NotificationType.WillPresent:
          notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
          break;
      }
    }
});

FCM.on(FCMEvent.RefreshToken, (token) => {
    console.log(token)
    // fcm token may not be available on first load, catch it here
});
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

class FCMHandler  extends Component {
    componentDidMount() {
        // iOS: show permission prompt for the first call. later just check permission in user settings
        // Android: check permission in user settings
        FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));
        
        FCM.getFCMToken().then(token => {
            console.log(token)
            // store fcm token in your server
        });
        
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // optional, do some component related stuff
        });
        
        // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
        // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
        // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
        FCM.getInitialNotification().then(notif => {
           console.log(notif)
        });
        
        FCM.subscribeToTopic('/topics/foo-bar');
    }

    componentWillUnmount() {
        // stop listening for events
        this.notificationListener.remove();
    }

    render(){
    	return this.props.children;
    }

    otherMethods(){

        FCM.subscribeToTopic('/topics/foo-bar');
        FCM.unsubscribeFromTopic('/topics/foo-bar');
        FCM.presentLocalNotification({
            id: "UNIQ_ID_STRING",                               // (optional for instant notification)
            title: "My Notification Title",                     // as FCM payload
            body: "My Notification Message",                    // as FCM payload (required)
            sound: "default",                                   // as FCM payload
            priority: "high",                                   // as FCM payload
            click_action: "ACTION",                             // as FCM payload
            badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
            number: 10,                                         // Android only
            ticker: "My Notification Ticker",                   // Android only
            auto_cancel: true,                                  // Android only (default true)
            large_icon: "ic_launcher",                           // Android only
            icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
            big_text: "Show when notification is expanded",     // Android only
            sub_text: "This is a subText",                      // Android only
            color: "red",                                       // Android only
            vibrate: 300,                                       // Android only default: 300, no vibration if you pass 0
            group: "group",                                     // Android only
            picture: "https://google.png",                      // Android only bigPicture style
            ongoing: true,                                      // Android only
            my_custom_data:'my_custom_field_value',             // extra data you want to throw
            lights: true,                                       // Android only, LED blinking (default false)
            show_in_foreground                                  // notification when app is in foreground (local & remote)
        });

        FCM.scheduleLocalNotification({
            fire_date: new Date().getTime(),      //RN's converter is used, accept epoch time and whatever that converter supports
            id: "UNIQ_ID_STRING",    //REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other
            body: "from future past",
            repeat_interval: "week" //day, hour
        })

        FCM.getScheduledLocalNotifications().then(notif=>console.log(notif));

        //these clears notification from notification center/tray
        FCM.removeAllDeliveredNotifications()
        FCM.removeDeliveredNotification("UNIQ_ID_STRING")

        //these removes future local notifications
        FCM.cancelAllLocalNotifications()
        FCM.cancelLocalNotification("UNIQ_ID_STRING")

        FCM.setBadgeNumber(1);                                       // iOS only and there's no way to set it in Android, yet.
        FCM.getBadgeNumber().then(number=>console.log(number));     // iOS only and there's no way to get it in Android, yet.
        FCM.send('984XXXXXXXXX', {
          my_custom_data_1: 'my_custom_field_value_1',
          my_custom_data_2: 'my_custom_field_value_2'
        });

        FCM.deleteInstanceId()
            .then( () => {
              //Deleted instance id successfully
              //This will reset Instance ID and revokes all tokens.
            })
            .catch(error => {
              //Error while deleting instance id
            });
    }
}

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
		      <FCMHandler>
			     <App screenProps={screenProps}/>
		      </FCMHandler>
	       </Root>);
    }
}