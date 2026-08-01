import React, { useEffect, useState, useRef } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native"
import {
     RichEditor,
     RichToolbar,
     actions
} from 'react-native-pell-rich-editor';

import { Picker } from '@react-native-picker/picker'

import { useDispatch, useSelector } from 'react-redux'
import FormValidator from "../../../../Validators/FormValidator"
import { getEvent, updateEvent } from "../../../../redux/ActionCreators/EventActionCreators"
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
     updateButton: {
          backgroundColor: "#0055a5",
          width: "100%",
          padding: 20,
          borderRadius: 20
     },
     updateButtonText: {
          color: "white",
          textAlign: "center"
     },
     title: {
          textAlign: "center",
          fontSize: 30,
          padding: 20
     }
}
export default function UpdateEventPage({ navigation, route }) {
     let { id } = route.params

     let richText = useRef();
     let [html, setHtml] = useState('');

     let [data, setData] = useState({
          type: "Notes",
          name: "",
     })
     let [errorMessage, setErrorMessage] = useState({
          name: ""
     })
     let [show, setShow] = useState(false)

     let EventStateData = useSelector(state => state.EventStateData)
     let dispatch = useDispatch()


     useEffect(() => {
          (() => {
               dispatch(getEvent())
               if (EventStateData.length) {
                    let item = EventStateData.find(x => x.id === id)
                    setData({ ...data, ...item })
                    setHtml(item.description)
                    richText.current?.setContentHTML(item.description)
               }
          })()
     }, [EventStateData.length])


     function getInputData(key, value) {
          setData({ ...data, [key]: value })
          setErrorMessage({ ...errorMessage, [key]: FormValidator(key, value) })
     }

     async function postData() {
          let error = Object.values(errorMessage).find(x => x !== "")
          if (error)
               setShow(true)
          else if (html === "") {
               setShow(true)
               setErrorMessage({ ...errorMessage, description: "Please Enter Description" })
          }
          else {
               dispatch(updateEvent({
                    ...data,
                    name: data.name,
                    description: html,
                    type: data.type
               }))
               navigation.navigate("show", { id: data.class })
          }
     }

     return (
          <ScrollView>
               <TouchableOpacity style={myStyle.mainButton} onPress={() => navigation.navigate("home")}>
                    <Text style={myStyle.mainButtonText}>Back</Text>
               </TouchableOpacity>
               <Text style={myStyle.title}>Update Event</Text>
               <View style={myStyle.second}>
                    <View style={myStyle.inputDiv}>
                         <TextInput value={data.name} style={show && errorMessage.name ? myStyle.inputError : myStyle.input} keyboardType='default' onChangeText={text => getInputData('name', text)} placeholder='Event Name' />
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
                         <RichToolbar
                              editor={richText}
                              actions={[
                                   actions.setBold,
                                   actions.setItalic,
                                   actions.setUnderline,
                                   actions.insertBulletsList,
                                   actions.insertOrderedList,
                                   actions.heading1,
                                   actions.heading2,
                                   actions.insertLink,
                                   actions.undo,
                                   actions.redo,
                              ]}
                         />
                         <RichEditor
                              ref={richText}
                              placeholder="Please Write Here..."
                              initialHeight={250}
                              onChange={(descriptionText) => {
                                   setHtml(descriptionText);
                              }}
                         />
                         {show && errorMessage.description ? <Text style={myStyle.errorMessage}>{errorMessage.description}</Text> : null}
                    </View>
                    <TouchableOpacity style={myStyle.updateButton} onPress={postData}>
                         <Text style={myStyle.updateButtonText}>Update</Text>
                    </TouchableOpacity>
               </View>
          </ScrollView>
     )
}
