import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const InputGooglePlace = ({ placeholder, onPress, styles, textInputContainer }) => {
    return (
        <GooglePlacesAutocomplete
            placeholder={placeholder}
            onPress={onPress}

            query={{
                key: 'AIzaSyC_lmvE589o2GzQiZmlMpETebPlOx0dr2Q',
                language: 'en',
            }}
            styles={{
                styles,
                textInputContainer: {
                    textInputContainer
                },
                textInput: {
                    backgroundColor: '#d3d3d3',
                    height: 38,
                    color: '#000',
                    fontSize: 16,

                },
                predefinedPlacesDescription: {
                    color: '#1faadb',
                },
            }}
        />
    )
}

export default InputGooglePlace

const styles = StyleSheet.create({})