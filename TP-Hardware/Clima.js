import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from 'expo-location';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground} from 'react-native';


export default function Clima({ navigation }) {
const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
const [temperature, setTemperature] = useState();
const [ubi, setUbi] = useState();
const [date, detDate]= useState(new Date().toLocaleString())
const [image, setImage] = useState(null);

  const retrieveDataBackground = async () => {
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
    retrieveDataBackground() 
  }, []);

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
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&APPID=0cd4c845628a93ee3dd46acea3646046&units=metric`;
    console.log(location.coords.latitude);
    axios.get(apiUrl).then((response) => {
      setTemperature(response.data.main.temp);
      setUbi(response.data.name);
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
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.backgroundImage}>
      {/*<Text style={styles.paragraph}>{text}</Text>*/}
      <Text style={styles.text}> {ubi} </Text>
      <Text style={styles.text}> {date} </Text>
      <Text style={styles.text}>Local temperature is {temperature} degrees</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("About");
        }}
      >
        <Text style={styles.btnText}>Go to About</Text>
      </TouchableOpacity>
      </ImageBackground>
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
    backgroundColor: "#93A8AC",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#FFFAED",
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#4C5760",
  }
});
