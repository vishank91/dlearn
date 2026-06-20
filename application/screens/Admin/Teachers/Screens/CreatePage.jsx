import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native"


import { useDispatch, useSelector } from 'react-redux'
import FormValidator from "../../../../Validators/FormValidator"
import { createUser, getUser } from "../../../../redux/ActionCreators/UserActionCreators"
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
     first: {
          width: "100%",
          height: "25%",
          justifyContent: "center",
          alignItems: "center"
     },
     center: {
          height: 130,
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
     },
     circle: {
          height: 90,
          width: 90,
          borderRadius: 45,
          backgroundColor: "#0055a5",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
     },
     mainText: {
          fontSize: 50,
          fontWeight: "bolder",
          color: "#0055a5",
          textAlign: "center",
          marginTop: 100
     },
     text1: {
          fontSize: 30,
          fontWeight: "bolder",
          color: "#0055a5"
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
     passwordDiv: {
          position: "relative"
     },
     errorMessage: {
          marginLeft: 10,
          color: "red"
     },
     showHideIcon: {
          position: "absolute",
          bottom: 12,
          right: 50
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
     bottomButtonText: {
          color: "#0055a5",
          marginLeft: 25
     }
}
export default function CreatePage({ navigation }) {
     let [data, setData] = useState({
          name: "",
          username: "",
          email: "",
          phone: "",
          password: "",
          cpassword: ""
     })
     let [errorMessage, setErrorMessage] = useState({
          name: "Name Field is Mendatory",
          username: "UserName Field is Mendatory",
          email: "Email Address Field is Mendatory",
          phone: "Phone Field is Mendatory",
          password: "Password Field is Mendatory"
     })
     let [show, setShow] = useState(false)

     let dispatch = useDispatch()
     let UserStateData = useSelector(state => state.UserStateData)


     useEffect(() => {
          (() => {
               dispatch(getUser())
          })()
     }, [UserStateData.length])


     function getInputData(key, value) {
          setData({ ...data, [key]: value })
          setErrorMessage({ ...errorMessage, [key]: FormValidator(key, value) })
     }

     function postData() {
          let error = Object.values(errorMessage).find(x => x !== "")
          if (error)
               setShow(true)
          else if (data.password !== data.cpassword) {
               setShow(true)
               setErrorMessage({ ...errorMessage, password: "Password and Condirm Password Doesn't Matched" })
          }
          else {
               let item = UserStateData.find(x => x.username?.toLowerCase() === data.username?.toLowerCase() || x.email?.toLowerCase() === data.email?.toLowerCase())
               if (item) {
                    setShow(true)
                    setErrorMessage({
                         ...errorMessage,
                         username: item.username?.toLowerCase() === data.username?.toLowerCase() ? "Username Already Taken" : "",
                         email: item.email?.toLowerCase() === data.email?.toLowerCase() ? "Email Address Already Taken" : ""
                    })
               }
               else {
                    dispatch(createUser({
                         name: data.name,
                         username: data.username,
                         email: data.email,
                         phone: data.phone,
                         password: data.password,
                         role: "Teacher",
                         status: true
                    }))
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
                         <TextInput style={show && errorMessage.name ? myStyle.inputError : myStyle.input} keyboardType='default' onChangeText={text => getInputData('name', text)} placeholder='Full Name' />
                         {show && errorMessage.name ? <Text style={myStyle.errorMessage}>{errorMessage.name}</Text> : null}
                    </View>
                    <View style={myStyle.inputDiv}>
                         <TextInput style={show && errorMessage.username ? myStyle.inputError : myStyle.input} keyboardType='default' onChangeText={text => getInputData('username', text)} placeholder='Username' />
                         {show && errorMessage.username ? <Text style={myStyle.errorMessage}>{errorMessage.username}</Text> : null}
                    </View>
                    <View style={myStyle.inputDiv}>
                         <TextInput style={show && errorMessage.email ? myStyle.inputError : myStyle.input} keyboardType='email-address' onChangeText={text => getInputData('email', text)} placeholder='Email Address' />
                         {show && errorMessage.email ? <Text style={myStyle.errorMessage}>{errorMessage.email}</Text> : null}
                    </View>
                    <View style={myStyle.inputDiv}>
                         <TextInput style={show && errorMessage.phone ? myStyle.inputError : myStyle.input} keyboardType='phone-pad' onChangeText={text => getInputData('phone', text)} placeholder='Phone Number' />
                         {show && errorMessage.phone ? <Text style={myStyle.errorMessage}>{errorMessage.phone}</Text> : null}
                    </View>
                    <View style={myStyle.inputDiv}>
                         <TextInput style={show && errorMessage.password ? myStyle.inputError : myStyle.input}
                         secureTextEntry={true} onChangeText={text => getInputData('password', text)} placeholder='Password' />
                         {show && errorMessage.password ? <Text style={myStyle.errorMessage}>{errorMessage.password}</Text> : null}
                    </View>
                    <View style={myStyle.inputDiv}>
                         <TextInput style={show && errorMessage.password ? myStyle.inputError : myStyle.input}
                         secureTextEntry={true} onChangeText={text => getInputData('cpassword', text)} placeholder='Confirm Password' />
                    </View>
                    <TouchableOpacity style={myStyle.createButton} onPress={postData}>
                         <Text style={myStyle.createButtonText}>Create</Text>
                    </TouchableOpacity>
               </View>
          </ScrollView>
     )
}
