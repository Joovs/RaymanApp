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
      return token;
    } catch (error) {
      console.error('Error al leer el token', error);
      return null;
    }
  };

  // Eliminar el token
  export const removeToken = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.error('Error al eliminar el token', error);
    }
  };
