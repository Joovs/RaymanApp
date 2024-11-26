import { useState } from 'react';
import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Alert  } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { getToken } from '../tokens/tokenStorage';



export function ChangePassw (){

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [newPassw, setNewPassw] = useState('');
    const [correo, setCorreo] = useState('');

    const handleChange = async () => {
        setLoading(true);
        //petición a la api para cambiar contraseña
        const token = await getToken();
        try{
            //esta url es la que uso sin emular la app, es decir, la uso con postman
            //const response = await fetch('http://127.0.0.1:5000/protected', {

            //esta url es para la emulación desde dispositivo fisico, pero no me jaló bien
            const response = await fetch('http://192.168.0.102:5000/protected', {
            //const response = await fetch('http://172.31.99.221:5000/protected', {

            //esta url es para emular la app desde emulador de android studio, si jaló
            //const response = await fetch('http://10.0.2.2:5000/protected', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'text/plain',
                },
            });

            if (response.ok){
                const mail = await response.text();
                setCorreo(mail);
                //setCorreo(await response.text);
            }

            try{
                //esta url es para la emulación desde dispositivo fisico, pero no me jaló bien
                const response2 = await fetch('http://192.168.0.102:5000/updatePassword', {
                //const response2 = await fetch('http://172.31.99.221:5000/updatePassword', {

                //esta url es para emular la app desde emulador de android studio, si jaló
                //const response = await fetch('http://10.0.2.2:5000/updatePassword', {
                //const response2 = await fetch('http://10.0.2.2:5000/updatePassword', {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      'correo': correo,
                      'passw': newPassw,
                    }),
                });

                if (response2.ok){
                    Alert.alert('Éxito', '¡Contraseña cambiada correctamente!');
                    navigation.navigate('User');
                }
            }catch{
                Alert.alert('Error', 'Error al obtener el correo desde el token');
            }


        }catch{
            Alert.alert('Error', 'Error al obtener el correo desde el token');
        }
    };

    const handleVolver = async () => {
        navigation.navigate('User');
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
                    <Text style={styles.title}>Configuarar contraseña</Text>
                        <TextInput style={styles.input} value={newPassw} onChangeText={setNewPassw} placeholder="Ingresa tu nueva contraseña" placeholderTextColor={'#666'}/>
                        <TouchableOpacity style={styles.btnMarc} onPress={handleChange} disabled={loading}>
                            <Text style={styles.btnTxt}>Realizar cambio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSec} onPress={handleVolver} disabled={loading}>
                            <Text style={styles.btnTxtSec}>Volver</Text>
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
        height: '100%',
        width: '100%',
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
