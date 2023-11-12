import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'

import { useNavigation } from '@react-navigation/native';
const Login = () => {
    const navigation = useNavigation();
  return (
    <View>
        <View style={tw``}>
            <View style={[tw`text-center h-64 justify-center items-center`, styles.bgblue]}>
                <Text style={tw`font-bold text-xl text-white`}>OBASTMS</Text>
            </View>
            <View style={[tw`h-full bg-white p-2`, styles.curveIn, styles.top2]}>
                <Text style={tw`font-bold text-xl`}>Sign in</Text>
                {/* <Text style={styles.p}></Text> */}
                <View>
                    <View>
                        <View style={[styles.formGroup]}>
                            <TextInput type="text" style={[styles.formControl]} name="username" id="username" placeholder="Enter username" />
                        </View>
                        <View stle={styles.formGroup}>
                            <TextInput style={[styles.formControl]} name="password" id="password" placeholder="Enter password" />
                        </View>
                        <View style={tw`my-4`}>
                            <View style={tw``}>
                                <Text style={tw`text-right text-green-400`}>forgot password?</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={[tw`text-center mt-4`, styles.bgblue, styles.btn]}>
                            <Text style={tw`text-center text-white`} onPress={()=> {
                            navigation.navigate('Home')
                        }}>
                            Login
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={tw`my-4`}>
                        <Text style={tw`my-4 text-center text-red-400`} onPress={()=> {
                            navigation.navigate('register')
                        }}>
                            Not a member? Register now
                        </Text> 
                    </View>
                </View>
            </View>
        </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    p: {
        marginTop:8,
        marginBottom:8,
    },
    curveIn: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    centered: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    formGroup: {
        marginVertical: 20,
    },
    formControl: {
        width: "100%",
        padding: 15,
        borderRadius: 8,
        minHeight: 20,
        backgroundColor: "#eee",
    },
    btn: {
        padding: 15,
        width: "100%",
        minHeight: 20,
        borderRadius: 8,
    },
    bgblue: {
        backgroundColor: "#5653FC",
        color: "#fff",
    },
    bgblack: {
        backgroundColor: "#101828",
        color: "#fff",
    },
    bggreen: {
        backgroundColor: "#42B6B3",
        color: "#fff",
    },
    bgwhite: {
        backgroundColor: "#fff",
        color: "#101828",
    },
    top2: {
        position: "relative",
        top: -18,
    },
})