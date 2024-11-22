import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { getToken } from './tokenStorage';
import { useNavigation } from '@react-navigation/native';

export const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken(); // Verifica si hay un token guardado
            if (token) {
                setIsAuthenticated(true); // Autenticado
            } else {
                navigation.navigate('Login'); // Redirige al login si no hay token
            }
            setLoading(false); // Termina la verificación
        };

        checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Si está autenticado, renderiza el contenido, de lo contrario redirige al login
    return isAuthenticated ? children : null;
};
