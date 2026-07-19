import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native"

import Storage from "@react-native-async-storage/async-storage";

import { Picker } from '@react-native-picker/picker'

import { useDispatch, useSelector } from 'react-redux'
import FormValidator from "../../../../Validators/FormValidator"
import { getClass } from "../../../../redux/ActionCreators/ClassActionCreators"
import { getEvent, createEvent } from "../../../../redux/ActionCreators/EventActionCreators"
const myStyle = {
     mainButton: {
          backgroundColor: "#0055a5",
          padding: 10
     },
     mainButtonText: {
          color: "white",
          textAlign: "center",
     },
     main: {
          backgroundColor: "#dcdcde",
          height: "100%",
          width: "100%",
          marginTop: "30px"
     },
     center: {
          height: 130,
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
     },
     second: {
          padding: 20,
     },
     input: {
          backgroundColor: "white",
          padding: 20,
          borderRadius: 20,
     },
     inputError: {
          backgroundColor: "white",
          padding: 20,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "red"
     },
     inputDiv: {
          marginBottom: 10,
     },
     errorMessage: {
          marginLeft: 10,
          color: "red"
     },
     createButton: {
          backgroundColor: "#0055a5",
          width: "100%",
          padding: 20,
          borderRadius: 20
     },
     createButtonText: {
          color: "white",
          textAlign: "center"
     },
     title: {
          textAlign: "center",
          fontSize: 30,
          padding: 20
     }
}
export default function CreateEventPage({ navigation, route }) {
     let { id } = route.params
     let [data, setData] = useState({
          type: "Notes",
          name: "",
          description: ""
     })
     let [errorMessage, setErrorMessage] = useState({
          name: "Name Field is Mendatory",
          description: "Description Field is Mendatory"
     })
     let [show, setShow] = useState(false)

     let dispatch = useDispatch()
     let ClassStateData = useSelector(state => state.ClassStateData)


     useEffect(() => {
          (() => {
               dispatch(getClass())
          })()
     }, [ClassStateData.length])


     function getInputData(key, value) {
          setData({ ...data, [key]: value })
          setErrorMessage({ ...errorMessage, [key]: FormValidator(key, value) })
     }

     async function postData() {
          let error = Object.values(errorMessage).find(x => x !== "")
          if (error)
               setShow(true)
          else {
               dispatch(createEvent({
                    name: data.name,
                    description: data.description,
                    type: data.type,
                    class: id,
                    status: true
               }))
               navigation.navigate("show", { id: id })
          }
     }

     return (
          <ScrollView>
               <TouchableOpacity style={myStyle.mainButton} onPress={() => navigation.navigate("home")}>
                    <Text style={myStyle.mainButtonText}>Back</Text>
               </TouchableOpacity>
               <Text style={myStyle.title}>Create Event</Text>
               <View style={myStyle.second}>
                    <View style={myStyle.inputDiv}>
                         <TextInput style={show && errorMessage.name ? myStyle.inputError : myStyle.input} keyboardType='default' onChangeText={text => getInputData('name', text)} placeholder='Event Name' />
                         {show && errorMessage.name ? <Text style={myStyle.errorMessage}>{errorMessage.name}</Text> : null}
                    </View>
                    <View style={myStyle.inputDiv}>
                         <Picker style={myStyle.input} selectedValue={data.type} onValueChange={(itemValue) => setData({ ...data, type: itemValue })}>
                              <Picker.item label="Notes" value="Notes" />
                              <Picker.item label="Assignment" value="Assignment" />
                              <Picker.item label="Quiz" value="Quiz" />
                         </Picker>
                    </View>
                    <View style={myStyle.inputDiv}>
                         <TextInput multiline={true} style={{ ...show && errorMessage.description ? myStyle.inputError : myStyle.input, height: 300 }} keyboardType='default' onChangeText={text => getInputData('description', text)} placeholder='Event Description' />
                         {show && errorMessage.description ? <Text style={myStyle.errorMessage}>{errorMessage.description}</Text> : null}
                    </View>
                    <TouchableOpacity style={myStyle.createButton} onPress={postData}>
                         <Text style={myStyle.createButtonText}>Create</Text>
                    </TouchableOpacity>
               </View>
          </ScrollView>
     )
}
