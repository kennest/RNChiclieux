import React, {Component} from "react";
import {View, StyleSheet, Dimensions, ActivityIndicator, Text, Image} from "react-native";
import  {MAP_TYPES, Marker} from "react-native-maps";
import {observer} from "mobx-react";
import SearchBar from 'react-native-search-bar';
import {GraphQlStore} from "../../store";
import uuid from 'react-native-uuid';
import {autorun} from "mobx";
import {MyCluster} from "./MyCluster";
import MapView from 'react-native-map-clustering';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE = 5.334284;
const LONGITUDE = -3.955779;
//const LATITUDE_DELTA = 0.0922;
const LATITUDE_DELTA = 10;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

@observer
class MapComponent extends Component {

    map: MapView;

    constructor(props) {
        super(props);
        console.log('Map Props=> ',props);
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            positions: [],
            location: {
                latitude: 0.0,
                longitude: 0.0,
            },
            search: '',
        };
    }

    componentDidMount(): void {
        GraphQlStore.getAllPlaces();

        //this.refs.searchBar.focus();
        autorun((reaction) => {
            const positions = [...this.state.positions];
            GraphQlStore.places.slice().forEach((p) => {
                console.log("Positions Autorun => " + p.id, p.locations);
                p.locations.forEach((n) => {
                    positions.push(n);
                    this.setState({
                        positions
                    })
                });
               //this.fitToCoordinates();
            });
            reaction.dispose();
        }, {delay: 500})
    }

   /* fitToCoordinates(){
        this.map.fitToCoordinates([...this.state.positions], {
            edgePadding: {
                top: 30,
                right: 30,
                bottom: 30,
                left: 30
            }, animated: true
        });
    }*/

    updateSearch = search => {
        GraphQlStore.filterPlacesByCategoryLabel(search);
        this.setState({search});
    };

    render() {
        const mapOptions = {
            scrollEnabled: true,
        };

        return (
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <SearchBar
                        //lightTheme={true}
                        ref="searchBar"
                        placeholder="Rechercher..."
                        onChangeText={this.updateSearch}
                        onSearchButtonPress={()=>{}}
                        onCancelButtonPress={()=>{}}
                    />
                </View>
                <MapView
                    ref={(map) => { this.map = map; }}
                    style={styles.map}
                    mapType={MAP_TYPES.STANDARD}
                    clustering={true}
                    //renderClusterMarker={this.renderCustomClusterMarker}
                    onPress={this.onPress}
                    region={this.state.region}
                    showsTraffic={true}
                    {...mapOptions}>
                    {
                        this.state.positions.map((n) => (
                                <Marker
                                    icon={require('../../assets/sphere.png')}
                                    title={`${n.title}`}
                                    key={uuid.v1()}
                                    cluster={true}
                                    coordinate={n}/>
                            )
                        )
                    }
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
    searchBar: {
        flex: 1,
        position: 'absolute',
        zIndex: 300,
        width: '100%',
        backgroundColor:"rgba(70,7,122,0.67)"
    }
});

export default MapComponent;
