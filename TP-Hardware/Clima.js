import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import * as Location from 'expo-location';
import axios from "axios"

export default function Clima({ navigation }) {
const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
const [temperature, setTemperature] = useState(0);

useEffect(() => {
    //get location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    //pegarle a la api
    if(!location){
        return
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=0cd4c845628a93ee3dd46acea3646046`;
    axios.get(apiUrl).then((response) => {
      setTemperature(response.data.current.temp);
      console.log(temperature);
    });
  }, [location]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("About");
        }}
      >
        <Text>Go to About</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3E9DC",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 80,
    borderRadius: 20,

    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: "#DAB49D",
  },
});
