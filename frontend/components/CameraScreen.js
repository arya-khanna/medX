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
import { Constants, ImagePicker, Permissions } from 'expo';


export default function CameraScreen() {
  console.log("Entered CameraScreen")
  
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const ref = useRef(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    }, []);
    console.log("Asked permission")

const takePictureAndUpload = async () => {
    const result = await ref.current.takePictureAsync()
    console.debug(result)
    console.log('success')

    if (result.cancelled) {
      return;
    }
  
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();
    console.log(filename)
  
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
  
    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('photo', { uri: localUri, name: filename });
  

    fetch('http://localhost:3000/upload-prescription-image', {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(res => console.log(res)
    ).catch(err => console.log(err));
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
            onPress = {() => takePictureAndUpload()}>
              <Image style={{width: 70, height: 70}} source={require('./assets/circle.png')}          
                />
             
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.galleryButton}
            onPress = {() => loadGallery()}>
              <Image style={{width: 50, height: 50}} source={require('./assets/gallery.png')}          
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
    marginLeft: 150,
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