import { useState } from 'react';
import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity  } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';



export function Usuario (){

    const [loading, setLoading] = useState(false);

    const handleCerrar = async () => {

        setLoading(true);

        try{

        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }

    };



    return(
        // eslint-disable-next-line react-native/no-inline-styles
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.background}>
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#ff7e5d', '#ff9f1f']}
                    style={styles.container}
                >
                    <View style={styles.div}>
                        <Text style={styles.title}>Usuario</Text>
                        <Image source={require('../src/icons/usuario.png')}/>
                        <Text>Nombre:</Text>
                        <TouchableOpacity style={styles.btnMarc} onPress={handleCerrar} disabled={loading}>
                            <Text style={styles.btnTxt}>Cerrar sesión</Text>
                        </TouchableOpacity>




                    </View>
                </LinearGradient>
            </View>
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
        marginBottom: '50%',
        marginTop: '50%',
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
    input:{
        backgroundColor: '#fff',
        borderRadius: 15,
        margin: 10,
        color: 'black',
    },
    btnMarc:{
        backgroundColor: '#1e4bb1',
        margin: 15,
        padding: 7,
        borderRadius: 15,

    },
    btnSec:{
        //backgroundColor: '#84cddb',
        backgroundColor: '#829fee',
        margin: 15,
        padding: 7,
        borderRadius: 15,
        borderColor: '#fff',


    },
    btnTxt:{
        color: '#6ab5dd',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btnTxtSec:{
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    divisor:{
        marginBottom: 30,
        marginTop: 20,
    },
});
