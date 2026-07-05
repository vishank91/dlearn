import React, { useEffect, useState } from 'react'
import { House, LogOut, Warehouse, UserRoundPen,Presentation, UserStar, UsersRoundIcon, } from "lucide-react-native"
import Storage from '@react-native-async-storage/async-storage'

import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import TeacherHomePage from '../screens/Teacher/TecherHomePage'
import TeacherClassHomePage from "../screens/Teacher/Classess/TeacherClassHomePage"

import LogoutPage from "../screens/Authentication/LogoutPage"

const DrawerNavigation = createDrawerNavigator()
const TabNavigation = createBottomTabNavigator()

function TeacherTabs() {
     return (
          <TabNavigation.Navigator screenOptions={({ route }) => ({
               headerShown: false,
               tabBarIcon: ({ color, size }) => {
                    if (route.name === "Home")
                         return <House color={color} size={size} />
                    if (route.name === "Teacher")
                         return <Presentation color={color} size={size} />
                    //  if (route.name === "Student")
                    //      return <UserStar color={color} size={size} />
                    //  if (role==="Super Admin" && route.name === "User")
                    //      return <UsersRoundIcon color={color} size={size} />
                    //  if (route.name === "Logout")
                    //      return <LogOut color={color} size={size} />
               }
          })}>
               <TabNavigation.Screen name='Home' component={TeacherHomePage} />
               <TabNavigation.Screen name='Class' component={TeacherClassHomePage} />
               {/* <TabNavigation.Screen name='Student' component={AdminStudentHomePage} />
            <TabNavigation.Screen name='User' component={AdminUserHomePage} /> */}
               <TabNavigation.Screen name='Logout' component={LogoutPage} />
          </TabNavigation.Navigator>
     )
}

export default function TeacherNavigation() {
     return (
          <DrawerNavigation.Navigator>
               <DrawerNavigation.Screen name="Dashboard" component={TeacherTabs} options={{
                    drawerIcon: ({ color, size }) => <Warehouse color={color} size={size} />
               }} />
               <DrawerNavigation.Screen name="Home" component={TeacherHomePage} options={{
                    drawerIcon: ({ color, size }) => <House color={color} size={size} />
               }} />
               <DrawerNavigation.Screen name="Class" component={TeacherClassHomePage} options={{
                    drawerIcon: ({ color, size }) => <Presentation color={color} size={size} />
               }} />
               {/* <DrawerNavigation.Screen name="Student" component={AdminStudentHomePage} options={{
                    drawerIcon: ({ color, size }) => <UserStar color={color} size={size} />
               }} />
               <DrawerNavigation.Screen name="User" component={AdminUserHomePage} options={{
                    drawerIcon: ({ color, size }) => <UsersRoundIcon color={color} size={size} />
               }} /> */}
               <DrawerNavigation.Screen name="Logout" component={LogoutPage} options={{
                    drawerIcon: ({ color, size }) => <LogOut color={color} size={size} />
               }} />
          </DrawerNavigation.Navigator>
     )
}
