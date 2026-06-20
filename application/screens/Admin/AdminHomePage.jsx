import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Storage from '@react-native-async-storage/async-storage'

import { getUser } from "../../redux/ActionCreators/UserActionCreators"
import { useDispatch, useSelector } from 'react-redux'

const myStyle = {
     mainText: {
          fontSize: 25,
          backgroundColor: "gray",
          textAlign: "center",
          color: "white",
          padding: 20
     },
     mainDiv: {
          flex: 1,
          flexDirection: "row",
          padding: 10,
     },
     text1: {
          fontSize: 18,
          padding: 5,
          width: "30%",
          textAlign: "left",
     },
     text2: {
          fontSize: 18,
          padding: 5,
          width: "70%",
          textAlign: "left"
     }
}
export default function AdminHomePage() {
     let [data, setData] = useState({})

     let UserStateData = useSelector(state => state.UserStateData)
     let dispatch = useDispatch()

     useEffect(() => {
          (async () => {
               dispatch(getUser())
               if (UserStateData.length) {
                    let userid = await Storage.getItem("userid")
                    setData(UserStateData.find(x => x.id === userid))
               }
          })()
     }, [UserStateData.length])
     return (
          <ScrollView>
               <Text style={myStyle.mainText}>Admin Profile</Text>
               <View style={myStyle.mainDiv}>
                    <Text style={myStyle.text1}>Name</Text>
                    <Text style={myStyle.text2}>{data.name}</Text>
               </View>
               <View style={myStyle.mainDiv}>
                    <Text style={myStyle.text1}>Username</Text>
                    <Text style={myStyle.text2}>{data.username}</Text>
               </View>
               <View style={myStyle.mainDiv}>
                    <Text style={myStyle.text1}>Eamil Address</Text>
                    <Text style={myStyle.text2}>{data.email}</Text>
               </View>
               <View style={myStyle.mainDiv}>
                    <Text style={myStyle.text1}>Phone</Text>
                    <Text style={myStyle.text2}>{data.phone}</Text>
               </View>
               <View style={myStyle.mainDiv}>
                    <Text style={myStyle.text1}>Role</Text>
                    <Text style={myStyle.text2}>{data.role}</Text>
               </View>
          </ScrollView>
     )
}
