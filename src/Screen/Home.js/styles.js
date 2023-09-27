import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF'


    },
    header: {
        width: "100%",
        height: '10%',
        backgroundColor: '#e8e8e8',
        marginBottom: 10,


    },
    header_text: {
        marginTop: 10,
        alignSelf: 'center',
        color: '#5E88F2',
        fontSize: 32,
        fontWeight: 'bold',
    },
    text_view: {
        margin: 10,

    },
    text_hello: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000'
    },
    Add_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#bebebf'

    },
    input_container: {
        // borderWidth: 1, 
        width: '90%',
        height: 70,
        paddingLeft: 20,
        alignSelf: 'center',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 1


    },
    button: {
        backgroundColor: '#9C7DEB',
        alignSelf: "flex-end",
        justifyContent: 'center',
        borderRadius: 50,
        height: 40,
        width: 40,
        marginRight: '5%'

    },
    item_view: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 10
    },
    item_text: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // elevation: 2,
        paddingLeft: 10,
        width: '90%',
        borderWidth: .25,
        height: 50,
        textAlign: 'left',
        textAlignVertical: 'center',

    },
    delete_button: {
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        backgroundColor: '#9c7deb',
        padding: 8,
        borderRadius: 20

    },
    update_button: {
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        backgroundColor: '#5e88f2',
        padding: 8,
        borderRadius: 20,
        marginLeft: 5

    }

})
export default styles