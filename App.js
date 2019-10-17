import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {HomeStack,DrawerNav} from './components/Navstack/NavConfig'
import {SplashComponent} from "./components/index";
import {Provider as MobXProvider, observer} from "mobx-react";
import {GraphQlStore} from "./store";

//To load fonts on Start
Icon.loadFont().then();
MaterialIcons.loadFont().done();
Fontisto.loadFont().done();

const AppNavigator = createSwitchNavigator({
  Splash: SplashComponent,
  Home: DrawerNav,
}, {
  initialRouteName: "Splash"
});

const AppContainer = createAppContainer(AppNavigator);

@observer
class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount():void {
    // TODO: You: Do firebase things
    // await firebase.analytics().logEvent('foo', { bar: '123'});
   GraphQlStore.getAllCategories();
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
