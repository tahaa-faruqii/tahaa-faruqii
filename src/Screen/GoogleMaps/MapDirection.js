import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

Geocoder.init("AIzaSyC_lmvE589o2GzQiZmlMpETebPlOx0dr2Q")

const MapDirection = () => {
    const coordinates = { latitude: 37.3318456, longitude: -122.0296002 }
    const origin = { latitude: 37.3318456, longitude: -122.0296002 };
    const destination = { latitude: 37.771707, longitude: -122.4053769 };
    return (
        <MapView
            // ref={mapViewRef}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={[styles.map]}
            mapType='standard'
            userInterfaceStyle='dark'
            showsBuildings={true}
            showsTraffic={true}
            loadingEnabled={true}
        // moveOnMarkerPress={true}

        >
            <Marker
                coordinate={coordinates}
            // title={startPoint.description}
            />
            <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={'AIzaSyC_lmvE589o2GzQiZmlMpETebPlOx0dr2Q'}
                strokeWidth={3}
                strokeColor="hotpink"
            />
        </MapView >
    )
}

export default MapDirection

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        width: "100%",
        height: "100%"
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    autocompleteContainer: {

        height: 200,
        width: '80%',
        alignSelf: 'center',
        flex: 1,
        position: 'absolute',
        top: 0,
        zIndex: 1,
        top: 10,
        borderRadius: 50

    },
})