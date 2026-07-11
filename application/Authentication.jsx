import React, { useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { useSelector } from 'react-redux'

import AuthenticationNavigation from "./navigation/AuthenticationNavigation"
import AdminNavigation from "./navigation/AdminNavigation"
import TeacherNavigation from "./navigation/TeacherNavigation"
import StudentNavigation from "./navigation/StudentNavigation"

export default function Authentication() {
     let UserAuthData = useSelector(state => state.UserAuthData)
     return (
          <NavigationContainer>
               {
                    UserAuthData.isLogin ?
                         UserAuthData.role === "Teacher" ? <TeacherNavigation /> : UserAuthData.role === "Student" ? <StudentNavigation /> : <AdminNavigation /> :
                         <AuthenticationNavigation />
               }
          </NavigationContainer>
     )
}
