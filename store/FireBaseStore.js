import firebase from "react-native-firebase";
import {computed, observable} from "mobx";

class FireBaseStore{
    @observable image={};

    @computed
    getImage(path){
        firebase.storage.putFile(path,{contentType:"image/jpg"})
            .then((result)=>{
                console.log(JSON.stringify(result))
            });
    }

}