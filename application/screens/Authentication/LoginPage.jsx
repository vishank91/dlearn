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
        height: "35%",
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
        top: 110,
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
    bottomButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20
    },
    bottomButtonText: {
        color: "#0055a5"
    }
}
export default function LoginPage({ navigation }) {
    let [showPassword, setShowPassword] = useState(false)
    let [data, setData] = useState({
        username: "",
        password: ""
    })

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
            <Text style={mystyle.mainText}>DLEARN</Text>
            <View style={mystyle.first}>
                <View style={mystyle.center}>
                    <View style={mystyle.circle}><GraduationCap size={70} color="white"></GraduationCap></View>
                    <Text style={mystyle.text1}>Sign In</Text>
                </View>
            </View>
            <View style={mystyle.second}>
                <TextInput style={mystyle.input} onChangeText={text => getInputData('username', text)} placeholder='Username' />
                <TextInput style={mystyle.input} onChangeText={text => getInputData('password', text)} secureTextEntry={!showPassword} placeholder='Password'  >
                </TextInput>
                {showPassword ?
                    <EyeOff color="#0055a5" style={mystyle.showHideIcon} onPress={() => setShowPassword(false)} size={40}></EyeOff> :
                    <Eye color="#0055a5" style={mystyle.showHideIcon} onPress={() => setShowPassword(true)} size={40}></Eye>
                }
                <TouchableOpacity style={mystyle.loginButton} onPress={postData}>
                    <Text style={mystyle.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={mystyle.bottomButton}>
                <TouchableOpacity>
                    <Text style={mystyle.bottomButtonText}>Forget Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                    <Text style={mystyle.bottomButtonText}>Doesn't Have an Account? Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
