import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Screen/Home.js/Index';
import FbPost from '../Screen/FbPost/Index';
import MyGoogleMaps from '../Screen/GoogleMaps/Index';

const Drawer = createDrawerNavigator();
export default function DrawerNav() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="FbPost" component={FbPost} />
            <Drawer.Screen name="Home" component={Home} />
            {/* <Drawer.Screen name="MyGoogleMaps" component={MyGoogleMaps} /> */}
        </Drawer.Navigator>
    )
}