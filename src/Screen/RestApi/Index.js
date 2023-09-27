import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
const [Data, setData] = useState([])
const RestApi = () => {
    React.useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res =>
                setData(res.json())
            )
            .then(json => console.log(json))
        // getdata()
    }, [])


    return (
        <View>
            <FlatList
                data={Data}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default RestApi

const styles = StyleSheet.create({})