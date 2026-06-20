import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'


import { getUser, deleteUser } from "../../../../redux/ActionCreators/UserActionCreators"

const myStyle = {
     mainButton: {
          backgroundColor: "#0055a5",
          padding: 10
     },
     mainButtonText: {
          color: "white",
          textAlign: "center",
     },
     mainText: {
          fontSize: 25,
          backgroundColor: "gray",
          textAlign: "center",
          color: "white",
          padding: 20
     },
     parentDiv:{
          padding:10,
          marginBottom:20
     },
     mainDiv: {
          flex: 1,
          flexDirection: "row",
     },
     text1: {
          fontSize: 14,
          width: "30%",
          textAlign: "left",
     },
     text2: {
          fontSize: 14,
          padding: 5,
          width: "70%",
          textAlign: "left"
     },
     buttonDiv: {
          flex: 1,
          flexDirection: "row",
     },
     button: {
          backgroundColor: "#0055a5",
          width: "30%",
          padding: 10,
          borderRadius: 0
     },
     buttonText: {
          color: "white",
          textAlign: "center"
     },
}
export default function HomePage({ navigation }) {
     let [data, setData] = useState([])

     let dispatch = useDispatch()
     let UserStateData = useSelector(state => state.UserStateData)

     useEffect(() => {
          (() => {
               dispatch(getUser())
               if (UserStateData.length) {
                    setData(UserStateData.filter(x=>x.role==="Teacher"))
               }
          })()
     }, [UserStateData.length])
     return (
          <ScrollView>
               <TouchableOpacity style={myStyle.mainButton} onPress={() => navigation.navigate("create")}>
                    <Text style={myStyle.mainButtonText}>Add Techer</Text>
               </TouchableOpacity>
               {data.map(item => {
                    return <View style={myStyle.parentDiv} key={item.id} >
                         <View style={myStyle.mainDiv}>
                              <Text style={myStyle.text1}>Id</Text>
                              <Text style={myStyle.text2}>{item.id}</Text>
                         </View>
                         <View style={myStyle.mainDiv}>
                              <Text  style={myStyle.text1}>Name</Text>
                              <Text  style={myStyle.text2}>{item.name}</Text>
                         </View>
                         <View style={myStyle.mainDiv}>
                              <Text  style={myStyle.text1}>Username</Text>
                              <Text  style={myStyle.text2}>{item.username}</Text>
                         </View>
                         <View style={myStyle.mainDiv}>
                              <Text  style={myStyle.text1}>Phone</Text>
                              <Text  style={myStyle.text2}>{item.phone}</Text>
                         </View>
                         <View style={myStyle.mainDiv}>
                              <Text  style={myStyle.text1}>Email</Text>
                              <Text  style={myStyle.text2}>{item.email}</Text>
                         </View>
                         <View style={myStyle.buttonDiv}>
                              <TouchableOpacity style={myStyle.button}>
                                   <Text style={myStyle.buttonText}>Edit</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={{...myStyle.button,backgroundColor:"red"}}>
                                   <Text style={{...myStyle.buttonText}}>Delete</Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               })}
          </ScrollView>
     )
}
