import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { validateToken } from './validateToken';
import { removeToken } from './tokenStorage';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const isValid = await validateToken(); // Validar el token con el backend
                if (isValid) {
                    setIsAuthenticated(true);
                } else {
                    await removeToken();
                    navigation.navigate('Iniciar'); // Redirigir si no está autenticado
                }
            } catch (error) {
                console.error('Error al verificar autenticación (desde protectedRoute):', error);
                navigation.navigate('Iniciar');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigation]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return isAuthenticated ? <>{children}</> : null;
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
