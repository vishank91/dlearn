import React from 'react'

import { createNativeStackNavigator } from "@react-navigation/native-stack"

const RootNavigation = createNativeStackNavigator()

import LoginPage from "../screens/Authentication/LoginPage"
import SignupPage from "../screens/Authentication/SignupPage"
export default function AuthenticationNavigation() {
    return (
        <RootNavigation.Navigator>
            <RootNavigation.Screen name='login' component={LoginPage} options={{headerShown:false}} />
            <RootNavigation.Screen name='signup' component={SignupPage} options={{headerShown:false}} />
        </RootNavigation.Navigator>
    )
}
