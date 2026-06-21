import React from 'react'

import { createNativeStackNavigator } from "@react-navigation/native-stack"

const RootNavigation = createNativeStackNavigator()

import HomePage from "./Screens/HomePage"
import CreatePage from "./Screens/CreatePage"
import UpdatePage from "./Screens/UpdatePage"
export default function AdminUserHomePage() {
    return (
        <RootNavigation.Navigator>
            <RootNavigation.Screen name='home' component={HomePage} options={{headerShown:false}} />
            <RootNavigation.Screen name='create' component={CreatePage} options={{headerShown:false}} />
            <RootNavigation.Screen name='update' component={UpdatePage} options={{headerShown:false}} />
        </RootNavigation.Navigator>
    )
}
