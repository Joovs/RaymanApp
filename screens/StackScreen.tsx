import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export function Stack (){
    return(
        <View style={styles.container}>
            <Text>Holi, este es el STACK</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
});
