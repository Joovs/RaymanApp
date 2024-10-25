import React from 'react';
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export function Catalog (){
    return(
        // eslint-disable-next-line react-native/no-inline-styles
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView style={styles.background}>
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#ff7e5d', '#ff9f1f']}
                style={styles.container}
                >
                    {/* <Touchable style={styles.btn} >
                        <Text>Agregar un marcador</Text>
                    </Touchable> */}
                    <Text style={styles.title}>
                        Rayman: Los Caminos de la Vida
                    </Text>
                    <View style={styles.encab}>
                        <Text style={styles.encabTxt}>Peluches</Text>
                    </View>


                    <View style={styles.divProd}>
                        <Image source={require('../src/img/Luka.png')} style={styles.prodImg} />
                        <Text style={styles.prodTxt}>Peluche de Crochette de Luka</Text>
                    </View>
                    <View style={styles.divProd}>
                        <Image source={require('../src/img/Rayman.png')} style={styles.prodImg} />
                        <Text style={styles.prodTxt}>Peluche de Rayman</Text>
                    </View>
                    <View style={styles.divProd}>
                        <Image source={require('../src/img/churro.png')} style={styles.prodImg} />
                        <Text style={styles.prodTxt}>Peluche de Crochette de Churro</Text>
                    </View>





                    <View style={styles.encab}>
                        <Text style={styles.encabTxt}>Figuras Coleccionables</Text>
                    </View>
                </LinearGradient>
            </ScrollView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        },
        background:{
            backgroundColor: 'linear-gradient(to right, blue, pink)',
        },
        title: {
            fontSize: 40,
            color: '#000',
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
        },
        text: {
            color: '#000',
        },
        div: {
            backgroundColor: '#ffcd45',
            padding: 10,
            borderRadius: 15,
            alignContent: 'center',
            margin: 10,
        },
        imga:{
            width: 325,
            height: 250,
            margin: 5,
        },
        encab:{
            backgroundColor: '#1e4bb1',
            alignItems: 'center',
            width: '100%',
            marginTop: 15,
        },
        encabTxt:{
            fontSize: 30,
            color: '#6ab5dd',
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
        },
        divProd:{
            backgroundColor: '#ffcd45',
            padding: 10,
            borderRadius: 15,
            alignContent: 'flex-end',
            margin: 10,
        },
        prodImg:{
            //borderRadius: 15,
            height: 500,
            width: 350,
        },
        prodTxt:{
            color: '#000',
        },
        tjug:{
            color: '#000',
            fontSize: 20,
            fontFamily: 'Helvetica, sans-serif',
            fontWeight: 'bold',
            alignSelf: 'center',

        },
        btn:{
            backgroundColor: '#ffcd45',
        },
});
