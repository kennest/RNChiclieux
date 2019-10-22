import React, {Component} from "react";
import { ActivityIndicator, View, Button, default as Alert} from "react-native";
import {FireBaseStore} from "../../store";
import {autorun} from "mobx";

class SplashComponent extends Component {

    constructor() {
        super();
        this.state = {
            user_name: '',
            avatar_url: '',
            avaxtar_show: false
        }
    }

   componentDidMount(): void {
        FireBaseStore.isAuthentified();
       setTimeout(() => {
           autorun(async ()=>{
               if(FireBaseStore.isLoggedIn) {
                   this.props.navigation.navigate('Home');
               }
           })
       }, 1000);
    }

    get_Response_Info = (error, result) => {
        if (error) {
            Alert.alert('Error fetching data: ' + error.toString());
        } else {

            this.setState({ user_name: 'Welcome' + ' ' + result.name });
            this.setState({ avatar_url: result.picture.data.url });
            this.setState({ avatar_show: true });

            console.log(result);

        }
    };

    onLogout = () => {
        this.setState({ user_name: null, avatar_url: null, avatar_show: false });
    };

    render() {
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size="large"/>
                <Button title="Login with facebook" onPress={async ()=>{
                   await FireBaseStore.facebookLogin();
                }} />

            </View>
        );
    }
}

export default SplashComponent;
