import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, TextInput } from 'react-native';

const MedicinesScreen = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={[styles.MedName]}>Perindopril</Text>
        </TouchableOpacity>
        <Image source={{uri: 'https://familywnews.com/wp-content/uploads/sites/12/2018/09/cfarmafoto323175_1100.jpg'}}
          style={{marginTop: 20, width: 400, height: 300}} />
          <View style={{marginTop: 30}}>
            <Text style={styles.details}>Doctor Name: Dr. Strange</Text>
            <Text style={styles.details}>Frequency: Once a day</Text>
            <Text style={styles.details}>Date of Prescription: 27 April 2021</Text>
            <Text style={styles.details}>Description: Perindopril is a medication used to treat high blood pressure, heart failure, or stable coronary artery disease.</Text>
          </View>
      </View>

    );
};

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