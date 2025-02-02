import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({navigation}) {

    const [selectedLocation, setSelectedLocation] = useState();

    const region = {
        latitude: 6.252427134353903,
        longitude: -75.56983478061574,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
    }
    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({lat: lat, lng: lng})
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert('No location picked!', 'You have to pick a location (by tapping on the map) first!');
            return;
        }
        navigation.navigate('AddPlace', { pickedLat: selectedLocation.lat, pickedLng: selectedLocation.lng });
    }, [navigation, selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
        })
    }, [navigation, savePickedLocationHandler]);

    return <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
        {selectedLocation && <Marker title="Picked Location" coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} />}
    </MapView>
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});
