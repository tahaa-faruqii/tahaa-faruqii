import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StreetView from 'react-native-streetview';

const GoogleStreetView = (props) => {
    const street = props.route.params.latitude
    const street1 = props.route.params.longitude


    return (
        <View style={styles.container}>
            <StreetView
                style={styles.streetView}
                allGesturesEnabled={true}
                coordinate={{
                    'latitude': street,
                    'longitude': street1
                }}
                pov={{
                    tilt: parseFloat(0),
                    bearing: parseFloat(0),
                    zoom: parseInt(1)
                }}
            />
        </View>
    )
}

export default GoogleStreetView


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    streetView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});