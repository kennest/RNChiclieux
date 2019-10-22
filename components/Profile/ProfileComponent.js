import React, {Component} from "react";
import {Image, ScrollView, Text, View, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import {Button} from "native-base";
import {observer} from "mobx-react";
import {FireBaseStore} from "../../store";

@observer
class ProfileComponent extends Component {

    static navigationOptions = ({navigation}) => {
        // headerTitle instead of title
        return {
            headerTitle: (
                <Text style={{color: '#46077a', fontSize: 20, textAlign: "center", padding: 10}}>Profile</Text>
            ),
            headerStyle: {
                backgroundColor: '#fff',
                color: "#000000",
                shadowOpacity: 0,
                shadowOffset: {
                    height: 0,
                },
                shadowRadius: 0,
            },
            headerRight: (
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Button
                        onPress={() => {
                            //navigation.navigate('Map');
                            navigation.navigate('Settings');
                        }} transparent>
                        <Image
                            source={require('../../assets/profile.png')}
                            style={{width: 30, height: 30, margin: 20, tintColor: '#46077a'}}/>
                    </Button>
                </View>
            ),
        }
    };


    render() {
        return (
            <ScrollView>
                <View style={{padding: 15, flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 100 / 2,
                            //borderColor: 'rgba(61,6,114,0.8)',
                            //borderWidth: 2,
                            margin: 5,
                            resizeMode: 'cover'
                        }}
                        //source={{uri: "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX4282922.jpg"}}
                        source={{uri: `${FireBaseStore.user.avatar}`}}
                    />
                    <Text>{FireBaseStore.user.username}</Text>
                    <Button style={{
                        borderRadius: 5,
                        margin: 10,
                        padding: 7,
                        width: 180,
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 0
                    }} onPress={()=>{
                        FireBaseStore.facebookLogout().then((res)=>{

                        });
                        this.props.navigation.navigate("Splash");
                    }}>
                        <Text style={{
                            color: "#fff"
                        }}>Se Deconnecter</Text>
                    </Button>
                </View>
            </ScrollView>

        );
    }
}

export default ProfileComponent;
