import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import auth, { firebase, sendPasswordResetEmai } from '@react-native-firebase/auth';
import { UseSelector } from 'react-redux';
// import SignUp from './SignUp';
export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setconfirm] = useState(null);
    const [resendmail, setresendmail] = useState(false);
    const [code, setCode] = useState('');
    const [phone, setPhone] = useState('');
    const user = UseSelector((state) => state.Reducer)
    const store = UseSelector((state) => state)
    const forgotPassword = (email) => {
        console.log("Reset email sent to " + email);

        auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                // Password reset email sent successfully
                Alert.alert("Reset email sent to " + email);
                setresendmail(true); // Set the state variable to true AFTER success
            })
            .catch((error) => {
                console.error("Error sending reset email:", error);
                Alert.alert("An error occurred while sending the reset email.");
            });
    };

    const sendPhone = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phone)
            console.log(JSON.stringify(confirmation));
            setconfirm(confirmation)
        } catch (error) {
            Alert.alert(error.code)
            console.log(error);
        }

    }
    const codeConfirm = async () => {
        if (code) {
            try {
                await confirm.confirm(code)
            } catch (error) {
                Alert.alert(error.code)
            }
        }
    }
    const login = () => {

        if (email && password) {
            // Check if both email and password are provided.
            auth()
                .signInWithEmailAndPassword(email, password) // Attempt to sign in with provided email and password.
                .then((user) => {
                    const person = firebase.auth().currentUser

                    // If successful, a user object is returned.
                    // console.log("USER REGISTERED ==>>>", JSON.stringify(user?.uid));
                    // Alert.alert("USER LOGGED IN", user?.uid);
                    // console.log(JSON.stringify(person.uid))
                    Alert.alert('show message', person.uid)


                    navigation.navigate('Welcome')


                    Alert.alert('try again')


                })
                .catch((error) => {
                    // If there's an error during the login attempt.
                    console.log("ERROR", error);

                    if (error.code === "auth/user-not-found") {
                        Alert.alert("User not found. Please register.");
                    } else if (error.code === "auth/wrong-password") {
                        Alert.alert("Wrong password. Please try again.");
                    } else {
                        Alert.alert("An error occurred. Please try again later.");
                    }
                });
        } else {
            // If either email or password is empty.
            Alert.alert("email or password is empty");
        }

    }

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.container}>
            {resendmail ?
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email."
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View> :
                null
            }

            <Image style={styles.image} source={require("../../assets/Images/masklogo.png")} />

            {/* <StatusBar style="auto" /> */}


            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>



            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}

                />
            </View>
            {confirm ?
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Phone No"
                        placeholderTextColor="#003f5c"
                        // secureTextEntry={true}
                        value={code}
                        onChangeText={(code) => setCode(code)}

                    />
                </View>
                :
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Phone No"
                        placeholderTextColor="#003f5c"
                        // secureTextEntry={true}
                        value={phone}
                        onChangeText={(phone) => setPhone(phone)}

                    />
                </View>
            }
            <TouchableOpacity onPress={forgotPassword}>
                <Text style={styles.forgot_button}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                if (confirm) {
                    codeConfirm()
                }
                else {
                    sendPhone()
                }
            }}>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={login}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Login</Text>
            </TouchableOpacity>
            {/* ye remove krna ha */}
            {/* <TouchableOpacity style={styles.loginBtn}
     onPress={()=>
      {Login1(email,password)}}>
      <Text style={styles.loginText}>LOGIN</Text>
     
    </TouchableOpacity> */}


            {/* 
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.loginText}>Signup</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
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