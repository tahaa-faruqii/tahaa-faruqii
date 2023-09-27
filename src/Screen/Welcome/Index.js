import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
const Welcome = ({ navigation }) => {
    const [user1, setuser1] = useState()
    React.useEffect(() => {
        console.log(auth().currentUser?.uid)
        const uid = auth().currentUser?.uid
        console.log(' uid..............>>>>>>>>>>>>>>>>>>', uid)
        console.log('------------->>>>>>', auth().currentUser?.uid)
        firestore().collection('user').doc(uid).get()
            .then((snap) => {
                if (snap) {
                    console.log('snap.data()', snap.data());
                    setuser1(snap.data())
                    console.log('user..............>>>>>>>', user1)
                }
            })
        // console.log(JSON.stringify(userdata))
    }, []);
    // useEffect(() => {
    //     // Add a listener for incoming messages
    //     const unsubscribe = messaging().onMessage(async remoteMessage => {
    //         console.log('Received foreground notification:', remoteMessage);
    //     });

    //     // Clean up the listener when the component unmounts
    //     return unsubscribe;
    // }, []);
    const signout = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        Alert.alert('signout', null)
        navigation.navigate('Login')
    }

    const pickImage = async = () => {

        ImagePicker.openPicker({
            multiple: false,
            mediaType: 'video'
        })
            .then((images) => {
                if (images) {
                    console.log(images.path);
                    uploadfile(images.path)

                }
            })
            .catch((error) => {
                console.log('ImagePicker Error:', error);
            });
    }

    const uploadfile = async (path) => {
        try {
            // const bucketUrl = 'gs://testproject-94381.appspot.com'
            let fileNameArray = Date.now() + path?.split('/').pop()

            let fileName = fileNameArray[fileNameArray?.length - 1]
            // const fullPath = `${bucketUrl}/${fileName}`;
            const reference = storage().ref(fileName)
            // Upload the file to Firebase Storage
            await reference.putFile(path);

            // Get the download URL of the uploaded file
            const url = await reference.getDownloadURL();
            // console.log(`File uploaded successfully. Download URL: ${url}`);

            // Create a task to monitor the upload progress
            const task = reference.putFile(path);

            // Listen for state changes on the upload task
            task.on('state_changed', taskSnapshot => {
                // console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`) * 100;
                const progress = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
                console.log(`Upload is ${progress.toFixed(2)}% complete`);
            });

            // Handle the completion of the upload task
            task.then(() => {
                console.log('Image uploaded to the bucket!');
            });
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
    }
    return (
        <View >
            <View style={{ justifyContent: 'centers', alignSelf: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}> Your Task successfully completed   <Text style={{ fontSize: 50, alignSelf: "center", color: 'hotpink' }}>{user1?.fullname}</Text></Text>
            </View>
            <View style={{ marginTop: '50%' }}>

                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, width: '80%' }}
                        onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: '#fff' }}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: 'red', marginTop: 10, padding: 10 }}
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: '#fff' }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: 'red', marginTop: 10, padding: 10 }}
                        onPress={signout}>
                        <Text style={{ color: '#fff' }}>Signout</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: 'red', marginTop: 10, padding: 10 }}
                        onPress={pickImage}>
                        <Text style={{ color: '#fff' }}>UPLOAD</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: 'red', marginTop: 10, padding: 10 }}
                        onPress={navigation.navigate('RestApi')}>
                        <Text style={{ color: '#fff' }}>StoreData</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text>

                </Text>
            </View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({})