import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native'
import React, { isValidElement, useState } from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const initialData = { title: 'testing' }


export default function Home({ }) {
    const [data, setData] = useState('')
    const [newArray, setNewArray] = useState([])
    const [isEditMode, setIsEditMode] = useState();

    const onSubmit = () => {
        if (isEditMode !== null) {
            onUpdate(isEditMode, data); // Call onUpdate if in edit mode
        } else {
            const newProduct = { title: data };
            setNewArray([...newArray, newProduct]);
        }
        setData(''); // Clear the input field
        setIsEditMode(null); // Reset editing state
        // var products = {
        //     title: data
        // }
        // setNewArray([...newArray, products])
        // setData(null)
        // console.log(products)
    }
    // console.log(onSubmit)
    const onDelete = (title) => {
        const deleteitem = newArray.filter((item) => item.title != title)
        setNewArray(deleteitem)
    }
    // console.log(newArray)

    const onUpdate = (index, value) => {
        // let update = newArray.map((x, i) => {
        //     if (i == index) {
        //         x.title = data
        //         return { ...x, title: data };
        //     }
        //     return x;
        // })
        // setNewArray(update)
        // setIsEditMode('')
        // console.log(update)
        if (index >= 0 && index < newArray.length) {
            const updatedArray = [...newArray];
            updatedArray[index].title = data; // Use the data state for the updated value
            setNewArray(updatedArray);
            setData(''); // Clear the input field
            setIsEditMode(null); // Reset the edit mode
        }
        //

    }
    const renderItem = ({ item, index }) => {
        // console.log(item, index)
        return (
            <View style={styles.item_view}>

                <Text style={styles.item_text} >{item.title}
                </Text>
                < View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 10, right: '0%' }}>
                    <TouchableOpacity style={styles.delete_button} onPress={() => { onDelete(item.title) }}>
                        {/* <Text>delete</Text> */}
                        <Icon name='delete' size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.update_button}            //onPress={() => { onUpdate(index, data) }} 
                        onPress={() => {
                            if (isEditMode === index) {
                                onSubmit(); // Call onSubmit to update the edited item
                            } else {
                                setIsEditMode(index); // Enter edit mode for the specific item
                                setData(newArray[index].title); // Set input data to the current item's title
                            }
                        }}
                    >
                        {/* <Text>update</Text> */}
                        <FIcon name='edit' size={22} />
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header_text}>TO-DO-List</Text>
            </View>
            <View style={styles.text_view}>
                <Text style={styles.text_hello}>Hello{'\t'} Welcome </Text>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={styles.Add_text}>   Add Task </Text>

                    <TouchableOpacity style={styles.button} onPress={onSubmit}>
                        {/* <Text style={{ textAlign: 'center', color: '#fff' }}>add</Text> */}
                        <MIcon name='add' size={26} style={{ color: '#fff', alignSelf: 'center' }} />
                    </TouchableOpacity>

                </View>
            </View>
            <View>
                {isEditMode ? (
                    <TextInput
                        value={data} // Use the data state here
                        onChangeText={(newValue) => setData(newValue)} // Update data state
                    />

                ) : (
                    <TextInput placeholder='Add item' style={styles.input_container}
                        value={data}
                        onChangeText={(value) => setData(value)} />
                )
                }

            </View>
            <View style={{ marginTop: 10, margin: 10 }}>
                <FlatList
                    data={newArray}
                    // keyExtractor={item => item.id}
                    // extraData={item => onUpdate(item)}
                    renderItem={renderItem}
                />

            </View>
            <View style={{ marginRight: 10, paddingVertical: 10 }}>
            </View>
        </View>
    )
}
