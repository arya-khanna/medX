import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from "./styles/Colors";

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

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

const CameraScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Camera!</Text>
    </View>
  );
}


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="home" component={HomeScreen} />
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

const BottomTab = ({ type, color, size = 24, index }) => {
  return (
    <View>
      <View>
        <Text>Blank</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomBar: {
    height: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  middleIcon: {
    bottom: 18,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    elevation: 8,
  }
});

export default App;