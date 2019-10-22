import React, {Component} from "react";
import {View, Text, Image, ScrollView} from "react-native";
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

    render() {
        return (
            <ScrollView>
                <View style={{padding: 15, flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                  <Text>Settings</Text>
                </View>
            </ScrollView>

        );
    }
}

export default SettingsComponent;
