import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
    dpImage: {
        height: 60,
        width: 60,
        borderRadius: 50,
        margin: 10
    },
    name_text: {
        marginTop: '5%'
    },
    post: {
        // resizeMode: 'contain',
        width: '100%',
        height: 250
    },
    sponser_container: {
        position: 'absolute',
        marginLeft: '20%',
        marginTop: '8%',
        padding: 8
    },
    post_font: {
        color: '#000',
        margin: 10,
        alignSelf: 'flex-start',
        fontSize: 22,
        fontWeight: 'bold'
    }

})

export default styles
