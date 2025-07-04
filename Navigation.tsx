import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
//importar mis screens
import { Home } from './screens/HomeScreen';
import { Catalog } from './screens/CatalogScreen';
import { Bookmarks } from './screens/BookmarksScreen';
import { Closing } from './screens/Closing';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Login } from './screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Signup } from './screens/Signup';
import { Usuario } from './screens/Usuario';
import { NewMark } from './screens/NewMark';
import { ProtectedRoute } from './tokens/protectedRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChangePassw } from './screens/ChangePassw';


const LoginStack = createNativeStackNavigator();
const UsuarioStak = createNativeStackNavigator();
const MarkStack = createNativeStackNavigator();

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
                name="mainTabs"
                component={MyTabs}
                options={{
                    headerShown: false,
                }}
            />
        </LoginStack.Navigator>
    );
}

function UserStack(){
    return(
        <UsuarioStak.Navigator
            initialRouteName="User"
        >
            <UsuarioStak.Screen
            component={Usuario}
                name="User"
                options={{
                    headerShown: false,
                }}
            />
            <UsuarioStak.Screen
                name="Cambiar"
                options={{
                    headerShown: false,
                }}
            >
                {() => (
                    <ProtectedRoute>
                        <ChangePassw />
                    </ProtectedRoute>
                )}
            </UsuarioStak.Screen>
            {/* Hay un detalle en esta parte, necesito pensar bien la navegación */}
            <UsuarioStak.Screen
                name="Closing"
            >
                {() => (
                    <ProtectedRoute>
                        <Closing />
                    </ProtectedRoute>
                )}
            </UsuarioStak.Screen>
    </UsuarioStak.Navigator>
    );

}

function MarcadorStack(){
    return(
        <MarkStack.Navigator
            initialRouteName="marcador"
        >
            <MarkStack.Screen
                name="marcador"
                options={{
                    headerShown: false,
                }}
            >
                {() => (
                    <ProtectedRoute>
                        <Bookmarks />
                    </ProtectedRoute>
                )}
            </MarkStack.Screen>


            <MarkStack.Screen
                name="newMark"
                options={{
                    headerShown: false,
                }}
            >
                {()=> (
                    <ProtectedRoute>
                        <NewMark />
                    </ProtectedRoute>
                )}
            </MarkStack.Screen>
        </MarkStack.Navigator>
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
                component={Home}
                options={{
                    tabBarLabel: 'Inicio',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: () => (<Icon name="home" size={30} color="#1e4bb1" />),
                    headerShown: false,
                }}
            >
                {/* {() => (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                )} */}
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
                component={MarcadorStack}
                options={{
                    tabBarLabel: 'Marcadores',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: () => (<Icon name="paperclip" size={30} color="#1e4bb1" />),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Usuario"
                component={UserStack}
                options={{
                    tabBarLabel: 'Usuario',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: () => (<Icon name="user" size={30} color="#1e4bb1" />),
                    headerShown: false,
                }}
            />
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
