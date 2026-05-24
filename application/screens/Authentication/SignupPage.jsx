import React, { useState } from 'react'
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native"

import { GraduationCap, Eye, EyeOff } from "lucide-react-native"
const mystyle = {
    main: {
        backgroundColor: "#dcdcde",
        height: "100%",
        width: "100%"
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
        position: "relative"
    },
    input: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        marginBottom: 20
    },
    showHideIcon: {
        position: "absolute",
        bottom: 188,
        right: 50
    },
    loginButton: {
        backgroundColor: "#0055a5",
        width: "100%",
        padding: 20,
        borderRadius: 20
    },
    loginButtonText: {
        color: "white",
        textAlign: "center"
    },
    bottomButtonText: {
        color: "#0055a5",
        marginLeft: 25
    }
}
export default function SignPage({ navigation }) {
    let [showPassword, setShowPassword] = useState(false)
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

    function getInputData(key, value) {
        setData({ ...data, [key]: value })
    }

    function postData() {
        Alert.alert(`Input`, `
            Name : ${data.name}
            Password : ${data.password}`)
    }
    return (
        <View style={mystyle.main}>
            <View style={mystyle.first}>
                <View style={mystyle.center}>
                    <View style={mystyle.circle}><GraduationCap size={70} color="white"></GraduationCap></View>
                    <Text style={mystyle.text1}>Sign UP</Text>
                </View>
            </View>
            <View style={mystyle.second}>
                <TextInput style={mystyle.input} onChangeText={text => getInputData('name', text)} placeholder='Full Name' />
                <TextInput style={mystyle.input} onChangeText={text => getInputData('username', text)} placeholder='Username' />
                <TextInput style={mystyle.input} onChangeText={text => getInputData('email', text)} placeholder='Email Address' />
                <TextInput style={mystyle.input} onChangeText={text => getInputData('phone', text)} placeholder='Phone Number' />
                <TextInput style={mystyle.input} onChangeText={text => getInputData('password', text)} secureTextEntry={!showPassword} placeholder='Enter Password'  ></TextInput>
                <TextInput style={mystyle.input} onChangeText={text => getInputData('cpassword', text)} secureTextEntry={!showPassword} placeholder='Confirm Password'  ></TextInput>
                {showPassword ?
                    <EyeOff color="#0055a5" style={mystyle.showHideIcon} onPress={() => setShowPassword(false)} size={40}></EyeOff> :
                    <Eye color="#0055a5" style={mystyle.showHideIcon} onPress={() => setShowPassword(true)} size={40}></Eye>
                }
                <TouchableOpacity style={mystyle.loginButton} onPress={postData}>
                    <Text style={mystyle.loginButtonText}>Signup</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text style={mystyle.bottomButtonText}>Already Have an Account? Login</Text>
            </TouchableOpacity>
        </View>
    )
}
