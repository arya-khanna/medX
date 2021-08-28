import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  StatusBar,
  SafeAreaView
} from 'react-native';
import styles from "../styles/GlobalStyles"

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

export default MyStatusBar;