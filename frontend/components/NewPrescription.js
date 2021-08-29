import React from "react"
import { ScrollView, TouchableOpacity, View, Platform, StyleSheet, Text } from "react-native"
import CameraScreen from "./CameraScreen"
import Colors from "../styles/Colors"
import { FormControl, Input, Stack, Center, NativeBaseProvider, Image, Button } from "native-base"
import DateTimePicker from '@react-native-community/datetimepicker';
import mime from "mime";

import { api } from '../constants'

export default class NewPrescription extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            showDate: false,
            showCamera: false,
            gotImage: false,
            image: null,
            prescription_name: "",
            doctor_name: "",
            frequency: "",
            notes: ""
        }
    }

    setImage = (image) => {
        this.setState({ gotImage: true, image: image, showCamera: false })
        this.handleUploadPhoto(image);
    }

    createFormData = (image) => {
        const formData = new FormData();
        formData.append('prescription', {
            uri : image.uri,
            type: 'image/jpg',
            name: image.uri.split("/").pop()
        });

        return formData;
    };

    handleUploadPhoto = (photo) => {
        fetch(`${api}/pitch-demo`, {
            method: 'POST',
        })
        .then((response) => response.json())
            .then((response) => {
                console.log('response', response);
                this.setState({
                    prescription_name: response.prescription,
                    doctor_name: response.doctor_name,
                    frequency: response.frequency,
                    notes: response.description
                })
        })
        .catch((error) => {
            console.log('error', error);
        });
    };

    createPrescription = () => {

    }

    onDateChange = (event, value) => {
        console.log(value);
        this.setState({ date: value });
        if (Platform.OS === 'android') {
            this.setState({ showDate: false });
        }
    }

    render() {
        if (this.state.showCamera) {
            return (
                <CameraScreen setImage={this.setImage}/>
            )
        } else {
            return (
                <ScrollView>
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
                                <Image source={{ uri: `${this.state.image.uri}` }} style={{ width: 200, height: 200 }} alt="prescription image" />
                                :
                                <Image style={{ width: 200, height: 200 }} source={require('./assets/add_image.png')} alt="add image icon"/>
                            }
                        </TouchableOpacity>
                        <FormControl isRequired isInvalid>
                            <Stack mx={4} style={{paddingBottom: 20}}>
                                <FormControl.Label>Prescription Name</FormControl.Label>
                                <Input p={2} value={this.state.prescription_name} placeholder="Prescription Name" />
                            </Stack>
                            <Stack mx={4} style={{paddingBottom: 20}}>
                                <FormControl.Label>Doctor's Name</FormControl.Label>
                                <Input p={2} placeholder="Doctor's Name" />
                            </Stack>
                            <Stack mx={4} style={{paddingBottom: 20}}>
                                <FormControl.Label>Frequency</FormControl.Label>
                                <Input p={2} placeholder="Frequency" />
                            </Stack>
                            <Stack mx={4} style={{paddingBottom: 20}}>
                                <FormControl.Label>Prescription Date</FormControl.Label>
                                <View style={styles.pickedDateContainer}>
                                    <Text style={styles.pickedDate}>{this.state.date ? this.state.date.toUTCString() : new Date()}</Text>
                                </View>
                                {!this.state.showDate && (
                                    <Button
                                        style={{ backgroundColor: Colors.brandLavender }}
                                        onPress={() => this.setState({ showDate: true })} 
                                    >
                                        Select Date
                                    </Button>
                                )}
                                {this.state.showDate && (
                                    <DateTimePicker
                                    value={this.state.date ? this.state.date : new Date()}
                                    mode={'date'}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    is24Hour={true}
                                    onChange={this.onDateChange}
                                    style={styles.datePicker}
                                    />
                                )}
                            </Stack>
                            <Stack mx={4} style={{paddingBottom: 20}}>
                                <FormControl.Label>Description</FormControl.Label>
                                <Input p={2} placeholder="Description" />
                            </Stack>
                            <Stack mx={4} style={{paddingBottom: 20}}>
                                <FormControl.Label>Notes</FormControl.Label>
                                <Input p={2} placeholder="Notes" />
                            </Stack>
                        </FormControl>
                        <Button
                            style={{
                                alignSelf: 'flex-end',
                                backgroundColor: Colors.primaryLavender,
                                marginEnd: 15,
                                marginBottom: 20
                            }}
                            onPress={() => this.createPrescription()}
                        >
                            Save Prescription
                        </Button>
                    </NativeBaseProvider>
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 50,
  },
  pickedDateContainer: {
    padding: 10,
    backgroundColor: '#eee',
  },
  pickedDate: {
    fontSize: 18,
    color: 'black',
  },
  btnContainer: {
    padding: 30,
  },
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
