import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screen/Home.js/Index';
import FbPost from '../Screen/FbPost/Index';
import Icon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import DrawerNav from './DrawerNav';

const Tab = createBottomTabNavigator();
export default function BottomTab() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                position: 'absolute',
                // bottom: 20,
                // paddingLeft: 5,
                left: 20,
                right: 20,
                height: '10%',
                paddingBottom: 5,
                // backgroundColor: 'gray'
                // width: '90%'
                tabBarActiveBackgroundColor: 'black',

            }
        }}>
            <Tab.Screen name="DrawerNav" component={DrawerNav}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                    // tabBarBadge: '13',
                    // tabBarBadgeStyle: { height: 20, width: 20, fontSize: 10 },
                    tabBarActiveTintColor: '#e91e63',
                    tabBarActiveBackgroundColor: 'black',
                    tabBarLabelPosition: 'beside-icon',
                }} />
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                    tabBarBadge: '13',
                    tabBarBadgeStyle: { height: 20, width: 20, fontSize: 10 },
                    tabBarActiveTintColor: '#e91e63',
                    tabBarActiveBackgroundColor: 'black',
                    tabBarLabelPosition: 'beside-icon',
                }} />
            <Tab.Screen name="Fbpost" component={FbPost}
                options={{
                    tabBarLabelStyle: { fontSize: 16 },
                    tabBarActiveTintColor: '#e91e63',
                    tabBarActiveBackgroundColor: 'black',
                    tabBarLabelPosition: 'beside-icon',
                    tabBarIcon: ({ focused, size }) => (
                        <MIcon name="menu" color={focused ? '#af0909' : '#777676'} size={size} />
                    ),

                }} />
        </Tab.Navigator >
    )
}