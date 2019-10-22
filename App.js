import "reflect-metadata";
import React from 'react';
import {Platform} from "react-native";
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {HomeStack, DrawerNav, BottomTabNavigator} from './components/Navstack/NavConfig'
import {SplashComponent} from "./components/index";
import {Provider as MobXProvider, observer} from "mobx-react";
import {GraphQlStore} from "./store";
var PushNotification = require("react-native-push-notification");
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import Pusher from 'pusher-js/react-native';


//To load fonts on Start
Icon.loadFont().then();
MaterialIcons.loadFont().done();
Fontisto.loadFont().done();

const AppNavigator = createSwitchNavigator({
  Splash: SplashComponent,
  Home: BottomTabNavigator,
}, {
  initialRouteName: "Splash"
});

const AppContainer = createAppContainer(AppNavigator);

@observer
class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    //this.testNotification();
  }

  testNotification(){
      if(Platform.OS==='android'){
          PushNotification.localNotification({
              /* iOS and Android properties */
              title: "My Notification Title", // (optional)
              message: "My Notification Message", // (required)
              playSound: false, // (optional) default: true
              soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
              number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
              repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
              actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
          });
      }else{
          PushNotificationIOS.presentLocalNotification({
              alertBody: 'This is a local notification!',
              category: 'something_happened'
          });
      }

  }

  checkPusher(){
      Pusher.logToConsole = true;

      let pusher = new Pusher('3f1e60f7f215183d9a87', {
          cluster: 'eu',
          forceTLS: true
      });

      let channel = pusher.subscribe('my-channel');
      channel.bind('my-event', function(data) {
          alert(JSON.stringify(data));
      });
  }

  async componentDidMount():void {
    // TODO: You: Do firebase things
    // await firebase.analytics().logEvent('foo', { bar: '123'});
   GraphQlStore.getAllCategories();
   GraphQlStore.getAllPlaces();
   setInterval(GraphQlStore.findNearestPoint,60000);
   this.checkPusher();
  }
  
  render() {
    return (
        <MobXProvider>
          <AppContainer/>
        </MobXProvider>
    );
  }
}

export default App;
