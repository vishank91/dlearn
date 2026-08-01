import React from 'react'

import { createNativeStackNavigator } from "@react-navigation/native-stack"

const RootNavigation = createNativeStackNavigator()

import HomePage from "./Screens/HomePage"
import CreatePage from "./Screens/CreatePage"
import UpdatePage from "./Screens/UpdatePage"
import ShowClassPage from "./Screens/ShowClassPage"
import CreateEventPage from "./Screens/CreateEventPage"
import UpdateEventPage from "./Screens/UpdateEventPage"
export default function AdminTeacherHomePage() {
    return (
        <RootNavigation.Navigator>
            <RootNavigation.Screen name='home' component={HomePage} options={{ headerShown: false }} />
            <RootNavigation.Screen name='create' component={CreatePage} options={{ headerShown: false }} />
            <RootNavigation.Screen name='update' component={UpdatePage} options={{ headerShown: false }} />
            <RootNavigation.Screen name='show' component={ShowClassPage} options={{ headerShown: false }} />
            <RootNavigation.Screen name='create-event' component={CreateEventPage} options={{ headerShown: false }} />
            <RootNavigation.Screen name='update-event' component={UpdateEventPage} options={{ headerShown: false }} />
        </RootNavigation.Navigator>
    )
}
