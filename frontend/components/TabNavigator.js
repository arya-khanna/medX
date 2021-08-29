import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from "../styles/Colors";
import styles from "../styles/GlobalStyles"
import CameraScreen from './CameraScreen';
// import Reminders from './Reminders';
import MedicinesScreen from './MedicinesScreen';
import MyStatusBar from './MyStatusBar';
import NewPrescription from './NewPrescription';
import DoctorsScreen from './DoctorsScreen'

const Tab = createBottomTabNavigator();

//const HomeScreen = () => {
//  return (
 //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 //     <MyStatusBar backgroundColor={Colors.brandBlue} barStyle="light-content" />
 //     <Text>Home!</Text>
 //   </View>
//  );
//}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="My Prescriptions"
      screenOptions={
        {
          "tabBarActiveBackgroundColor": "#F5E6E8",
          "tabBarInactiveBackgroundColor": "#DBC2C6",
          "tabBarShowLabel": false,
          "tabBarStyle": [{
              "display": "flex"
            },
            null
          ]
        }
    }
    >
      <Tab.Screen
        name="My Prescriptions"
        component={MedicinesScreen}
        options={{
          tabBarLabel: 'Medicines',
          tabBarIcon: () => (
            <Image style={{width: 40, height: 40}} source={require('./assets/med.png')}          
                />
          ),
          headerStyle: { backgroundColor: '#DBC2C6' },
          headerTitleStyle: {
            color: Colors.white,
            fontWeight: 'bold',
          }
        }}
      />
      
      <Tab.Screen
        name="Add A New Prescription"
        component={NewPrescription}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <View
              style={{
                position: 'absolute',
                bottom: 5, // space from bottombar
                height: 70,
                width: 70,
                borderRadius: 58,
                backgroundColor: '#AAA1C8',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
            <Image style={{width: 50, height: 50}} source={require('./assets/new.png')}          
                /></View>
              ),
          headerStyle: { backgroundColor: '#DBC2C6' },
          headerTitleStyle: {
            color: Colors.white,
            fontWeight: 'bold',
          }
        }}
      />
      {/* <Tab.Screen
        name="Reminders"
        component={Reminders}
        options={{
          tabBarLabel: 'Reminders',
          tabBarIcon: () => (
        
            <Image style={{width: 40, height: 40}} source={require('./assets/rem.png')}          
                />

          ),
          headerStyle: { backgroundColor: Colors.brandBlue },
          headerTitleStyle: {
            color: Colors.white,
            fontWeight: 'bold',
          }
        }}
      /> */}
    
      <Tab.Screen
        name="My Doctors"
        component={DoctorsScreen}
        options={{
          tabBarLabel: 'Your Doctors',
          tabBarIcon: () => (
            <Image style={{width: 40, height: 40}} source={require('./assets/share.png')}          
                />
          ),
          headerStyle: { backgroundColor: '#DBC2C6' },
          headerTitleStyle: {
            color: Colors.white,
            fontWeight: 'bold',
          }
        }}
        
      />
    </Tab.Navigator>
  );
}

const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={styles.bottomBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        }

        const color = isFocused ? Colors.dark : Colors.gray;

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            testID={options.tabBarTestID}
            accessibilityRole="button"
          >
            <BottomTab
              index={index}
              isFocused={isFocused}
              size={24}
              color={color}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const BottomTab = ({type, color, size = 24, index }) => {
  return (
    <View>
      <View>
        <Text>Blank</Text>
      </View>
    </View>
  )
}

export default TabNavigator;