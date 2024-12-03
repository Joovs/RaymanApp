import { useEffect, useState } from 'react';
import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Alert, Image  } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { getToken, removeToken } from '../tokens/tokenStorage';
import { launchImageLibrary } from 'react-native-image-picker';



export function NewMark (){

    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation();
    const [tiempo, setTiempo] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [estrellas, setEstrellas] = useState<string>('');
    /* const [imagen, setImagen] = useState<string>(''); */
    const [correo, setCorreo] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);

    const obtenerCorreo = async () => {
        const token = await getToken();
        try{
            //esta url es la que uso sin emular la app, es decir, la uso con postman
            //const response = await fetch('http://127.0.0.1:5000/protected', {

            //esta url es para la emulación desde dispositivo fisico, pero no me jaló bien
            const response = await fetch('http://192.168.0.102:5000/getUser', {
            //const response = await fetch('http://172.31.98.50:5000/protected', {

                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'text/plain',
                },
            });

            console.log(response);

            if (response.ok){
                const mail = await response.text();
                console.log(mail);
                setCorreo(mail);
                //setCorreo(await response.text());
                //console.log(correo);
                //setCorreo(await response.text);
            }else{
                console.error('error al obtener el correo:', response.status);
            }

            //--------------------






        }catch(error){
            console.error('error en la solicitud: ', error);
            Alert.alert('Error', 'Error al obtener el correo desde el token');
        }
    };



    useEffect(()=>{
        obtenerCorreo();
    }, []);

    useEffect(()=> {
        if(correo){
            console.log('Correo actualizado: ', correo);
        }
    }, [correo]);

    const obtnerNombre = async () => {
        try{
            const res = await fetch('http://192.168.0.102:5000/getUsername', {
                //const response = await fetch('http://172.31.98.50:5000/getUsername', {

                    method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'mail': correo,
                }),
            });

            console.log(res);

            if (res.ok){
                const name = await res.text();
                console.log('correo recibido', name);
                setUser(name);

            }else{
                console.error('error al obtener el nombre de usuario:', res.status);
            }


        }catch (error) {
            console.error('error en la solicitud de username: ', error);
            Alert.alert('Error', 'Error al obtener el nombre de usuario');
        }
    };


    useEffect(()=> {
        console.log('Correo dentro del useEffect:', correo);
        if (correo) {
            obtnerNombre();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [correo]);

    useEffect(()=>{

    }, [user]);

    const handleChange = async () => {

        if (!tiempo || !desc || !estrellas || !base64Image) {
            Alert.alert('Error', 'Por favor ingresa todos los campos');
            return;
        }

        setLoading(true);


        console.log('Datos enviados:', correo, tiempo, desc, estrellas, base64Image);


        try{
            //esta url es para la emulación desde dispositivo fisico, pero no me jaló bien
            const response2 = await fetch('http://192.168.0.102:5000/addScore', {
            //const response2 = await fetch('http://172.31.98.50:5000/addScore', {

            //esta url es para emular la app desde emulador de android studio, si jaló
            //const response = await fetch('http://10.0.2.2:5000/addScore', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'Nombre': correo,
                    'Tiempo': tiempo,
                    'Descripcion': desc,
                    'Estrellas': estrellas,
                    'Imagen': base64Image,
                }),
            });

            if (!response2.ok) {
                throw new Error(`HTTP error! status: ${response2.status}`);
            }

            const data = await response2.json();
            console.log('Respuesta del servidor:', data);


            if (response2.ok){
                console.log(response2);
                Alert.alert('Éxito', '¡Se ha agregado tu marcador! Por favor, inicia sesión para visualizar los cambios');
                await removeToken(); // Borra el token
                navigation.replace('Closing');
            }
            console.log(response2);
        }catch{
            console.log('Error al agreagar marcador');
        }
    };



    const pickImage = () => {
        launchImageLibrary(
          {
            mediaType: 'photo',
            includeBase64: true, // Esto genera la cadena Base64.
          },
          (response) => {
            if (response.didCancel) {
              console.log('El usuario canceló la selección de imagen.');
            } else if (response.errorCode) {
              console.error('Error al seleccionar la imagen:', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
              const selectedImage = response.assets[0];
              setImageUri(selectedImage.uri || null);
              setBase64Image(selectedImage.base64 || null);
            }
          }
        );
      };



    const handleVolver = async () => {
        navigation.navigate('marcador');
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
                    <Text style={styles.title}>Agregar marcador</Text>
                        <TextInput style={styles.input} value={tiempo} onChangeText={setTiempo} placeholder="Ingresa tu tiempo" placeholderTextColor={'#666'}/>
                        <TextInput style={styles.input} value={desc} onChangeText={setDesc} placeholder="Ingresa una descripción" placeholderTextColor={'#666'}/>
                        <TextInput style={styles.input} value={estrellas} keyboardType="numeric" onChangeText={setEstrellas} placeholder="Calificación en estrellas" placeholderTextColor={'#666'}/>
                        <TouchableOpacity style={styles.btnSec} onPress={pickImage}>
                            <Text style={styles.btnTxtSec}>Selecciona tu imagen</Text>
                        </TouchableOpacity>
                        {imageUri && (
                        <Image
                            source={{ uri: imageUri }}
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{ width: 200, height: 200, marginTop: 20 }}
                            />
                        )}


                        <TouchableOpacity style={styles.btnMarc} onPress={handleChange} disabled={loading}>
                            <Text style={styles.btnTxt}>Guardar</Text>
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
