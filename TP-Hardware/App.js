import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import About from './About.js';
import QRScanner from './QRScanner.js';
import Clima from './Clima.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Clima" 
          component={Clima} 
        />
        <Stack.Screen 
          name="About" 
          component={About} 
        />
        <Stack.Screen 
          name="QRScanner" 
          component={QRScanner} 
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});