
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './src/Navigation/StackNav';
import DrawerNav from './src/Navigation/DrawerNav';
import Practice from './src/Screen/Practice/Index';
import GoogleMaps from './src/Screen/GoogleMaps/Index'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapDirection from './src/Screen/GoogleMaps/MapDirection';
import firestore from '@react-native-firebase/firestore';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Provider } from 'react-redux';
import store from './src/redux/Store/Index';
export default function App() {
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: '359058331095-3k13h59kd0lt9mjpo42o4bhpg1bifji1.apps.googleusercontent.com'

  //   })
  // }, [])

  // useEffect(() => {
  //   firestore()
  //     .collection('tahaastore')
  //     .doc('XC6fv36vCp26L51jkpIb')
  //     .get()
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })

  // }, [])
  useEffect(() => {
    const getFCMToken = async () => {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('FCM Token:', fcmToken);
          // Use this token to send notifications to the device
        } else {
          console.log('No FCM token available');
        }
      } catch (error) {
        console.error('Error obtaining FCM token:', error);
      }
    };

    // Call the function to obtain the FCM token
    getFCMToken();



    //   // add deep link listener to handle deep link after app is launched
    //   Linking.addEventListener('url', handleDeepLink);

    //   return () => {
    //     Linking.removeEventListener('url', handleDeepLink);
    //   };
  });

  // let navigationRef;

  // function intiNavigation(ref) {
  //   if (ref) {
  //     navigationRef = ref;
  //     // handle deep link that app isn't launched
  //     Linking.getInitialURL().then(function (url) {
  //       handleDeepLink({ url });
  //     });
  //   }
  // }

  // function handleDeepLink({ url }) {
  //   if (url) {
  //     const parsedUrl = urlParse(url, true);

  //     // use host as route name and query as navigation params
  //     navigationRef.navigate({
  //       name: parsedUrl.host,
  //       params: parsedUrl.query,
  //     });
  //   }
  // }
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize("983b57be-27c1-4362-b668-24a1dde5b9d6");

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', (event) => {
      console.log('OneSignal: notification clicked:', event);
    });
  }, [])

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <Provider store={store}> */}

      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
      {/* </Provider> */}
      {/* <MapDirection /> */}
    </GestureHandlerRootView>
  )
}