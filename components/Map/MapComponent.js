import React, {Component} from "react";
import {View, StyleSheet, Dimensions, ActivityIndicator, Text, Image} from "react-native";
import MapView, {MAP_TYPES, Marker} from "react-native-maps";
import {observer} from "mobx-react";
import {SearchBar} from 'react-native-elements';
import {GraphQlStore} from "../../store";
import uuid from 'react-native-uuid';
import {autorun} from "mobx";

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE = 5.334284;
const LONGITUDE = -3.955779;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

@observer
class MapComponent extends Component {

    _mapView: MapView;

    constructor(props) {
        super(props);
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
                this._mapView.fitToCoordinates([...this.state.positions], {
                    edgePadding: {
                        top: 30,
                        right: 30,
                        bottom: 30,
                        left: 30
                    }, animated: true
                });
            });
            reaction.dispose();
        }, {delay: 500})
    }

    updateSearch = search => {
        GraphQlStore.filterPlacesByCategoryLabel(search);
        this.setState({search});
    };

    render() {
        const mapOptions = {
            scrollEnabled: true,
        };
        const {search} = this.state;

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
                    ref={(mapView) => {
                        this._mapView = mapView;
                    }}
                    style={styles.map}
                    mapType={MAP_TYPES.HYBRID}
                    onPress={this.onPress}
                    initialRegion={this.state.region}
                    showsTraffic={true}
                    {...mapOptions}>
                    {
                        this.state.positions.map((n) => (
                                <Marker
                                    icon={require('../../assets/sphere.png')}
                                    title={`${n.title}`}
                                    key={uuid.v1()}
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
        width: '100%'
    }
});

export default MapComponent;
