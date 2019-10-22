import React, {Component} from "react";
import {Image, ScrollView, Text, View, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import {Button} from "native-base";
import {observer} from "mobx-react";

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

    items = [
        {id: "Notifications", title: "Notifications", value: 3},
        {id: "Wiggle", title: "Wiggle", value: 4},
        {id: "Policy", title: "Politique de confidentialité", value: 0},
        {id: "Terms", title: "Conditions et termes", value: 0},
    ];

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
                        source={{uri: "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX4282922.jpg"}}/>
                    <Text>John Doe</Text>
                    <Button style={{
                        borderRadius: 5,
                        margin: 10,
                        padding: 7,
                        width: 180,
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 0
                    }}>
                        <Text style={{
                            color: "#fff"
                        }}>Deconnecter</Text>
                    </Button>
                    <View style={{flex: 1,marginTop:20}}>
                        <FlatList data={this.items} renderItem={({item}) => (
                            <TouchableOpacity>
                                <View style={{flexDirection:'row',alignContent:'center',justifyContent:'space-between'}}>
                                    <Text style={{fontSize:20}}>{item.title}</Text>
                                    <Image style={{tintColor:"#787878"}} source={require('../../assets/chevron-right.png')}/>
                                </View>
                            </TouchableOpacity>
                        )}/>
                    </View>
                </View>
            </ScrollView>

        );
    }
}

export default ProfileComponent;
