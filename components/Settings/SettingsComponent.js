import React, {Component} from "react";
import {View, Text, Image, ScrollView, FlatList, TouchableOpacity} from "react-native";
import {Button} from "native-base";
import {observer} from "mobx-react";

@observer
class SettingsComponent extends Component {

    static navigationOptions =({ navigation }) => {
        // headerTitle instead of title
        return {
            headerTitle:(
                <Text style={{color:'#46077a',fontSize:20,textAlign:"center"}}>Settings</Text>
            ),
            headerStyle: {
                backgroundColor: '#fff',
                color:"#46077a"
            },
            headerLeft: (
                <Button onPress={() => {
                    navigation.pop();
                }} transparent>
                    <Image
                        source={require('../../assets/chevron-left.png')}
                        style={{width: 30, height: 30,margin:20,tintColor:'#46077a'}}/>
                </Button>
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
                        <FlatList data={this.items} renderItem={({item}) => (
                            <TouchableOpacity>
                                <View style={{flexDirection:'row',alignContent:'center',justifyContent:'space-between'}}>
                                    <Text style={{fontSize:20}}>{item.title}</Text>
                                    <Image style={{tintColor:"#787878"}} source={require('../../assets/chevron-right.png')}/>
                                </View>
                            </TouchableOpacity>
                        )}/>
                </View>
            </ScrollView>

        );
    }
}

export default SettingsComponent;
