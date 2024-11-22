import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
//importar mis screens
import { Home } from './screens/HomeScreen';
import { Catalog } from './screens/CatalogScreen';
import { Bookmarks } from './screens/BookmarksScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Login } from './screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Signup } from './screens/Signup';
import { Usuario } from './screens/Usuario';
import { ProtectedRoute } from './tokens/ProtectedRoute';
import { AsyncStorage } from 'react-native';


const LoginStack = createNativeStackNavigator();

function MyStack(){
    return(
        <LoginStack.Navigator
            initialRouteName="Iniciar"
        >
            <LoginStack.Screen
                name="Registro"
                component={Signup}
                options={{
                    headerShown: false,
                }}
            />
            <LoginStack.Screen
                name="Iniciar"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <LoginStack.Screen
                name="Usuario"
                component={Usuario}
                options={{
                    headerShown: false,
                }}
            />
        </LoginStack.Navigator>
    );
}


const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator
        initialRouteName="Inicio"
        screenOptions={{
            tabBarActiveTintColor: 'black',
            tabBarActiveBackgroundColor: '#fad877',
        }}
        >
            <Tab.Screen
                name="Inicio"
                options={{
                    tabBarLabel: 'Inicio',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: () => (<Icon name="home" size={30} color="#1e4bb1" />),
                    headerShown: false,
                }}
            >
                {() => (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                )}
            </Tab.Screen>
            <Tab.Screen
                name="Catálogo"
                options={{
                    tabBarLabel: 'Catálogo',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: () => (<Icon name="book" size={30} color="#1e4bb1" />),
                    headerShown: false,
                }}
            >
                {() => (
                    <ProtectedRoute>
                        <Catalog />
                    </ProtectedRoute>
                )}
            </Tab.Screen>
            <Tab.Screen
                name="Marcadores"
                options={{
                    tabBarLabel: 'Marcadores',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: () => (<Icon name="paperclip" size={30} color="#1e4bb1" />),
                    headerShown: false,
                }}
            >
                {() => (
                    <ProtectedRoute>
                        <Bookmarks />
                    </ProtectedRoute>
                )}
            </Tab.Screen>
            <Tab.Screen
                name="Usuario"
                options={{
                    tabBarLabel: 'Usuario',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: () => (<Icon name="user" size={30} color="#1e4bb1" />),
                    headerShown: false,
                }}
            >
                {() => (
                    <ProtectedRoute>
                        <Usuario />
                    </ProtectedRoute>
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

export default function Navigation () {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('userToken');
            setIsAuthenticated(!!token); // Autenticado si hay un token
        };
        checkAuth();
    }, []);

    return (
        <NavigationContainer>
            {isAuthenticated ? (
                <MyTabs />
            ) : (
                <MyStack />
            )}
        </NavigationContainer>
    );
}
