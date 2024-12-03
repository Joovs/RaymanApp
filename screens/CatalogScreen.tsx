import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image, ActivityIndicator, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

interface Item {
    _id: string; // Puedes ajustar los tipos según la respuesta de tu API
    Descripcion: string;
    Imagen: string;
    Nombre: string,
    Precio: String,
}

export function Catalog (){

    const [productos, setProductos] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                //esta url es para la emulación desde dispositivo fisico, pero no me jaló bien
                const response = await fetch('http://192.168.0.102:5000/api/products', {
                //const response2 = await fetch('http://172.31.98.50:5000/api/products', {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });

                const resullt: Item[] = await response.json();
                //console.log(resullt);
                if (Array.isArray(resullt)) {
                    setProductos(resullt);
                } else {
                    console.error('La respuesta no es un arreglo válido:', resullt);
                }
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            } finally{
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);





    if (loading) {
        return (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
    }


    const renderItem = ({ item }: { item: Item }) => (
        <View style={styles.div}>
          <Text style={styles.title}>{item.Nombre}</Text>
          <Image
            source={{uri: item.Imagen.startsWith('data:image/png;base64,') ? item.Imagen : `data:image/png;base64,${item.Imagen}`}}
            style={styles.image}
        />
          {/* <Image source={{ uri: `data:image/png;base64,${item.Imagen}` }} /> */}
          <Text style={styles.text}>{item.Descripcion}</Text>
          <Text style={styles.textPrecio}>Precio: {item.Precio}</Text>
        </View>
    );




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

                    <Text style={styles.title}>
                        Rayman: Los Caminos de la Vida
                    </Text>
                    <View style={styles.div}>
                        <Text style={styles.text}>Si quieres obtener alguno de nuestros productos ¡Visítanos en nuestra aplicación móvil!</Text>
                    </View>
                    <View style={styles.encab}>
                        <Text style={styles.encabTxt}>Nuestros Productos</Text>
                    </View>

                    <FlatList
                        data={productos}
                        keyExtractor={(item) => item._id}
                        renderItem={renderItem}
                    />





                    <View style={styles.encab}>
                        {/* eslint-disable-next-line react/self-closing-comp */}
                        <Text style={styles.encabTxt}></Text>
                    </View>

                </LinearGradient>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        marginBottom: 8,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    },
    textPrecio: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    div: {
        backgroundColor: '#ffcd45',
        padding: 10,
        borderRadius: 15,
        alignContent: 'center',
        margin: 10,
        alignItems: 'center',
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
