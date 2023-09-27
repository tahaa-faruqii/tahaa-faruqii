import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, Button } from 'react-native'
import React from 'react'
import { useState } from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { updateuser } from '../../redux/Action/Index';
// import SignUp from './SignUp';
export default function Register({ navigation }) {
    const [email, setEmail] = useState("");
    const [fullname, setFullName] = useState("");
    const [password, setPassword] = useState("");
    // const dispatch = useDispatch()
    const signInWithGoogle = async () => {
        try {
            const res = await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const { idToken } = await GoogleSignin.signIn();

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            auth().signInWithCredential(googleCredential);

        } catch (error) {
            console.log('error ==>>', error);
        }

    }

    const signup = async () => {
        if (email && password) {
            try {
                const userCredential = await auth().createUserWithEmailAndPassword(email, password);
                const user = userCredential.user; // Get the user object from userCredential

                console.log('uid----------->>>>>>>>>>>>>', user.uid);

                // Rest of your code
                const person = firestore().collection('user').doc(user.uid).set({
                    email,
                    fullname,
                    uid: user.uid, // Set the UID from the user object
                    password
                });
                navigation.navigate("Login")
                // Rest of your code
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                } else if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                console.error(error);
            }
        }

        setEmail(null);
        setFullName(null);
        setPassword(null);
    };
    const update_user_ = () => {
        dispatch(updateuser({ name: fullname }))
    }
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/Images/hourse-logo.png")} />

            {/* <StatusBar style="auto" /> */}
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Full Name"
                    placeholderTextColor="#003f5c"
                    value={fullname}
                    onChangeText={(fullname) => setFullName(fullname)}
                />
                {/* {console.log(fullname)} */}
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(password) => setPassword(password)}

                />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={signup}>
                <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 20 }}>

                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signInWithGoogle}
                // disabled={this.state.isSigninInProgress}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 50,
        height: 150,
        width: 130
    },

    inputView: {
        backgroundColor: "#f0c5f9",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        top: 10,
        alignItems: 'center',
        height: 20,
        // position: 'absolute',
        justifyContent: 'center',
        marginBottom: 30,
        // padding: 
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#bf02ff",
    },
    loginText: {
        color: "#fff",
        fontWeight: 'bold'
    }
});