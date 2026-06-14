import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, TextInput, Alert, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from 'react-redux'

import Storage from "@react-native-async-storage/async-storage";

import { GraduationCap, Eye, EyeOff } from "lucide-react-native"
import { getUser } from "../../redux/ActionCreators/UserActionCreators"

import { userLogin } from "../../redux/ActionCreators/UserAuthCreators"
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
    errorMessage: {
        marginLeft: 10,
        color: "red"
    },
    second: {
        padding: 20,
        position: "relative"
    },
    input: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
    },
    inputDiv: {
        marginBottom: 10,
    },
    passwordDiv: {
        position: "relative"
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
    let [errorMessage, setErrorMessage] = useState("")

    let dispatch = useDispatch()
    let UserStateData = useSelector(state => state.UserStateData)

    let [data, setData] = useState({
        username: "",
        password: ""
    })
    useEffect(() => {
        (async () => {
            dispatch(getUser())
            if (await Storage.getItem("login") === "true") {
                let userid = await Storage.getItem("userid")
                let item = UserStateData.find(x => x.id === userid)
                dispatch(userLogin({ ...item }))
            }
        })()
    }, [UserStateData.length])


    function getInputData(key, value) {
        setData({ ...data, [key]: value })
    }

    async function postData() {
        let item = UserStateData.find(x => x.username === data.username && x.password === data.password)
        if (item) {
            await Storage.setItem("login", "true")
            await Storage.setItem("name", item.name)
            await Storage.setItem("userid", item.id)
            await Storage.setItem("role", item.role)
            dispatch(userLogin({ ...item }))
        }
        else {
            setErrorMessage("Invalid Userename or Password")
        }
    }
    return (
        <ScrollView style={mystyle.main}>
            <Text style={mystyle.mainText}>DLEARN</Text>
            <View style={mystyle.first}>
                <View style={mystyle.center}>
                    <View style={mystyle.circle}><GraduationCap size={70} color="white"></GraduationCap></View>
                    <Text style={mystyle.text1}>Sign In</Text>
                </View>
            </View>
            <View style={mystyle.second}>
                <View style={mystyle.inputDiv}>
                    <TextInput style={mystyle.input} onChangeText={text => getInputData('username', text)} placeholder='Username' />
                    {errorMessage ? <Text style={mystyle.errorMessage}>{errorMessage}</Text> : null}
                </View>
                <View style={mystyle.inputDiv}>
                    <View style={mystyle.passwordDiv}>
                        <TextInput style={mystyle.input} onChangeText={text => getInputData('password', text)} secureTextEntry={!showPassword} placeholder='Password'  >
                        </TextInput>
                        {showPassword ?
                            <EyeOff color="#0055a5" style={mystyle.showHideIcon} onPress={() => setShowPassword(false)} size={40}></EyeOff> :
                            <Eye color="#0055a5" style={mystyle.showHideIcon} onPress={() => setShowPassword(true)} size={40}></Eye>
                        }
                    </View>
                </View>
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
        </ScrollView>
    )
}
