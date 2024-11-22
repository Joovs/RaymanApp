import { getToken } from './tokenStorage';

export const validateToken = async () => {
    const token = await getToken(); // Obtén el token

    try {
        const response = await fetch('http://10.0.2.2:5000/validateToken', {
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
