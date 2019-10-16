import React,{Component} from "react";
import {View,StyleSheet,Dimensions} from "react-native";
import MapView, {MAP_TYPES} from "react-native-maps";
const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE = 5.334284;
const LONGITUDE = -3.955779;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            points: [],
            location: {
                latitude: 0.0,
                longitude: 0.0,
            },
        };
    }

    render() {
        const mapOptions = {
            scrollEnabled: true,
        };
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    mapType={MAP_TYPES.HYBRID}
                    onPress={this.onPress}
                    initialRegion={this.state.region}
                    {...mapOptions}>

                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default MapComponent;
