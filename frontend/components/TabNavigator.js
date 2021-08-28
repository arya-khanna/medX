import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from "../styles/Colors";
import styles from "../styles/GlobalStyles"
import CameraScreen from './CameraScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

const RemindersScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const MedicinesScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const ShareScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={
        { showLabel: false ,
        activeBackgroundColor: '#DBC2C6',
       inactiveBackgroundColor: '#F5E6E8'
        }
    }
      
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Image style={{width: 40, height: 40}} source={require('./assets/home.png')}          
                />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: () => (
            <Image style={{width: 40, height: 40}} source={require('./assets/cam.png')}          
                />
          ),
        }}
      />
      <Tab.Screen
        name="Reminders"
        component={RemindersScreen}
        options={{
          tabBarLabel: 'Reminders',
          tabBarIcon: () => (
        
            <Image style={{width: 40, height: 40}} source={require('./assets/rem.png')}          
                />

          ),
        }}
      />
      <Tab.Screen
        name="Medicines"
        component={MedicinesScreen}
        options={{
          tabBarLabel: 'Medicines',
          tabBarIcon: () => (
            <Image style={{width: 40, height: 40}} source={require('./assets/med.png')}          
                />
          ),
        }}
      />
      <Tab.Screen
        name="Share"
        component={ShareScreen}
        options={{
          tabBarLabel: 'Share',
          tabBarIcon: () => (
            <Image style={{width: 40, height: 40}} source={require('./assets/share.png')}          
                />
          ),
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