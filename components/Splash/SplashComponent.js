import React,{Component} from "react";
import {Image, ScrollView, Text, View,StyleSheet} from "react-native";

class SplashComponent extends Component {

    componentDidMount(): void {
        setTimeout(()=>{
            this.props.navigation.navigate('Home')
        },1500);
    }

    render() {
        return (
            <View>

            </View>
        );
    }
}

export default SplashComponent;
