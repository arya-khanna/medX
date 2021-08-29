import { Constants } from 'expo-camera';
import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../styles/Colors';
import { api } from '../constants.js'
import Spinner from './Spinner'
import MyStatusBar from './MyStatusBar';
import titleize from 'titleize';
import { Box, Heading, Divider, NativeBaseProvider, VStack, Center } from 'native-base';

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
      <NativeBaseProvider>
      <MyStatusBar backgroundColor={Colors.brandBlue} barStyle="light-content" />
        {loading ?
          <Spinner />
          :
          <ScrollView>
            {medicines.sort((a, b) => a.name > b.name).map(medicine => <Medicine key={medicine.id} medicine={medicine} />)}
          </ScrollView>
        }
      </NativeBaseProvider>
    );
  }  
};

const Medicine = ({ medicine }) => {
  const { id, name, filename, frequency, date_of_prescription, description, doctor_name } = medicine;
  return (
    <Box border={1} borderRadius='md' shadow={2} style={{margin: 10}} bgColor={Colors.Pink}>
      <VStack space={4} divider={<Divider />}>
        <Box px={4} pt={4}>
          <Center>
            <Heading>
              < Text style = {[styles.MedName]}> {titleize(name)} </Text>
            </Heading>
          </Center>
        </Box>
        <Box>
          <Center>
            <Image source={{uri: `${api}/prescription/${id}/file/${filename}`}}
                style={{width: 100, height: 100 }} />
          </Center>
        </Box>
        <Box px={4} pb={4}>
         <View style={{marginTop: 30}}>
            <Text style={styles.details}>{doctor_name}</Text>
            <Text style={styles.details}>{frequency}</Text>
            <Text style={styles.details}>You received this prescription on {date_of_prescription}</Text>
            <Text style={{fontStyle: 'italic'}}>{description}</Text>
          </View>
        </Box>
      </VStack>
    </Box>
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