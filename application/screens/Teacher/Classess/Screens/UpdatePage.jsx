import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native"

import Storage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from 'react-redux'
import FormValidator from "../../../../Validators/FormValidator"
import { updateClass, getClass } from "../../../../redux/ActionCreators/ClassActionCreators"
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
}
export default function UpdatePage({ navigation, route }) {
     let { id } = route.params
     let [data, setData] = useState({
          name: "",
          description: ""
     })
     let [errorMessage, setErrorMessage] = useState({
          name: "",
          description: ""
     })
     let [show, setShow] = useState(false)

     let dispatch = useDispatch()
     let ClassStateData = useSelector(state => state.ClassStateData)


     useEffect(() => {
          (() => {
               dispatch(getClass())
               if (ClassStateData.length) {
                    let item = ClassStateData.find(x => x.id === id)
                    setData({ ...data, ...item })
               }
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
               let teacherId = await Storage.getItem("userid")
               let item = ClassStateData.find((x) => x.name?.toLowerCase() === data.name?.toLowerCase() && x.teacher === teacherId)
               if (item) {
                    setShow(true)
                    setErrorMessage({
                         ...errorMessage,
                         name: "Class With This Name Already Exist"
                    })
               }
               else {
                    dispatch(updateClass({ ...data }))
                    navigation.navigate("home")
               }
          }
     }

     return (
          <ScrollView>
               <TouchableOpacity style={myStyle.mainButton} onPress={() => navigation.navigate("home")}>
                    <Text style={myStyle.mainButtonText}>Back</Text>
               </TouchableOpacity>
               <View style={myStyle.second}>
                    <View style={myStyle.inputDiv}>
                         <TextInput value={data.name} style={show && errorMessage.name ? myStyle.inputError : myStyle.input} keyboardType='default' onChangeText={text => getInputData('name', text)} placeholder='Class Name' />
                         {show && errorMessage.name ? <Text style={myStyle.errorMessage}>{errorMessage.name}</Text> : null}
                    </View>
                    <View style={myStyle.inputDiv}>
                         <TextInput multiline={true} value={data.description} numberOfLines={5} style={{ ...show && errorMessage.description ? myStyle.inputError : myStyle.input, height: 130 }} keyboardType='default' onChangeText={text => getInputData('description', text)} placeholder='Class Description' />
                         {show && errorMessage.description ? <Text style={myStyle.errorMessage}>{errorMessage.description}</Text> : null}
                    </View>
                    <TouchableOpacity style={myStyle.updateButton} onPress={postData}>
                         <Text style={myStyle.updateButtonText}>Update</Text>
                    </TouchableOpacity>
               </View>
          </ScrollView>
     )
}
