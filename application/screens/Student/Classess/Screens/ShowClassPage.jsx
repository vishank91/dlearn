import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import RenderHTML from 'react-native-render-html';

import { getEvent } from "../../../../redux/ActionCreators/EventActionCreators"
const myStyle = {
     mainButton: {
          backgroundColor: "#0055a5",
          padding: 10
     },
     mainButtonText: {
          color: "white",
          textAlign: "center",
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
     }
}
export default function ShowClassPage({ navigation, route }) {
     let { id } = route.params
     let [eventData, setEventData] = useState({})

     let dispatch = useDispatch()
     let EventStateData = useSelector(state => state.EventStateData)

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
                    <ScrollView>
                         {eventData.length && eventData?.map((item, index) => {
                              return <View key={index} style={myStyle.contentDiv}>
                                   <Text style={myStyle.contentText1}>{item.name}</Text>
                                   <Text style={myStyle.contentText2}>({item.type})</Text>
                                   <Text>
                                        <RenderHTML
                                             contentWidth={"100%"}
                                             style={{ padding: 20 }}
                                             source={{ html: item.description }}
                                        />
                                   </Text>
                              </View>
                         })}
                    </ScrollView>
               </ScrollView>
          </>
     )
}
