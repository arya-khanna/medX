import { Constants } from 'expo-camera';
import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import { api } from '../constants.js'

class MedicinesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      medicines: [],
      loading: true
    }
  }

  componentDidMount() {
    if (this.state.loading) {
      console.log(api)
      fetch(`${api}/prescriptions`)
        .then(response => response.json())
        .then(data => {
          this.setState({ medicines: data, loading: false });
          console.log("loaded");
        })
        .catch(err => {
        console.log(err);
      })
    }
  }

  render() {
    const { loading, medicines } = this.state;
    console.log(medicines);
    return (
      loading ?
        <Text> Loading </Text>
        :
        medicines.map(medicine => <Medicine key={medicine.id} medicine={medicine}/>)
    );
  }  
};

const Medicine = ({ medicine }) => {
  const { id, name, filename, frequency, date_of_prescription, description, doctor_name } = medicine;
  console.log(`${api}/prescription/${id}/file/${filename}`);
  return (
    <View style={styles.container}>
        <TouchableOpacity>
        <Text style={[styles.MedName]}>{name}</Text>
        </TouchableOpacity>
        <Image source={{uri: `${api}/prescription/${id}/file/${filename}`}}
          style={{marginTop: 20, width: 400, height: 300}} />
          <View style={{marginTop: 30}}>
            <Text style={styles.details}>Doctor Name: Dr. Strange</Text>
            <Text style={styles.details}>Frequency: Once a day</Text>
            <Text style={styles.details}>Date of Prescription: 27 April 2021</Text>
            <Text style={styles.details}>Description: Perindopril is a medication used to treat high blood pressure, heart failure, or stable coronary artery disease.</Text>
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  MedName: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  details:{
      fontSize: 20,
      marginTop: 10,
  },
});

export default MedicinesScreen;