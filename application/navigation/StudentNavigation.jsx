import React from 'react'
import { House, LogOut, Warehouse, UserRoundPen, Presentation, UserStar, UsersRoundIcon, } from "lucide-react-native"


import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import StudentHomePage from '../screens/Student/StudentHomePage'
import StudentClassHomePage from "../screens/Student/Classess/StudentClassHomePage"

import LogoutPage from "../screens/Authentication/LogoutPage"

const DrawerNavigation = createDrawerNavigator()
const TabNavigation = createBottomTabNavigator()

function StudentTabs() {
     return (
          <TabNavigation.Navigator screenOptions={({ route }) => ({
               headerShown: false,
               tabBarIcon: ({ color, size }) => {
                    if (route.name === "Home")
                         return <House color={color} size={size} />
                    if (route.name === "Class")
                         return <Presentation color={color} size={size} />
                    if (route.name === "Logout")
                         return <LogOut color={color} size={size} />
               }
          })}>
               <TabNavigation.Screen name='Home' component={StudentHomePage} />
               <TabNavigation.Screen name='Class' component={StudentClassHomePage} />
               <TabNavigation.Screen name='Logout' component={LogoutPage} />
          </TabNavigation.Navigator>
     )
}

export default function StudentNavigation() {
     return (
          <DrawerNavigation.Navigator>
               <DrawerNavigation.Screen name="Dashboard" component={StudentTabs} options={{
                    drawerIcon: ({ color, size }) => <Warehouse color={color} size={size} />
               }} />
               <DrawerNavigation.Screen name="Home" component={StudentHomePage} options={{
                    drawerIcon: ({ color, size }) => <House color={color} size={size} />
               }} />
               <DrawerNavigation.Screen name="Class" component={StudentClassHomePage} options={{
                    drawerIcon: ({ color, size }) => <Presentation color={color} size={size} />
               }} />
               <DrawerNavigation.Screen name="Logout" component={LogoutPage} options={{
                    drawerIcon: ({ color, size }) => <LogOut color={color} size={size} />
               }} />
          </DrawerNavigation.Navigator>
     )
}
