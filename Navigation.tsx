import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
//importar mis screens
import { Home } from "./screens/HomeScreen";
import { Catalog } from "./screens/CatalogScreen";
import { Bookmarks } from "./screens/BookmarksScreen";
//import { Stack } from "./screens/StackScreen";


const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Inicio" component={Home}/>
            <Tab.Screen name="Catálogo" component={Catalog}/>
            <Tab.Screen name="Marcadores" component={Bookmarks}/>
        </Tab.Navigator>
    )
}

export default function Navigation () {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}