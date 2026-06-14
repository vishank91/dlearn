import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, TextInput, Alert, TouchableOpacity } from "react-native"
import { GraduationCap, Eye, EyeOff } from "lucide-react-native"

import { useDispatch, useSelector } from 'react-redux'

import FormValidator from "../../Validators/FormValidator"

import { createUser, getUser } from "../../redux/ActionCreators/UserActionCreators"
const mystyle = {
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
                    role: "Student",
                    status: true
                }))
                navigation.navigate("login")
            }
        }
    }

    return (
        <ScrollView style={mystyle.main}>
            <View style={mystyle.first}>
                <View style={mystyle.center}>
                    <View style={mystyle.circle}><GraduationCap size={70} color="white"></GraduationCap></View>
                    <Text style={mystyle.text1}>Sign UP</Text>
                </View>
            </View>
            <View style={mystyle.second}>
                <View style={mystyle.inputDiv}>
                    <TextInput style={show && errorMessage.name ? mystyle.inputError : mystyle.input} keyboardType='default' onChangeText={text => getInputData('name', text)} placeholder='Full Name' />
                    {show && errorMessage.name ? <Text style={mystyle.errorMessage}>{errorMessage.name}</Text> : null}
                </View>
                <View style={mystyle.inputDiv}>
                    <TextInput style={show && errorMessage.username ? mystyle.inputError : mystyle.input} keyboardType='default' onChangeText={text => getInputData('username', text)} placeholder='Username' />
                    {show && errorMessage.username ? <Text style={mystyle.errorMessage}>{errorMessage.username}</Text> : null}
                </View>
                <View style={mystyle.inputDiv}>
                    <TextInput style={show && errorMessage.email ? mystyle.inputError : mystyle.input} keyboardType='email-address' onChangeText={text => getInputData('email', text)} placeholder='Email Address' />
                    {show && errorMessage.email ? <Text style={mystyle.errorMessage}>{errorMessage.email}</Text> : null}
                </View>
                <View style={mystyle.inputDiv}>
                    <TextInput style={show && errorMessage.phone ? mystyle.inputError : mystyle.input} keyboardType='phone-pad' onChangeText={text => getInputData('phone', text)} placeholder='Phone Number' />
                    {show && errorMessage.phone ? <Text style={mystyle.errorMessage}>{errorMessage.phone}</Text> : null}
                </View>
                <View style={mystyle.inputDiv}>
                    <View style={mystyle.passwordDiv}>
                        <TextInput style={show && errorMessage.password ? mystyle.inputError : mystyle.input} onChangeText={text => getInputData('password', text)} secureTextEntry={!showPassword} placeholder='Enter Password'  ></TextInput>
                        {showPassword ?
                            <EyeOff color="#0055a5" style={mystyle.showHideIcon} onPress={() => setShowPassword(false)} size={40}></EyeOff> :
                            <Eye color="#0055a5" style={mystyle.showHideIcon} onPress={() => setShowPassword(true)} size={40}></Eye>
                        }
                    </View>
                    {show && errorMessage.password ? errorMessage.password.split("|").map((error, index) => {
                        return <Text style={mystyle.errorMessage} key={index}>{error}</Text>
                    }) : null}
                </View>
                <View style={mystyle.inputDiv}>
                    <TextInput style={show && errorMessage.password ? mystyle.inputError : mystyle.input} onChangeText={text => getInputData('cpassword', text)} secureTextEntry={!showPassword} placeholder='Confirm Password'  ></TextInput>
                </View>
                <TouchableOpacity style={mystyle.loginButton} onPress={postData}>
                    <Text style={mystyle.loginButtonText}>Signup</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text style={mystyle.bottomButtonText}>Already Have an Account? Login</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
