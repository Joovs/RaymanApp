import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
/* import './App.css'; */
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
//import { Producto } from './mod-producto';

export function Home (){
    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView style={styles.background}>
                <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#ff7e5d', '#ff9f1f']}
                style={styles.container}
                >
                    <Text style={styles.title}>
                        Rayman: Los Caminos de la Vida
                    </Text>

                    <View style={styles.div}>
                        <Text style={styles.text}>
                            Rayman: Los Caminos De La Vida, En este juego de Rayman, el objetivo principal es ayudar a Rayman a llegar 
                            a la fiesta de cumpleaños de Luka. El juego se desarrolla en un solo nivel continuo, pero está dividido en 
                            cuatro fases distintas, cada una con su propio conjunto de desafíos y obstáculos. Cada fase presenta un aumento 
                            en la dificultad y requiere que Rayman utilice todas sus habilidades de correr, saltar y esquivar para llegar 
                            al final. Al completar todas las fases, Rayman finalmente llega a la fiesta de Luka, donde lo espera una gran 
                            celebración. Este juego combina elementos clásicos de plataformas con la emoción de un juego de correr, 
                            ofreciendo una experiencia divertida y desafiante para los jugadores de todas las edades.
                        </Text>
                    </View>
                    <Image source={require('../src/img/logo.png')} style={styles.imga}/>





                    <View style={styles.encab}>
                        <Text style={styles.encabTxt}>Objetos Coleccionables</Text>
                    </View>


                    <View style={styles.divProd}>
                        <Image source={require('../src/img/tanga.jpeg')} style={styles.prodImg} />
                        <Text style={styles.prodTxt}>Tanga</Text>
                    </View>
                    <View style={styles.divProd}>
                        <Image source={require('../src/img/churro.jpeg')} style={styles.prodImg} />
                        <Text style={styles.prodTxt}>Churro</Text>
                    </View>
                    <View style={styles.divProd}>
                        <Image source={require('../src/img/kguama.jpeg')} style={styles.prodImg} />
                        <Text style={styles.prodTxt}>Kaguama</Text>
                    </View>
                    <View style={styles.divProd}>
                        <Image source={require('../src/img/tepa.jpeg')} style={styles.prodImg} />
                        <Text style={styles.prodTxt}>Tepa</Text>
                    </View>

{/*                     <Producto url={'../src/img/kguama.jpeg'} texto={'Kagama'} />  */}
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
        backgroundColor: '#aba490',
        alignItems: 'center',
        width: '100%',
        marginTop: 15,
    },
    encabTxt:{
        fontSize: 30,
        color: '#000',
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
});
