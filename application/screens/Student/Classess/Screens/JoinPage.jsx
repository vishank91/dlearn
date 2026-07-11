import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native"

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
     createButton: {
          backgroundColor: "#0055a5",
          width: "100%",
          padding: 20,
          borderRadius: 20
     },
     createButtonText: {
          color: "white",
          textAlign: "center"
     }
}
export default function JoinPage({ navigation }) {
     let [data, setData] = useState({
          classId: ""
     })
     let [errorMessage, setErrorMessage] = useState({
          classId: "Class Id Field is Mendatory",
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
               let item = ClassStateData.find((x) => x.id === data.classId)
               let studentId = await Storage.getItem("userid")
               let record = {
                    student: studentId,
                    status: "Pending"
               }
               if (item) {
                    dispatch(updateClass({
                         ...item,
                         student: Object.hasOwn(item, 'student') ? item.student.push(record) : [{ ...record }]
                    }))
                    navigation.navigate("home")
               }
               else
                    Alert.alert("Error", "Class Doesn't Exist, Please Enter Correct Class ID")
          }
     }

     return (
          <ScrollView>
               <TouchableOpacity style={myStyle.mainButton} onPress={() => navigation.navigate("home")}>
                    <Text style={myStyle.mainButtonText}>Back</Text>
               </TouchableOpacity>
               <View style={myStyle.second}>
                    <View style={myStyle.inputDiv}>
                         <TextInput style={show && errorMessage.name ? myStyle.inputError : myStyle.input} keyboardType='default' onChangeText={text => getInputData('name', text)} placeholder='Class Name' />
                         {show && errorMessage.name ? <Text style={myStyle.errorMessage}>{errorMessage.name}</Text> : null}
                    </View>
                    <TouchableOpacity style={myStyle.createButton} onPress={postData}>
                         <Text style={myStyle.createButtonText}>Join Class</Text>
                    </TouchableOpacity>
               </View>
          </ScrollView>
     )
}
