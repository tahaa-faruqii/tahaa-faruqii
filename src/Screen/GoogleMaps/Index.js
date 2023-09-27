import { useEffect, useRef, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, PanResponder, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Marker, Polygon } from 'react-native-maps';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { Animated } from 'react-native';
import { PanGestureHandler, } from 'react-native-gesture-handler';
import InputGooglePlace from '../../Components/InputGooglePlace';
const SIZE = 120;
Geocoder.init("AIzaSyC_lmvE589o2GzQiZmlMpETebPlOx0dr2Q");
export default function MyGoogleMaps({ navigation }) {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState({ latitude: 37.78825, longitude: -122.4324 });
    const [startPoint, setStartPoint] = useState(null);
    const [endpoint, setEndPoint] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [markerCoordinate, setMarkerCoordinate] = useState(null);
    const path = [startPoint, endpoint]
    const coordinate = [
        { latitude: 37.78825, longitude: -122.4424 },
        { latitude: 37.78825, longitude: -122.4424 },
        { latitude: 37.78825, longitude: -122.4424 }
    ]
    // const _map = useRef(null);
    const origin = { latitude: 37.88825, longitude: -122.46324 };
    const destination = { latitude: 37.771780, longitude: -122.4053769 };
    const mapViewRef = useRef(null);
    const translateY = useRef(new Animated.Value(0)).current;

    const markerdargable = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setMarkerCoordinate({ latitude, longitude })
        console.log(markerCoordinate)

    }

    console.log(selectedLocation)

    const handleSearchStartPoint = (data, details) => {
        const { description } = details;
        setQuery(description)

        Geocoder.from(description)
            .then(json => {
                const { lat, lng } = json.results[0].geometry.location;
                setStartPoint({ latitude: lat, longitude: lng });
                if (mapViewRef.current) {
                    mapViewRef.current.animateToRegion(
                        {
                            center: { latitude: lat, longitude: lng },
                            // zoom: 15,
                        },
                        { duration: 1000 }
                    );
                }
                // animateToLocation(lat, lng)
            })
            .catch(error => console.warn(error));

    };


    const handleSearchEndPoint = (data, details) => {
        const { description } = details;
        setQuery(description)

        Geocoder.from(description)
            .then(json => {
                const { lat, lng } = json.results[0].geometry.location;
                setEndPoint({ latitude: lat, longitude: lng });
                if (mapViewRef.current) {
                    mapViewRef.current.animateToRegion(
                        {
                            center: { latitude: lat, longitude: lng },
                            zoom: 15,
                        },
                        { duration: 1000 }
                    );
                }
                // animateToLocation(lat, lng)
            })
            .catch(error => console.warn(error));
    };


    const searchLocation = (data, details) => {
        const { description } = details;
        setQuery(description)

        Geocoder.from(description)
            .then(json => {
                const { lat, lng } = json.results[0].geometry.location;
                setSelectedLocation({ latitude: lat, longitude: lng });
                if (mapViewRef.current) {
                    mapViewRef.current.animateToRegion(
                        {
                            center: { latitude: lat, longitude: lng },
                            zoom: 15,
                        },
                        { duration: 1000 }
                    );
                }
                // animateToLocation(lat, lng)
            })
            .catch(error => console.warn(error));
    };
    const handleCalculateRoute = () => {
        // Now you can use startPoint and endPoint to calculate or perform actions
        if (startPoint && endpoint) {
            // Calculate the route, perform an action, etc.
            console.log('Start Point:', startPoint);
            console.log('End Point:', endpoint);
            setModalVisible(!modalVisible)
        } else {
            console.log('Please select both start and end points.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.autocompleteContainer}>
                <InputGooglePlace placeholder={'search'}
                    onPress={searchLocation} />

            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Map there</Text>
                            <View style={{
                                paddingHorizontal: 10,
                                padding: 10,
                                flexDirection: "row",
                                justifyContent: 'space-around',
                            }}>
                                <Text style={styles.modalText}>To</Text>
                                <Text style={styles.modalText}>From</Text>
                            </View>
                            <View style={{
                                paddingHorizontal: 10,
                                // padding: 10,
                                flexDirection: "row",
                                justifyContent: 'space-around',
                            }}>
                                <InputGooglePlace placeholder={'search'}
                                    onPress={handleSearchStartPoint} textInputContainer={{ height: 10 }} />
                                <InputGooglePlace placeholder={'search'}
                                    onPress={handleSearchEndPoint} styles={{ width: "10%" }} />


                            </View>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={handleCalculateRoute}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View >
            {/* <PanGestureHandler
                onGestureEvent={Animated.event(
                    [{ nativeEvent: { translationY: translateY } }],
                    { useNativeDriver: false }
                )}
            > */}
            <Animated.View style={[styles.mapContainer, { transform: [{ translateY }] }]}>
                <MapView
                    ref={mapViewRef}
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={[styles.map]}
                    mapType='standard'
                    userInterfaceStyle='dark'
                    showsBuildings={true}
                    showsTraffic={true}
                    loadingEnabled={true}
                    // moveOnMarkerPress={true}

                    region={{

                        latitude: selectedLocation ? selectedLocation.latitude : 37.78825,
                        longitude: selectedLocation ? selectedLocation.longitude : -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}

                >
                    <Marker
                        coordinate={origin}
                    // title={startPoint.description}
                    /><Marker
                        coordinate={destination}
                    // title={startPoint.description}
                    />
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={'AIzaSyC_lmvE589o2GzQiZmlMpETebPlOx0dr2Q'}
                        strokeWidth={3}
                        strokeColor="hotpink"
                    />
                    {/* {startPoint && (
                        <Marker
                            coordinate={startPoint}
                            title={startPoint.description}
                        />
                    )}
                    {endpoint && (
                        <Marker
                            coordinate={endpoint}
                            title={endpoint.description}
                        />
                    )} */}
                    {/* {startPoint && endpoint && (
                        <MapViewDirections
                            origin={origin}
                            destination={origin}
                            apikey={'AIzaSyC_lmvE589o2GzQiZmlMpETebPlOx0dr2Q'}
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />
                    )} */}
                    {selectedLocation && (
                        <Marker
                            // icon={require('../../assets/Images/pic.jpg')}
                            onPress={() => navigation.navigate('GoogleStreetView', { latitude: selectedLocation.latitude, longitude: selectedLocation.longitude })}
                            coordinate={selectedLocation}
                            title={query}
                            description={`longitude: ${selectedLocation.longitude}, latitude:${selectedLocation.latitude}`}
                            draggable={true}
                            onDragEnd={markerdargable}
                        />

                    )
                    }

                </MapView>
            </Animated.View>
            {/* </PanGestureHandler > */}

            <View style={{ flex: 1, alignSelf: "flex-end", right: 20 }}>
                <TouchableOpacity style={styles.touch_button} onPress={() => setModalVisible(true)}>
                    {/* <Text style={{ color: '#fff' }}>Navigtion</Text> */}
                    <MIcon name='directions-bike' size={22} color={'red'} />
                </TouchableOpacity>
            </View>
        </View >
    )
};




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
    textInputContainer: {
        backgroundColor: 'grey',
    },
    textInput: {
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
    },
    touch_button: {
        backgroundColor: 'rgba(52, 52, 52, 0.2)',
        borderColor: 'red',
        marginTop: 'auto',
        marginBottom: '50%',
        marginRight: 20,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    centeredView: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',

    },
    modalView: {
        height: '50%',
        width: '90%',
        margin: 20,
        backgroundColor: 'rgba(52, 60, 52, 0.7)',
        // backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    button: {
        // alignSelf: "flex-end",
        marginTop: '20%',
        marginBottom: '2%',
        // borderColor: 'red',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: "#fff", fontSize: 22,
        fontWeight: 'bold'
    },
    mapContainer: {
        flex: 1,
        zIndex: 0,
        position: 'absolute',
        ...StyleSheet.absoluteFillObject,
    },
});