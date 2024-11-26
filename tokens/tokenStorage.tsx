// tokenStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar el token
export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('userToken', token);
    console.log(token);
  } catch (error) {
    console.error('Error al guardar el token', error);
  }
};

// Leer el token
export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
        console.log('Token recuperado:', token);
        return token;
    } else {
        console.log('No se encontró ningún token');
        return null;
    }
  } catch (error) {
    console.error('Error al obtener el token', error);
    return null;
  }
};

// Eliminar el token
export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('userToken');
    console.log('Token eliminado');
  } catch (error) {
    console.error('Error al eliminar el token', error);
  }
};
