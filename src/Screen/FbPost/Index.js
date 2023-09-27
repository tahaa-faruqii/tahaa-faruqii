import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './styles'
const FbPost = ({ navigation }) => {
    return (
        <ScrollView style={styles.Container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>

                <View style={{ flexDirection: 'row', }}>

                    <Image source={require('../../assets/Images/pic.jpg')} style={styles.dpImage} />
                    <Text style={styles.name_text}>Name</Text>
                    <View style={styles.sponser_container}>
                        <Text>Sponsored</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
                <Image source={require('../../assets/Images/post.jpg')} style={styles.post} />
                <Text style={styles.post_font}>Don't give up on your dreams</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
                <Image source={require('../../assets/Images/pic.jpg')} style={styles.dpImage} />
                <Text style={styles.name_text}>Name</Text>
                <View style={styles.sponser_container}>
                    <Text>Sponsored</Text>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Image source={require('../../assets/Images/post.jpg')} style={styles.post} />
                <Text style={styles.post_font}>Don't give up on your dreams</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
                <Image source={require('../../assets/Images/pic.jpg')} style={styles.dpImage} />
                <Text style={styles.name_text}>Name</Text>
                <View style={styles.sponser_container}>
                    <Text>Sponsored</Text>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Image source={require('../../assets/Images/post.jpg')} style={styles.post} />
                <Text style={styles.post_font}>Don't give up on your dreams</Text>
            </View>
        </ScrollView>
    )
}

export default FbPost

