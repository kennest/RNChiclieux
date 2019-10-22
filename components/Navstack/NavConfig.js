import {createStackNavigator} from "react-navigation-stack";
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {DrawerComponent, NotificationComponent, MapComponent, ProfileComponent,SettingsComponent} from "../index";
import {Image} from "react-native";
import React from "react";

 const NotificationStack = createStackNavigator({
    Home: {
        screen: NotificationComponent,
        navigationOptions: () => ({
            title: `Home`,
            headerBackTitle: null,
        }),
    },
}, {
    mode: 'card',
    defaultNavigationOptions: ({navigation}) => ({
        gesturesEnabled: true,
    })
});

const AccountStack = createStackNavigator({
    Profile: {
        screen: ProfileComponent,
        navigationOptions: () => ({
            title: `Profile`,
            headerBackTitle: null,
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            }
        }),
    },
    Settings: {
        screen: SettingsComponent,
        navigationOptions: () => ({
            title: `Settings`,
            headerBackTitle: null,
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            }
        }),
    },
}, {
    mode: 'card',
    defaultNavigationOptions: ({navigation}) => ({
        gesturesEnabled: true,
    })
});

const MapStack = createStackNavigator({
    Map: {
        screen: MapComponent,
        navigationOptions: () => ({
            title: null,
            headerBackTitle: null,
            headerTransparent: true,
            header:null
        }),
    },
}, {
    mode: 'card',
    defaultNavigationOptions: ({navigation}) => ({
        gesturesEnabled: true,
    })
});

 const DrawerNav = createDrawerNavigator({
        Notifications: NotificationStack,
        Map: MapStack,
    },
    {
        drawerPosition: 'Left',
        contentComponent: DrawerComponent,
        resetOnBlur: true,
        hideStatusBar: false,
        backBehavior: "history",
    });

const BottomTabNavigator = createBottomTabNavigator({
    Home: MapStack,
    Notification: NotificationStack,
    Account: AccountStack,
}, {
    defaultNavigationOptions: ({navigation}) => ({
        activeTintColor:"#5d09a5",
        tabBarIcon: ({focused, horizontal, tintColor}) => {
            const {routeName} = navigation.state;
            if (routeName === 'Home') {
                return (
                    <Image
                        source={require('../../assets/map.png')}
                        style={{width: 20, height: 20,tintColor:routeName==='Home'?"#5d09a5":"rgba(120,120,120,0.38)"}}/>
                );
            } else if (routeName === 'Account') {
                return (
                    <Image
                        source={require('../../assets/account.png')}
                        style={{width: 20, height: 20,tintColor:routeName==='Account'?"#5d09a5":"rgba(120,120,120,0.38)"}}/>
                );
            }else if (routeName === 'Notification') {
                return (
                    <Image
                        source={require('../../assets/notification.png')}
                        style={{width: 20, height: 20,tintColor:routeName==='Notification'?"#5d09a5":"rgba(120,120,120,0.38)"}}/>
                );
            }
        },
        gesturesEnabled: true,
    }),
    tabBarOptions: {
        activeTintColor: '#46077a',
        inactiveTintColor: '#263238',
        showIcon: true,
    },
});

 export {
     NotificationStack,DrawerNav,BottomTabNavigator
 }