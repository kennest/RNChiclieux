import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MyCluster = (props) => {
    const { count,isplace } = props;
    return (
        <View style={
            {
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: isplace?'#ff2516':'#5d09a5',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }>
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