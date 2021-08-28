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

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

const takePicture =  async () => {
  if (this.camera) {
    const options = {quality: 1, base64: true};
    const data = await this.camera.takePictureAsync(options);
    console.log(data);
}
 };


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.snapButton}
            onPress = {() => takePicture()}>
              <Text style={styles.text}> Snap! </Text>
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
  text: {
    fontSize: 18,
    color: 'white',
  },
});