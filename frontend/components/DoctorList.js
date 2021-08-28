import { Constants } from 'expo-camera';
import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import { api } from '../constants.js'

class DoctorList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      doctors: [],
      loading: true
    }
  }

  componentDidMount() {
    if (this.state.loading) {
      console.log(api)
      fetch(`${api}/prescriptions`)
        .then(response => response.json())
        .then(data => {
          this.setState({ doctors: data, loading: false });
          console.log("loaded");
        })
        .catch(err => {
        console.log(err);
      })
    }
  }

  render() {
    const { loading, doctors } = this.state;
    return (
      loading ?
        <Text> Loading </Text>
        :
        <ScrollView>
          {doctors.map(doctor => <Doctor key={doctors.id} doctors={doctors} />)}
        </ScrollView>
    );
  }  
};

const Doctor = ({ doctor }) => {
  const { id, name, email, phone } = doctor;
  console.log(`${api}/prescription/${id}/file/${filename}`);
  return (
    <View style={styles.container}>
            <Text style={styles.details}>Doctor Name: {name}</Text>
            <Text style={styles.details}>Email: {email}</Text>
            <Text style={styles.details}>Phone: {phone}</Text>
    </View>
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

export default DoctorList;