import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import QRCode from "react-qr-code";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native';
import React, { useState, useEffect } from "react";

export default function About({ navigation }) {
  const [image, setImage] = useState(null);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('image');
      if (value !== null) {
        // We have data!!
        setImage(value)
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    retrieveData()
  }, []);


  return (
    <View style={styles.container}>
      {image ?
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <QRCode
            size={300}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`Tami Schnaiderman y Maia Szmedra`}
            viewBox={`0 0 256 256`}
            fgColor="#4C5760"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => { navigation.navigate('QRScanner'); }}
          >
            <Text>Escanear</Text>
          </TouchableOpacity>
        </ImageBackground>
        :
        <ImageBackground
          source="https://cdn11.bigcommerce.com/s-l2xlls5oyw/images/stencil/608x608/products/30820/45500/dd0202a2-efab-46ae-8f1b-cfa45c56b8c2__54150.1661175112.jpg"
          resizeMode="cover"
          style={styles.backgroundImage}>
          <QRCode
            size={300}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`Tami Schnaiderman y Maia Szmedra`}
            viewBox={`0 0 256 256`}
            fgColor="#4C5760"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => { navigation.navigate('QRScanner'); }}
          >
            <Text>Escanear</Text>
          </TouchableOpacity>
        </ImageBackground>
       }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: "#D7CEB2",
  },
});
