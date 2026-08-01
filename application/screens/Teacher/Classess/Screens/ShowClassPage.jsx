import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { PenBox, Trash } from "lucide-react-native"
import RenderHTML from 'react-native-render-html';

import { getClass, updateClass } from "../../../../redux/ActionCreators/ClassActionCreators"
import { getUser } from "../../../../redux/ActionCreators/UserActionCreators"
import { getEvent, deleteEvent } from "../../../../redux/ActionCreators/EventActionCreators"
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
     contentDiv: {
          padding: 20
     },
     contentText1: {
          fontSize: 25,
          textAlign: "center",
     },
     contentText2: {
          fontSize: 20,
          textAlign: "center",
          borderBottomWidth: 5,
          borderBottomColor: "gray",
          marginBottom: 10
     },
     contentText3: {
          fontSize: 16,
          textAlign: "justify",
          padding: 20,
          marginBottom: 10
     },
     bottomButtonDiv: {
          flex: 1,
          flexDirection: "row",
          marginTop:20
     },
}
export default function ShowClassPage({ navigation, route }) {
     let { id } = route.params
     let [data, setData] = useState({})
     let [eventData, setEventData] = useState({})
     let [pendingStudents, setPendingStudents] = useState([])

     let dispatch = useDispatch()
     let ClassStateData = useSelector(state => state.ClassStateData)
     let UserStateData = useSelector(state => state.UserStateData)
     let EventStateData = useSelector(state => state.EventStateData)

     function deleteRecord(id) {
          Alert.alert("Delete Record", "Are You Sure You Want to Delete This Record?", [
               {
                    text: "Cancel",
                    style: "cancel"
               },
               {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                         dispatch(deleteEvent({ id: id }))
                         setEventData(eventData.filter(x => x.id !== id))
                    }
               }
          ])
     }

     function approve(id) {
          let index = data.student.findIndex(x => x.student === id)
          data.student[index].status = "Approved"
          dispatch(updateClass({ ...data }))
          setData(data)
          setPendingStudents(data.student?.map(x => UserStateData.find(s => s.id === x.student)))
     }

     function cancel(id) {
          let index = data.student.findIndex(x => x.student === id)
          data.student[index].status = "Cancelled"
          dispatch(updateClass({ ...data }))
          setData(data)
          setPendingStudents(data.student?.map(x => UserStateData.find(s => s.id === x.student)))
     }
     useEffect(() => {
          (() => {
               dispatch(getClass())
               if (ClassStateData.length && UserStateData.length) {
                    let item = ClassStateData.find(x => x.id === id)
                    setData({ ...item })
                    let students = []
                    setPendingStudents(item.student?.forEach(x => {
                         let s = UserStateData.find(s => s.id === x.student && x.status !== "Approved")
                         if (s) {
                              students.push({ ...s, status: x.status })
                         }
                    }))
                    setPendingStudents(students)
               }
          })()
     }, [ClassStateData.length, UserStateData])

     useEffect(() => {
          (() => {
               dispatch(getUser())
          })()
     }, [UserStateData.length])

     useEffect(() => {
          (() => {
               dispatch(getEvent())
               if (EventStateData.length) {
                    setEventData(EventStateData.filter(x => x.class === id))
               }
          })()
     }, [EventStateData.length])
     return (
          <>
               <TouchableOpacity style={myStyle.mainButton} onPress={() => navigation.navigate("home")}>
                    <Text style={myStyle.mainButtonText}>Back</Text>
               </TouchableOpacity>
               <ScrollView>
                    <Text style={myStyle.mainText}>{data.name}</Text>
                    {pendingStudents.length ?
                         <View style={myStyle.parentDiv}>
                              <Text style={{ ...myStyle.mainText, backgroundColor: "skyblue" }}>Pending Approval</Text>
                              {pendingStudents.map((item, index) => {
                                   return <View key={index}>
                                        <Text style={myStyle.text2}>{item.name}</Text>
                                        <Text style={myStyle.text2}>{item.email}</Text>
                                        <Text style={myStyle.text2}>{item.phone}</Text>
                                        <Text style={myStyle.text2}>Status : {item.status}</Text>
                                        <View style={myStyle.buttonDiv}>
                                             <TouchableOpacity style={{ ...myStyle.button, backgroundColor: "green" }} onPress={() => approve(item.id)}>
                                                  <Text style={{ ...myStyle.buttonText }}>Approve</Text>
                                             </TouchableOpacity>
                                             <TouchableOpacity onPress={() => cancel(item.id)} style={{ ...myStyle.button, backgroundColor: "red" }}>
                                                  <Trash size={20} color={"white"} />
                                                  <Text style={{ ...myStyle.buttonText }}>Cancel</Text>
                                             </TouchableOpacity>
                                        </View>
                                   </View>
                              })}
                         </View>
                         :
                         null
                    }

                    <View style={myStyle.buttonDiv}>
                         <TouchableOpacity style={{ ...myStyle.button, backgroundColor: "green" }} onPress={() => navigation.navigate("create-event", { id: id })}>
                              <Text style={{ ...myStyle.buttonText }}>Create Events</Text>
                         </TouchableOpacity>
                    </View>

                    <ScrollView>
                         {eventData.length && eventData?.map((item,index) => {
                              return <View key={index} style={myStyle.contentDiv}>
                                   <Text style={myStyle.contentText1}>{item.name}</Text>
                                   <Text style={myStyle.contentText2}>({item.type})</Text>
                                   <Text>
                                        <RenderHTML
                                        contentWidth={"100%"}
                                        style={{padding:20}}
                                        source={{ html: item.description }}
                                   />
                                   </Text>
                                   <View style={myStyle.bottomButtonDiv}>
                                        <TouchableOpacity onPress={() => navigation.navigate("update-event", { id: item.id })} style={{ ...myStyle.button, backgroundColor: "green" }}>
                                             <PenBox size={20} color={"white"} />
                                             <Text style={{ ...myStyle.buttonText }}>Update</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deleteRecord(item.id)} style={{ ...myStyle.button, backgroundColor: "red" }}>
                                             <Trash size={20} color={"white"} />
                                             <Text style={{ ...myStyle.buttonText }}>Delete</Text>
                                        </TouchableOpacity>
                                   </View>
                              </View>
                         })}
                    </ScrollView>
               </ScrollView>
          </>
     )
}
