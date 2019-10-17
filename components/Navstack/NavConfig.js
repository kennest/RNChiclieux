import {createStackNavigator} from "react-navigation-stack";
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {DrawerComponent, HomeComponent, MapComponent, ProfileComponent} from "../index";

 const HomeStack = createStackNavigator({
     Map: {
         screen: MapComponent,
         navigationOptions: () => ({
             title: null,
             headerBackTitle: null,
             headerTransparent: true,
             header:null
         }),
     },
    Home: {
        screen: HomeComponent,
        navigationOptions: () => ({
            title: `Home`,
            headerBackTitle: null,
        }),
    },
    Profile: {
        screen: ProfileComponent,
        navigationOptions: () => ({
            title: `Profile`,
            headerBackTitle: null,
        }),
    },
}, {
    mode: 'card',
    defaultNavigationOptions: ({navigation}) => ({
        gesturesEnabled: true,
    })
});

 const DrawerNav = createDrawerNavigator({
        Home: HomeStack
    },
    {
        drawerPosition: 'Left',
        contentComponent: DrawerComponent,
        resetOnBlur: true,
        hideStatusBar: false,
        backBehavior: "history",
    });

 export {
     HomeStack,DrawerNav
 }