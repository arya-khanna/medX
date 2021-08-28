import React from 'react';
import {
  View,
  Text,
  StyleSheet, 
  TouchableOpacity
} from 'react-native';
import { Camera } from 'expo-camera';
import {useState, useEffect, useRef} from "react";
export default function CameraScreen() {
  
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const ref = useRef(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

const takePicture = async () => {
    const photo = await ref.current.takePictureAsync()
    console.debug(photo)
    console.log('success')
  }

  const loadGallery = async () => {
    const photo = await ref.current.takePictureAsync()
    console.log('success')
  }


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    
    <View style={styles.container}>
      <Camera style={{ flex: 1 }} type={type} ref={ref}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.snapButton}
            onPress = {() => takePicture()}>
              <Text style={styles.text}> Snap! </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.galleryButton}
            onPress = {() => loadGallery()}>
              <Text style={styles.text}> Upload </Text>
            </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  snapButton: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  galleryButton: {
    flex: 2.0,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});