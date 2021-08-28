import React from "react"
import { TouchableOpacity, View } from "react-native"
import {
  Box,
  Heading,
  Icon,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
} from "native-base"
import CameraScreen from "./CameraScreen"
import Colors from "../styles/Colors"

export default class NewPrescription extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCamera: false,
            gotImage: false,
            image: null
        }
    }

    setImage = (image) => {
        this.setState({ gotImage: true, image: image, showCamera: false })
        console.log(image)
    }

    render() {
        console.log("camera " + this.state.showCamera)
        if (this.state.showCamera) {
            return (
                <CameraScreen setImage={this.setImage}/>
            )
        } else {
            return (
                <NativeBaseProvider>
                    <TouchableOpacity
                        onPress={() => this.setState({ showCamera: true })}
                        style={{
                            marginTop: 10,
                            alignItems: 'center',
                            flex: 1,
                        }}
                    >
                        {this.state.gotImage ?
                            <Image source={{ uri: `${this.state.image.uri}` }} style={{ width: 200, height: 200 }} />
                            :
                            <Image style={{ width: 200, height: 200 }} source={require('./assets/add_image.png')} />
                        }
                    </TouchableOpacity>
                </NativeBaseProvider>
            )
        }
    }

}
