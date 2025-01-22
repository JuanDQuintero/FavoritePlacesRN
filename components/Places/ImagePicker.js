import { launchCameraAsync, PermissionStatus, useCameraPermissions } from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({onTakeImage}) {

    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    async function verifyPermission() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!', 'You need to grant camera permissions to use this app.');
            return false;
        }
        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });        
        
        if (image.assets && image.assets.length > 0) {
            const pickedUri = image.assets[0].uri;
            console.log(pickedUri);
            
            onTakeImage(pickedUri);
            setPickedImage(pickedUri);
        }
    }

    let imagePreview = <Text>No image taken yet.</Text>;

    if (pickedImage) {
        
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} onError={(error) => console.log("Image Load Error:", error.nativeEvent)}/>;
    }

    return (
        <View>
            <View style={styles.imagePreview}>{imagePreview}</View>
            <OutlinedButton icon="camera" onPress={takeImageHandler}>Take image</OutlinedButton>
      </View> 
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    }
});