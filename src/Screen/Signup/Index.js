import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import Login from '../Login/Index';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
export default function SignUp({ navigation }) {
    const [user, setUser] = useState()
    const [pass, setpass] = useState();

    const signup = () => {
        auth().createUserWithEmailAndPassword(user, pass)
            .then((user1) => {
                const uid = user1?.uid
                console.log('this is uid ', uid)
                // firestore().collection('user')
                // console.log(user)
            })
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 2, backgroundColor: "#ae18cd" }} />

            <View style={styles.login}>
                <Text style={styles.font}>Sign up</Text>
                <Text style={styles.text}>Username</Text>
                <TextInput style={styles.input}
                    value={user}
                    onChangeText={(useremail) => setUser(useremail)} />
                <Text style={styles.text}>password</Text>
                <TextInput style={styles.input}
                    value={pass}
                    onChangeText={(txt) => setpass(txt)} secureTextEntry={true} />
            </View>
            <TouchableOpacity
                style={styles.button}
                // onPress={() => { Sign(user, pass) }
                // }
                // onPress={() => navigation.navigate('Login')}
                onPress={signup}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Signup</Text>
            </TouchableOpacity>


        </View >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        Color: 'f0c5f9'
    },
    text: {
        top: 40,
        left: 15,
        fontSize: 18,
        padding: 5
    },
    login: {
        backgroundColor: '#f0c5f9',
        bottom: 100,
        borderRadius: 40,
        height: 300,
        width: 320,
        alignSelf: 'center'
    },
    font: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    input: {

        top: 50,
        left: 15,
        borderWidth: 0.3,
        width: 270,
        padding: 5
    },
    button: {
        borderWidth: 2,
        width: 140,
        height: 40,
        alignSelf: 'center',
        bottom: 120,
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#bf02ff',
        fontWeight: 'bold'
    },
    fb: {
        borderWidth: 2,
        width: 200,
        height: 40,
        alignSelf: 'center',
        bottom: 40,
        // alignItems: 'center',
        borderRadius: 15,
        textAlign: 'center',
        paddingTop: 4,
        backgroundColor: '#f0c5f9'
    },
    gmail: {
        borderWidth: 2,
        width: 200,
        height: 40,
        alignSelf: 'center',
        bottom: 30,
        // alignItems: 'center',
        borderRadius: 15,
        textAlign: "center",
        paddingTop: 4,
        backgroundColor: '#f0c5f9',
    }
}
);

