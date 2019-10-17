import React,{Component} from "react";
import {View, StyleSheet, Dimensions, TextInput, Text, KeyboardAvoidingView} from "react-native";
import MapView, {MAP_TYPES} from "react-native-maps";
import {observer} from "mobx-react";
import {Icon, SearchBar} from 'react-native-elements';
import {Button} from "native-base";
const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE = 5.334284;
const LONGITUDE = -3.955779;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

@observer
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
            location: {
                latitude: 0.0,
                longitude: 0.0,
            },
            search: '',
        };
    }

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const mapOptions = {
            scrollEnabled: true,
        };
        const { search } = this.state;
        return (
                <View style={styles.container}>
                    <View style={styles.searchBar}>
                        <SearchBar
                            lightTheme={true}
                            placeholder="Rechercher..."
                            onChangeText={this.updateSearch}
                            value={search}
                        />
                    </View>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    searchBar:{
        flex:1,
        position:'absolute',
        zIndex:300,
        width:'100%'
    }
});

export default MapComponent;
