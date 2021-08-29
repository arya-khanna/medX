import { Constants } from 'expo-camera';
import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { api } from '../constants.js'
import MyStatusBar from './MyStatusBar.js';
import Colors from './../styles/Colors'
import Spinner from './Spinner.js';
import { NativeBaseProvider, VStack, Box, Divider } from 'native-base';
import { marginBottom } from 'styled-system';

class DoctorsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      doctors: [],
      loading: true
    }
  }

  componentDidMount() {
    if (this.state.loading) {
      fetch(`${api}/prescriptions`)
        .then(response => response.json())
        .then(data => {
          this.setState({ doctors: data.doctors, loading: false });
        })
        .catch(err => {
        console.log(err);
      })
    }
  }

  render() {
    const { loading, doctors } = this.state;
    return (
      <NativeBaseProvider>
      <MyStatusBar backgroundColor={Colors.brandBlue} barStyle="light-content" />
        {loading ?
          <Spinner />
          :
          <ScrollView>
            {doctors.sort((a, b) => a.name > b.name).map(doctor => <Doctor key={doctor.id} doctor={doctor} />)}
          </ScrollView>
        }
      </NativeBaseProvider>
        
    );
  }  
};

const Doctor = ({ doctor }) => {
  const { id, name, phone_number } = doctor;
  return (
    <Box border={1} borderRadius='md' shadow={2} style={{margin: 10}} bgColor={Colors.Pink}>
      <VStack space={4} divider={<Divider />}>
        <Box px={4} pt={4}>
          <Text style={{fontWeight: 'bold', color: Colors.brandBlue}}>{`Dr. ${name}`}</Text>
        </Box>
        <Box px={4} pb={4}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-end'}}>
            <Image style={{width: 40, height: 40}} source={require('./assets/phone.png')}/>
            <Text style={{fontSize: 20}}>0{phone_number}</Text>
          </View>
        </Box>
      </VStack>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});

export default DoctorsScreen;