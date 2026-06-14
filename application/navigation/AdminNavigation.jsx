import React from 'react'
import { House, LogOut, Warehouse, UserRoundPen, UserStar, UsersRoundIcon } from "lucide-react-native"

import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import AdminHomePage from '../screens/Admin/AdminHomePage'

import AdminTeacherHomePage from "../screens/Admin/Teachers/AdminTeacherHomePage"
import AdminStudentHomePage from "../screens/Admin/Students/AdminStudentHomePage"
import AdminUserHomePage from "../screens/Admin/Users/AdminUserHomePage"

import LogoutPage from "../screens/Authentication/LogoutPage"

const DrawerNavigation = createDrawerNavigator()
const TabNavigation = createBottomTabNavigator()

function AdminTabs() {
    return (
        <TabNavigation.Navigator screenOptions={({ route }) => ({
            headerShown:false,
            tabBarIcon: ({ color, size }) => {
                if (route.name === "Home")
                    return <House color={color} size={size} />
                if (route.name === "Teacher")
                    return <UserRoundPen color={color} size={size} />
                if (route.name === "Student")
                    return <UserStar color={color} size={size} />
                if (route.name === "User")
                    return <UsersRoundIcon color={color} size={size} />
                if (route.name === "Logout")
                    return <LogOut color={color} size={size} />
            }
        })}>
            <TabNavigation.Screen name='Home' component={AdminHomePage} />
            <TabNavigation.Screen name='Teacher' component={AdminTeacherHomePage} />
            <TabNavigation.Screen name='Student' component={AdminStudentHomePage} />
            <TabNavigation.Screen name='User' component={AdminUserHomePage} />
            <TabNavigation.Screen name='Logout' component={LogoutPage} />
        </TabNavigation.Navigator>
    )
}

export default function AdminNavigation() {
    return (
        <DrawerNavigation.Navigator>
            <DrawerNavigation.Screen name="Dashboard" component={AdminTabs} options={{
                drawerIcon: ({ color, size }) => <Warehouse color={color} size={size} />
            }} />
            <DrawerNavigation.Screen name="Home" component={AdminHomePage} options={{
                drawerIcon: ({ color, size }) => <House color={color} size={size} />
            }} />
            <DrawerNavigation.Screen name="Teacher" component={AdminTeacherHomePage} options={{
                drawerIcon: ({ color, size }) => <UserRoundPen color={color} size={size} />
            }} />
            <DrawerNavigation.Screen name="Student" component={AdminStudentHomePage} options={{
                drawerIcon: ({ color, size }) => <UserStar color={color} size={size} />
            }} />
            <DrawerNavigation.Screen name="User" component={AdminUserHomePage} options={{
                drawerIcon: ({ color, size }) => <UsersRoundIcon color={color} size={size} />
            }} />
            <DrawerNavigation.Screen name="Logout" component={LogoutPage} options={{
                drawerIcon: ({ color, size }) => <LogOut color={color} size={size} />
            }} />
        </DrawerNavigation.Navigator>
    )
}
