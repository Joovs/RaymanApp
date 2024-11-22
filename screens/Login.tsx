import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation  } from '@react-navigation/native';
import { Alert } from 'react-native';
//import axios from 'axios';
import { saveToken } from '../tokens/tokenStorage';



export function Login (){

    const navigation = useNavigation();

    const [mail, setMail] = useState('');
    const [passw, setPassw] = useState('');
    const [loading, setLoading] = useState(false);


    const handleLogin = async () => {
        if (!mail || !passw) {
          Alert.alert('Error', 'Por favor ingresa el usuario y la contraseña');
          return;
        }

        setLoading(true);


        try {
            /* const response = await axios.post('http://127.0.0.1:5000/userValidation', {
                mail,
                passw,
            }); */

            //esta url es la que uso sin emular la app, es decir, la uso con postman
            //const response = await fetch('http://127.0.0.1:5000/userValidation', {

            //esta url es para la emulación desde dispositivo fisico, pero no me jaló bien
            const response = await fetch('http://192.168.0.102:5000/userValidation', {

            //esta url es para emular la app desde emulador de android studio, si jaló
            //const response = await fetch('http://10.0.2.2:5000/userValidation', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  'mail': mail,
                  'passw': passw,
                }),
              });

              const jsonResponse = await response.json();

            if (response.status === 200) {
                // Aquí puedes redirigir al usuario a otra pantalla, guardar tokens, etc.
                const token = jsonResponse.token;
                await saveToken(token); // Guarda el tokena
                navigation.navigate('Usuario');
            }
            else{
                Alert.alert('Error',  jsonResponse.error );
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'fallo en conxion cn el servidor');
        } finally {
            setLoading(false);
        }
    };


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


                    <View style={styles.div}>
                        <Text style={styles.title}>Inicio de sesión</Text>
                        <TextInput style={styles.input} value={mail} onChangeText={setMail} placeholder="Ingresa tu correo electrónico" placeholderTextColor={'#666'}/>
                        <TextInput style={styles.input} value={passw} onChangeText={setPassw} placeholder="Ingresa tu contraseña" placeholderTextColor={'#666'} />
                        <TouchableOpacity style={styles.btnMarc} onPress={handleLogin} disabled={loading}>
                            <Text style={styles.btnTxt}>Iniciar sesión</Text>
                        </TouchableOpacity>



                        <Text style={styles.divisor}>

                            ________________________________________


                        </Text>
                        <Text style={styles.text}>¿Aún no tienes una cuenta? </Text>
                        <TouchableOpacity
                            onPress={()=>navigation.navigate('Registro')}
                            style={styles.btnSec}
                        >
                            <Text style={styles.btnTxtSec}>Registrarme</Text>
                        </TouchableOpacity>
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
