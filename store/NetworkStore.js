import {observable} from "mobx";
import * as NetInfo from "@react-native-community/netinfo";
import Geolocation from '@react-native-community/geolocation';

class NetworkStore{
    @observable connected=false;
    @observable location={};

     isConnected(){
        NetInfo.fetch().then(state=>{
            this.connected=state.isConnected
        });
         NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            this.connected=state.isConnected
        });
        //unsubscribe();
    }

     getLocation(){
        //Geolocation.requestAuthorization();
        Geolocation.getCurrentPosition(
            (position) => {
                console.info("Location =>",JSON.stringify(position));
                this.location={
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude
                };
            },
            (error) => {
                // See error code charts below.
                console.info(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000,useSignificantChanges:true,distanceFilter:0 }
        );
    }
}
export default new NetworkStore