import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

export function Producto (url: string, texto: string){
    //let tex = texto;
    return(
        <View style={styles.divProd}>
            <Image source={require(url)} style={styles.prodImg} />
            <Text style={styles.prodTxt}>{ texto }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    divProd:{
        backgroundColor: '#ffcd45',
        padding: 10,
        borderRadius: 15,
        alignContent: 'flex-end',
        margin: 10,
    },
    prodImg:{
        //borderRadius: 15,
        height: 270,
        width: 350,
    },
    prodTxt:{
        color: '#000',
    },
});
