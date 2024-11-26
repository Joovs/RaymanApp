import { getToken } from './tokenStorage';

export const validateToken = async () => {
    const token = await getToken(); // Obtener el token

    try {
        //esta url es para la emulación desde dispositivo fisico, pero no me jaló bien
        //const response = await fetch('http://192.168.0.102:5000/validateToken', {
        const response = await fetch('http://172.31.98.50:5000/validateToken', {

        //esta url es para emular la app desde emulador de android studio, si jaló
        //const response = await fetch('http://10.0.2.2:5000/userValidation', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Token válido:', data);
            return true; // Token válido
        } else {
            console.error('Token inválido');
            return false; // Token inválido
        }
    }catch (error) {
        console.error('Error al validar el token (desde validateToken):', error);
        return false;
    }
};
