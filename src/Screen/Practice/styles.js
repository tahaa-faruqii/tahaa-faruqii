import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text_container: {
        margin: 10,
        marginTop: '10%'
    },
    text_login: {
        fontSize: 32,
        color: '#000',
        fontWeight: 'bold'
    },
    text_password: {
        fontSize: 16,
        color: '#000',
        paddingVertical: 10
    },
    button_container: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: 'red',
        height: 50,
        width: 100,
        padding: 5
    },
    text_button: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold'
    }

})



export default styles
