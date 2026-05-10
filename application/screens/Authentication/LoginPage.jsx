import React from 'react'
import { View, Text, TextInput } from "react-native"

import { GraduationCap,Eye,EyeOff } from "lucide-react-native"
const mystyle = {
    main: {
        backgroundColor:"#dcdcde",
        height:"100%",
        width:"100%"
    },
    first: {
        width: "100%",
        height:"60%",
        justifyContent:"center",
        alignItems:"center"
    },
    center:{
        height:130,
        width:"100%",
        justifyContent: "center",
        alignItems: "center"
    },
    circle: {
        height: 70,
        width: 90,
        borderRadius: "50%",
        backgroundColor: "#0055a5",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text1: {
        fontSize: 30,
        fontWeight: "bolder",
        color:"#0055a5"
    },
    second:{
        padding:20
    },
    input:{
        backgroundColor:"white",
        padding:20,
        borderRadius:"10px"
    }
    
}
export default function LoginPage() {
    return (
        <View style={mystyle.main}>
            <View style={mystyle.first}>
                <View style={mystyle.center}>
                    <View style={mystyle.circle}><GraduationCap size={70} color="white"></GraduationCap></View>
                    <Text style={mystyle.text1}>Sign In</Text>
                </View>
            </View>
            <View style={mystyle.second}>
                <TextInput style={mystyle.input} placeholder='Username'  />
                <TextInput placeholder='Password'  />
                <Eye color="#0055a5" size={30}></Eye>
            </View>
            <View></View>
        </View>
    )
}
