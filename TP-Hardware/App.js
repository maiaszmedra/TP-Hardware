import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import About from './About.js';
import QRScanner from './QRScanner.js';
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
import { AuthProvider } from './context/index.js';
import { ContextProvider } from "./contextState";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <AuthProvider>
      <NavigationContainer>
      <Stack.Navigator>
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
    </AuthProvider>
    </ContextProvider>
    
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