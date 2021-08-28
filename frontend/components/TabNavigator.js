import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text
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

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shop" component={CameraScreen} />
      <Tab.Screen name="Favorite" component={SettingsScreen} />
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