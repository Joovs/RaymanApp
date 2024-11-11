import React from 'react';
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
                component={Home}
                options={{
                    tabBarLabel: 'Inicio',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: () => (<Icon name="home" size={30} color="#1e4bb1" />),
                    headerShown: false,
                }}
                />
            <Tab.Screen
                name="Catálogo"
                component={Catalog}
                options={{
                    tabBarLabel: 'Catálogo',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: () => (<Icon name="book" size={30} color="#1e4bb1" />),
                    headerShown: false,
                }}/>
            <Tab.Screen
                name="Marcadores"
                component={Bookmarks}
                options={{
                    tabBarLabel: 'Marcadores',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: () => (<Icon name="paperclip" size={30} color="#1e4bb1" />),
                    headerShown: false,
                }}/>
            <Tab.Screen
                name="Usuario"
                component={MyStack}
                options={{
                    tabBarLabel: 'Usuario',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: () => (<Icon name="user" size={30} color="#1e4bb1" />),
                    headerShown: false,
                }}/>
        </Tab.Navigator>
    );
}

export default function Navigation () {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}
