import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MyCluster = (props) => {
    const { count } = props;
    return (
        <View style={styles.main}>
            <Text>{count}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
  main:{
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#ff2516',
      justifyContent: 'center',
      alignItems: 'center'
  }
});