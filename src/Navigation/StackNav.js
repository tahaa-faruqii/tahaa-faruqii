import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FbPost from '../Screen/FbPost/Index';
import Login from '../Screen/Login/Index';
import SignUp from '../Screen/Signup/Index';
import GalleryCamera from '../Screen/GalleryCamera/Index';
import MyGoogleMaps from '../Screen/GoogleMaps/Index';
import GoogleStreetView from '../Screen/GoogleStreetView/Index';
import Home from '../Screen/Home.js/Index';
import Register from '../Screen/Register/Index';
import Welcome from '../Screen/Welcome/Index';
import auth, { firebase } from '@react-native-firebase/auth';
import RestApi from '../Screen/RestApi/Index';
// import DrawerNav from './DrawerNav';
const Stack = createNativeStackNavigator();

export default function StackNav() {
    const [user, setuser] = React.useState(auth().currentUser?.uid)
    console.log(auth().currentUser);
    React.useEffect(() => {
        const subscribe = auth().onAuthStateChanged((user_) => {
            setTimeout(() => {
                setuser(user_)
            }, 3000)
            console.log(user_);
        })

        return subscribe
    }, [])

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>

            {/* {user ?
                <> */}

            <Stack.Screen name="Welcome" component={Welcome} />
            {/* </> :
                <> */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="RestApi" component={RestApi} />
            <Stack.Screen name="GalleryCamera" component={GalleryCamera} />
            <Stack.Screen name="MyGoogleMaps" component={MyGoogleMaps} />
            <Stack.Screen name="GoogleStreetView" component={GoogleStreetView} />
            <Stack.Screen name="FbPost" component={FbPost} />
            <Stack.Screen name="Home" component={Home} />
            {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
            {/* <Stack.Screen name="ModalView" component={ModalView} /> */}
            {/* </>

            } */}
        </Stack.Navigator>
    )
} 