import firebase from "react-native-firebase";
import {computed, observable} from "mobx";
import {AccessToken, LoginManager, GraphRequestManager, GraphRequest} from 'react-native-fbsdk';
import {default as Alert} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {User} from "../models/User";

class FireBaseStore {
    @observable image = {};
    @observable isLoggedIn = false;
    @observable user = {};

    constructor() {
        this.requestManager = new GraphRequestManager()
    }

    getImage(path) {
        firebase.storage.putFile(path, {contentType: "image/jpg"})
            .then((result) => {
                console.log(JSON.stringify(result))
            });
    }

     isAuthentified = ()=> {
         try {
             const user = AsyncStorage.getItem('user');
             if ( user !== null) {
                 console.log("Storage user",user);
                 this.isLoggedIn = true;
             }
         } catch (error) {
             // Error retrieving data
             console.warn("Storage Error",error);
         }
    };

    async facebookLogin() {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                // handle this however suites the flow of your app
                console.log('User cancelled request');
            }

            console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

            // get the access token
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                // handle this however suites the flow of your app
                console.log('Something went wrong obtaining the users access token');
            }

            // create a new firebase credential with the token
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

            // login with credential
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

            let user = firebaseUserCredential.user.toJSON();

            console.log("User JSON 0 => ", firebaseUserCredential.user);

            const processRequest = new GraphRequest(
                '/me?fields=name,picture.type(large)',
                null,
                this.getGraphInfos
            );
            // Start the graph request.
            this.requestManager.addRequest(processRequest).start();
            console.info(JSON.stringify("User JSON 1=> ", user))
        } catch (e) {
            console.error(e);
        }
    }

    getGraphInfos = async (error, result) => {
        if (error) {
            Alert.alert('Error fetching data: ' + error.toString());
        } else {
            console.log("FB Graph Request => ", result);
            let loggindUser = new User();
            loggindUser.fbid = result.id;
            loggindUser.username = result.name;
            loggindUser.avatar = result.picture.data.url;
            this.user=loggindUser;
            await AsyncStorage.setItem('user',JSON.stringify(loggindUser));
            this.isLoggedIn = true;
        }
    };

    async logout(){
        LoginManager.logOut();
        await AsyncStorage.removeItem('user').then(value => {
            this.isLoggedIn = false;
        });
    }

}


export default new FireBaseStore;