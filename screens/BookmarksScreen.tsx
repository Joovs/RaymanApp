import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity  } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';


export function Bookmarks (){
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

                    <View style={styles.div}>
                        <Text style={styles.text}>En esta sección puedes ver los records y los mejores marcadores de otros jugadores dentro de Rayman y los Caminos de la Vida, también puedes agregar tu propio marcador, tan solo tienes que iniciar sesión.</Text>
                    </View>


                    <TouchableOpacity style={styles.btnMarc}>
                        <Text style={styles.btnTxt}>Agregar marcador</Text>
                    </TouchableOpacity>



                    <View style={styles.encab}>
                        <Text style={styles.encabTxt}>Recientes</Text>
                    </View>


                    <View style={styles.div}>
                        <Text style={styles.tjug}>Jugador1</Text>
                        <Image source={ require('../src/img/dinosaurio.jpg')}/>
                    </View>
                    <View style={styles.div}>
                        <Text style={styles.tjug}>Jugador1</Text>
                        <Image source={ require('../src/img/dinosaurio.jpg')}/>
                    </View>
                    <View style={styles.div}>
                        <Text style={styles.tjug}>Jugador1</Text>
                        <Image source={ require('../src/img/dinosaurio.jpg')}/>
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
            textAlign: 'center',
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
            height: 270,
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
        btnMarc:{
            backgroundColor: '#fad877',
            margin: 15,
            padding: 7,
            borderRadius: 15,


        },
        btnTxt:{
            color: '#000',
            fontWeight: 'bold',
        },
});
