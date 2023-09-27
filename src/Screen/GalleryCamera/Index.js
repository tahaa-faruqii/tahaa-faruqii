// import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
// import React, { useState } from 'react'
// import ImagePicker from 'react-native-image-crop-picker';
// const GalleryCamera = () => {
//     const pic = []
//     const [pimage, setPImage] = useState(['https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png'])
//     // const [newimage, setNewImage] = useState([])
//     // const added = () => {
//     //     const data = {
//     //         image: pimage
//     //     }
//     //     console.log('>>>>>>>>', data)
//     //     setNewImage([...pimage, data])
//     //     console.log('>>>>>>>>>>>>>>', newimage)

//     // }
//     const openGallery = () => {
//         ImagePicker.openPicker({
//             width: 300,
//             height: 400,
//             cropping: true,
//             multiple: true,
//         }).then(x => {
//             console.log(x);
//             // setPImage([...x?.path, ...pimage])
//             const imagePaths = x.map((image) => image.path);
//             setPImage([...pimage, ...imagePaths])
//             console.log('.........>>>>>>>', pimage)
//         }).catch(e => {
//             console.log(e);
//         });
//     }
//     const camera = () => {
//         ImagePicker.openCamera({
//             width: 300,
//             height: 400,
//             cropping: true,

//         }).then(x => {
//             console.log(x);
//             setPImage(x)
//         });
//     }
//     return (
//         <View style={{ flex: 1 }}>
//             {
//                 pimage.map((item, index, image) => {
//                     return (

//                         <View key={index} style={{ flex: 1 }}>
//                             <Image source={[{ uri: image.uri }, console.log(image)]} style={styles.image_container} />
//                         </View>
//                     )
//                 }

//                 )
//             }
//             {/* <Image source={{ uri: pimage }} style={styles.image_container} /> */}
//             <TouchableOpacity onPress={openGallery} style={{ backgroundColor: "#000" }}>
//                 <Text>GalleryCamera</Text>
//                 {/* <Text>Opencamera</Text> */}
//             </TouchableOpacity >

//             {/* <TouchableOpacity onPress={added} style={{ backgroundColor: "red", padding: 10 }}>
//                 {/* <Text>GalleryCamera</Text> */}
//             {/* <Text>Opencamera</Text> */}
//             {/* </TouchableOpacity> */}
//         </View>
//     )
// }

// export default GalleryCamera

// const styles = StyleSheet.create({
//     image_container: {
//         width: 200,
//         height: 200
//     }
// })

import React, { useState } from 'react';
import { View, Image, Button, FlatList, StyleSheet, ScrollView } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';

const GalleryCamera = () => {
    const [selectedImages, setSelectedImages] = useState([]);

    const pickImages = () => {
        ImagePicker.openPicker({
            multiple: true,
        })
            .then((images) => {
                if (images) {

                    setSelectedImages([...selectedImages, ...images]);
                }
            })
            .catch((error) => {
                console.log('ImagePicker Error:', error);
            });
    };
    const deleteImage = (index) => {
        const updatedImages = [...selectedImages,];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };
    return (
        <View style={{ flex: 1, marginTop: '15%', }}>
            {/* <Image source={require('../../assets/Images/pic.jpg')} style={styles.image_container} /> */}
            {selectedImages.length > 0 && (


                <ScrollView>
                    <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center' }}>

                        {selectedImages.map((image, index) => (
                            <View key={index} style={{ justifyContent: 'center', alignSelf: 'center', }}>
                                <TouchableOpacity onPress={() => deleteImage(index)}>

                                    <Image source={{ uri: image.path }} style={styles.imageItem}
                                    // style={{ width: 200, height: 200, padding: 10 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )
            }
            {/* <Button title="Pick Images" onPress={pickImages} /> */}
            <View style={{ alignSelf: "center" }}>
                {/* <FlatList
                    data={selectedImages}
                    numColumns={3} // Adjust the number of columns as needed
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        // <TouchableOpacity onPress={deleteImage(index)}>
                        
                        <Image
                        source={{ uri: item.path }}
                        style={styles.imageItem}
                        />
                        // </TouchableOpacity>
                        )}
                    /> */}
                <View style={{ bottom: '50%' }}>
                    <Button title="Pick Images" onPress={pickImages} />
                </View>
            </View>

        </View >
    );
};

export default GalleryCamera;
const styles = StyleSheet.create({
    imageItem: {
        width: 100,
        height: 100,
        margin: 5,
    },
});
