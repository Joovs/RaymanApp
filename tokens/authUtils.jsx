import jwtDecode from 'jwt-decode';
import { getToken } from './tokenStorage';

export const getDecodedToken = async () => {
    try {
        const token = await getToken(); // Obtén el token almacenado
        if (!token) {
            return null; // Si no hay token, devuelve null
        }

        const decoded = jwtDecode(token); // Decodifica el token
        return decoded; // Retorna los datos decodificados
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
    }
}
