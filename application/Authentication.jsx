import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { useSelector } from 'react-redux'

import AuthenticationNavigation from "./navigation/AuthenticationNavigation"
import AdminNavigation from "./navigation/AdminNavigation"

export default function Authentication() {
     let UserAuthData = useSelector(state => state.UserAuthData)
     return (
          <NavigationContainer>
               {
                    UserAuthData.isLogin ?
                         <AdminNavigation /> :
                         <AuthenticationNavigation />
               }
          </NavigationContainer>
     )
}
