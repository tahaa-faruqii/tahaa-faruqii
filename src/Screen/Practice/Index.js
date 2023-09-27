import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './styles'
const Practice = () => {
  const inputref = React.useRef('null')
  const [loggedIn, setIsLoggedIn] = useState()

  // useEffect(() => {
  //   getData()
  // }, [])

  const cleardata = () => {
    console.log(inputref.current)
    inputref.current.value = '',
      inputref.current.focus()

  }

  // const storeData = async (value) => {
  //   try {
  //     const jsonValue = JSON.stringify(loggedIn);
  //     await AsyncStorage.setItem('my-key', jsonValue);
  //     // console.log(jsonValue)
  //   } catch (e) {
  //     // saving error
  //   }
  // };
  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('my-key');
  //     // console.log(jsonValue)
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.text_container}>
        <Text style={styles.text_login}>LogIn</Text>
      </View>
      <View style={{ margin: 10, padding: 10 }}>
        <Text style={styles.text_password}>Password</Text>
        <TextInput placeholder='write something' style={{ borderWidth: 1, width: '90%' }}
          // value={loggedIn}
          // onChangeText={setIsLoggedIn}
          ref={inputref} />
      </View>
      <View style={styles.button_container}>

        <TouchableOpacity onPress={cleardata} style={styles.button}>
          <Text style={styles.text_button}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Practice