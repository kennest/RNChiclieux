import React, {Component} from "react";
import {Image, ActivityIndicator, Text, View, Button, default as Alert} from "react-native";
import {FireBaseStore} from "../../store";
import {AccessToken, GraphRequest, grm as GraphRequestManager, LoginButton} from 'react-native-fbsdk';
import firebase from "react-native-firebase";
import {autorun} from "mobx";
import AsyncStorage from "@react-native-community/async-storage";

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
                   this.props.navigation.navigate('Map');
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
                <LoginButton
                readPermissions={['public_profile']}
                onLoginFinished={(error, result) => {
                if (error) {
                    console.log(error.message);
                    console.log('login has error: ' + result.error);
                } else if (result.isCancelled) {
                    console.log('login is cancelled.');
                } else {
                    AccessToken.getCurrentAccessToken().then(async data => {

                        console.log(data.accessToken.toString());
                        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

                        // login with credential
                        const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);


                        var user=firebaseUserCredential.user.toJSON();

                        if(user!==null){
                            FireBaseStore.isLoggedIn=true;
                            this.props.navigation.navigate('Home')
                        }
                        console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
                        const processRequest = new GraphRequest(
                            '/me?fields=name,picture.type(large)',
                            null,
                            this.get_Response_Info
                        );
                        // Start the graph request.
                       let grm= new GraphRequestManager();
                       grm.addRequest(processRequest).start();
                    });
                }
            }}
                onLogoutFinished={this.onLogout}/>
            </View>
        );
    }
}

export default SplashComponent;
