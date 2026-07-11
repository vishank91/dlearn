import React from 'react'

import { createNativeStackNavigator } from "@react-navigation/native-stack"

const RootNavigation = createNativeStackNavigator()

import HomePage from "./Screens/HomePage"
import JoinPage from "./Screens/JoinPage"
export default function AdminTeacherHomePage() {
    return (
        <RootNavigation.Navigator>
            <RootNavigation.Screen name='home' component={HomePage} options={{ headerShown: false }} />
            <RootNavigation.Screen name='join' component={JoinPage} options={{ headerShown: false }} />
        </RootNavigation.Navigator>
    )
}
