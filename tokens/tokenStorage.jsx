import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar el token
export const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem('userToken', token);
    } catch (error) {
        console.error('Error al guardar el token', error);
    }
};

// Leer el token
export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return token;
    } catch (error) {
        console.error('Error al leer el token', error);
    }
};

// Eliminar el token
export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
    } catch (error) {
        console.error('Error al eliminar el token', error);
    }
};