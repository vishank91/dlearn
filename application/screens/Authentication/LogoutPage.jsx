import React from 'react'
import Storage from "@react-native-async-storage/async-storage";

import { userLogout } from "../../redux/ActionCreators/UserAuthCreators"
import { useDispatch } from 'react-redux';
export default async function LogoutPage() {
     let dispatch = useDispatch()
     await Storage.clear()
     dispatch(userLogout())
}    
