import { Constants } from 'expo-camera';
import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../styles/Colors';
import { api } from '../constants.js'
import Spinner from './Spinner'
import MyStatusBar from './MyStatusBar';

class MedicinesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      medicines: [],
      doctors: [],
      loading: true
    }
  }

  componentDidMount() {
    if (this.state.loading) {
      fetch(`${api}/prescriptions`)
        .then(response => response.json())
        .then(data => {
          this.setState({ medicines: data.prescriptions, doctors: data.doctors, loading: false });
        })
        .catch(err => {
          console.log(err);
      })
    }
  }

  render() {
    const { loading, medicines } = this.state;
    return (
      <View>
      <MyStatusBar backgroundColor={Colors.brandBlue} barStyle="light-content" />
        {loading ?
          <Spinner />
          :
          <ScrollView>
            {medicines.map(medicine => <Medicine key={medicine.id} medicine={medicine} />)}
          </ScrollView>
        }
      </View>
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
            <Text style={styles.details}>Doctor Name: {doctor_name}</Text>
            <Text style={styles.details}>Frequency: {frequency}</Text>
            <Text style={styles.details}>Date of Prescription: {date_of_prescription}</Text>
            <Text style={styles.details}>Description: {description}</Text>
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