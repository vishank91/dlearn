import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Storage from "@react-native-async-storage/async-storage";
import { Trash, Eye, PenBox } from "lucide-react-native"

import { getClass, deleteClass } from "../../../../redux/ActionCreators/ClassActionCreators"

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
     parentDiv: {
          padding: 10,
          marginBottom: 20
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
          justifyContent: "space-between"
     },
     button: {
          backgroundColor: "#0055a5",
          width: "30%",
          padding: 7,
          borderRadius: 0,
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
     },
     buttonText: {
          color: "white",
          textAlign: "center",
          marginLeft: 5
     },
}
export default function HomePage({ navigation }) {
     let [data, setData] = useState([])

     let dispatch = useDispatch()
     let ClassStateData = useSelector(state => state.ClassStateData)

     useEffect(() => {
          (async () => {
               dispatch(getClass())
               if (ClassStateData.length) {
                    let studentId = await Storage.getItem('userid')
                    setData(ClassStateData.filter((x) => x.student?.include(studentId)))
               }
          })()
     }, [ClassStateData.length])
     return (
          <>
               <TouchableOpacity style={myStyle.mainButton} onPress={() => navigation.navigate("join")}>
                    <Text style={myStyle.mainButtonText}>Join Class</Text>
               </TouchableOpacity>
               <ScrollView>
                    {data.map((item, index) => {
                         return <View style={myStyle.parentDiv} key={index} >
                              <View style={myStyle.mainDiv}>
                                   <Text style={myStyle.text1}>Id</Text>
                                   <Text style={myStyle.text2}>{item.id}</Text>
                              </View>
                              <View style={myStyle.mainDiv}>
                                   <Text style={myStyle.text1}>Name</Text>
                                   <Text style={myStyle.text2}>{item.name}</Text>
                              </View>
                              <View style={myStyle.mainDiv}>
                                   <Text style={myStyle.text1}>Description</Text>
                                   <Text style={myStyle.text2}>{item.description}</Text>
                              </View>
                              <View style={myStyle.buttonDiv}>
                                   <TouchableOpacity style={{ ...myStyle.button, backgroundColor: "green" }}>
                                        <Eye size={20} color={"white"} />
                                        <Text style={{ ...myStyle.buttonText }}>View Class</Text>
                                   </TouchableOpacity>
                              </View>
                         </View>
                    })}
               </ScrollView>
          </>
     )
}
