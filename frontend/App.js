import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default App;