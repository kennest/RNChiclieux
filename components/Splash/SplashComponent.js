import React, {Component} from "react";
import {Image, ActivityIndicator, Text, View, StyleSheet} from "react-native";

class SplashComponent extends Component {

    componentDidMount(): void {
        setTimeout(() => {
            this.props.navigation.navigate('Home')
        }, 1500);
    }

    render() {
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }
}

export default SplashComponent;
