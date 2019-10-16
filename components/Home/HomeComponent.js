import React,{Component} from "react";
import firebase from "react-native-firebase";
import {Image, ScrollView, Text, View,StyleSheet} from "react-native";
import {Button} from "native-base";

class HomeComponent extends Component {
    static navigationOptions =({ navigation }) => {
        // headerTitle instead of title
        return {
            title: `Chic Lieux`,
            headerTitle:(
                <Text style={{color:'#FFF',fontSize:20,textAlign:"center"}}>Chic Lieux</Text>
            ),
            headerStyle: {
                backgroundColor: '#087415',
            },
            headerLeft: (
                <Button
                    onPress={() => {
                    navigation.toggleDrawer();
                }} transparent>
                    <Image
                        source={require('../../assets/menu.png')}
                        style={{width: 30, height: 30,margin:20,tintColor:'#FFF'}}/>
                </Button>
            ),
            headerRight: (
                <View style={{flex:1,flexDirection:"row"}}>
                    <Button
                        onPress={() => {
                        //navigation.navigate('Map');
                        navigation.navigate('Map');
                    }} transparent>
                        <Image
                            source={require('../../assets/plus.png')}
                            style={{width: 30, height: 30,margin:20,tintColor:'#FFF'}}/>
                    </Button>
                </View>
            ),
        }
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={require('../../assets/ReactNativeFirebase.png')} style={[styles.logo]}/>
                    <Text style={styles.welcome}>
                        Welcome to {'\n'} React Native Firebase
                    </Text>
                    <Text style={styles.instructions}>
                        To get started, edit App.js
                    </Text>
                    {Platform.OS === 'ios' ? (
                        <Text style={styles.instructions}>
                            Press Cmd+R to reload,{'\n'}
                            Cmd+D or shake for dev menu
                        </Text>
                    ) : (
                        <Text style={styles.instructions}>
                            Double tap R on your keyboard to reload,{'\n'}
                            Cmd+M or shake for dev menu
                        </Text>
                    )}
                    <View style={styles.modules}>
                        <Text style={styles.modulesHeader}>The following Firebase modules are pre-installed:</Text>
                        {firebase.admob.nativeModuleExists && <Text style={styles.module}>admob()</Text>}
                        {firebase.analytics.nativeModuleExists && <Text style={styles.module}>analytics()</Text>}
                        {firebase.auth.nativeModuleExists && <Text style={styles.module}>auth()</Text>}
                        {firebase.config.nativeModuleExists && <Text style={styles.module}>config()</Text>}
                        {firebase.crashlytics.nativeModuleExists && <Text style={styles.module}>crashlytics()</Text>}
                        {firebase.database.nativeModuleExists && <Text style={styles.module}>database()</Text>}
                        {firebase.firestore.nativeModuleExists && <Text style={styles.module}>firestore()</Text>}
                        {firebase.functions.nativeModuleExists && <Text style={styles.module}>functions()</Text>}
                        {firebase.iid.nativeModuleExists && <Text style={styles.module}>iid()</Text>}
                        {firebase.links.nativeModuleExists && <Text style={styles.module}>links()</Text>}
                        {firebase.messaging.nativeModuleExists && <Text style={styles.module}>messaging()</Text>}
                        {firebase.notifications.nativeModuleExists && <Text style={styles.module}>notifications()</Text>}
                        {firebase.perf.nativeModuleExists && <Text style={styles.module}>perf()</Text>}
                        {firebase.storage.nativeModuleExists && <Text style={styles.module}>storage()</Text>}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    logo: {
        height: 120,
        marginBottom: 16,
        marginTop: 64,
        padding: 10,
        width: 135,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    modules: {
        margin: 20,
        color:"#000"
    },
    modulesHeader: {
        fontSize: 16,
        marginBottom: 8,
    },
    module: {
        fontSize: 14,
        marginTop: 4,
        textAlign: 'center',
        color:"#000"
    }
});

export default HomeComponent;
