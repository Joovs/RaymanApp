import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, ActivityIndicator, FlatList  } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { getToken } from '../tokens/tokenStorage';
import { useNavigation  } from '@react-navigation/native';



interface Item {
    _id: string;
    Nombre: string;
    Tiempo: string;
    Descripcion: string,
    Estrellas: number,
    Imagen: string,
}






export function Bookmarks (){

    const navigation = useNavigation();

    const [topMarcador, setTopMarcador] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [miMarca, setMiMarca] = useState<Item[]>([]);
    const [existe, setExiste] = useState<boolean>(false);

    useEffect(()=> {
        const fetchTop = async () => {
            try {
                const response = await fetch('http://192.168.0.102:5000/getTopScores', {
                //const response2 = await fetch('http://172.31.98.50:5000/getTopScores', {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });


                const result: Item[] = await response.json();
                if(Array.isArray(result)){
                    setTopMarcador(result);
                }else{
                    console.log('No se obtuvo un arreglo: ', result);
                }
            } catch (error) {
                console.error('error al obtner el top: ', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTop();
    }, []);

    useEffect(() => {
        const valid = async () => {
            const token = await getToken();
            try {
                const validacion = await fetch('http://192.168.0.102:5000/verificarMarcador', {
                //const response2 = await fetch('http://172.31.98.50:5000/verificarMarcador', {
                    method: 'GET',
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    },
                });

                //const respuesta = await validacion.json();
                if (validacion.ok){
                    setExiste(true);
                }else{
                    console.log('falso dentro del else');
                    setExiste(false);
                }
            }catch (error) {
                console.log('error en la validación de existencia del mercador: ', error);
                setExiste(false);
            }
        };
        valid();
    }, []);


    useEffect(() => {
        const miData = async () =>{
            const token = await getToken();
            try {
                const resp = await fetch('http://192.168.0.102:5000/getMyScore', {
                //const response2 = await fetch('http://172.31.98.50:5000/getMyScore', {
                    method: 'GET',
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    },
                });

                const resultado: Item[] = await resp.json();
                if(Array.isArray(resultado)){
                    setMiMarca(resultado);
                }

            }catch (error) {
                console.log('error al obtner mi marca:', error);
            }
        };
        miData();
    }, []);


    if (loading) {
        return (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
    }

    const renderMiMarca = ({ item}: { item: Item}) => (
        <View style={styles.div}>
            <Text style={styles.title}>Mi marcador</Text>
            <Text style={styles.tjug}>Mi tiempo: {item.Tiempo} minutos</Text>
            <Image
                source={{uri: item.Imagen.startsWith('data:image/png;base64,') ? item.Imagen : `data:image/png;base64,${item.Imagen}`}}
                style={styles.image}
            />
            <Text style={styles.puntuacion}>{'★'.repeat(item.Estrellas)}{'☆'.repeat(5 - item.Estrellas)}</Text>
            <Text style={styles.text}>{item.Descripcion}</Text>
            <TouchableOpacity style={styles.btnElim}>
                <Text style={styles.btnTxt}>Eliminar mi marcador</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item }: { item: Item }) => (
        <View style={styles.div}>
            <Text style={styles.title}>{item.Nombre}</Text>
            <Text style={styles.tjug}>Tiempo: {item.Tiempo} minutos</Text>
            <Image
                source={{uri: item.Imagen.startsWith('data:image/png;base64,') ? item.Imagen : `data:image/png;base64,${item.Imagen}`}}
                style={styles.image}
            />
            <Text style={styles.puntuacion}>Puntuación:</Text>
            <Text style={styles.puntuacion}>{'★'.repeat(item.Estrellas)}{'☆'.repeat(5 - item.Estrellas)}</Text>
            <Text style={styles.text}>{item.Descripcion}</Text>

        </View>
    );



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



                        {existe === true ?
                            <FlatList
                            data={miMarca || []}
                            keyExtractor={(item) => item._id}
                            renderItem={renderMiMarca}
                            />
                        :   <TouchableOpacity style={styles.btnMarc} onPress={() => navigation.navigate('newMark')}>
                                <Text style={styles.btnTxt}>Agregar marcador</Text>
                            </TouchableOpacity>
                        }






                    <View style={styles.encab}>
                        <Text style={styles.encabTxt}>Mejores marcadores</Text>
                    </View>

                    <FlatList
                        data={topMarcador}
                        keyExtractor={(item) => item._id}
                        renderItem={renderItem}
                    />


                </LinearGradient>
            </ScrollView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    btnElim:{
        backgroundColor: '#829fee',
        margin: 15,
        padding: 7,
        borderRadius: 15,
        borderColor: '#fff',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    puntuacion:{
        color: '#1e4bb1',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 8,
        borderRadius: 5,
        marginTop: 8,
        marginHorizontal: '18%',
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
        textAlign: 'center',
    },
    div: {
        backgroundColor: '#ffcd45',
        padding: 10,
        borderRadius: 15,
        alignContent: 'center',
        margin: 10,
        alignItems: 'center',
        //width:'100%',
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
