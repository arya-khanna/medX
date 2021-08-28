import React from 'react';
import {
  View,
  Text,
  StyleSheet, 
  TouchableOpacity,
  Image
} from 'react-native';
import { Camera } from 'expo-camera';
import {useState, useEffect, useRef} from "react";
export default function CameraScreen({setImage}) {
  
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const ref = useRef(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  const takePicture = async () => {
    const photo = await ref.current.takePictureAsync()
    setImage(photo)
  }

  const loadGallery = async () => {
    const photo = await ref.current.takePictureAsync()
    console.log("DONE")
    setImage(photo)
  }
  
  if (hasPermission === null) {
    return <View />;
  }
  
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    photo != null ?
      <View> Photo </View> :
    <View style={styles.container}>
      <Camera style={{ flex: 1 }} type={type} ref={ref}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.snapButton}
            onPress = {() => takePicture()}>
              <Image style={{width: 70, height: 70}} source={require('./assets/circle.png')} alt="circle icon"          
                />
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.galleryButton}
            onPress = {() => loadGallery()}>
              <Image style={{width: 50, height: 50}} source={require('./assets/gallery.png')} alt="gallery icon"          
                />
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
  },
  snapButton: {
    flex: 2,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginLeft: 146,
    marginBottom:20,
  },
  galleryButton: {
    flex: 2.0,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginLeft: 60,
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});