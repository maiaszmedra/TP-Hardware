import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from "react";
import { ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Background({ navigation }) {
  const [image, setImage] = useState(null);

  const storeData = async (image) => {
    try {
      await AsyncStorage.setItem("image", image);
      console.log(image)
    } catch (error) {
      // Error saving data
    }
  };

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

  useEffect(()=>{
    storeData(image)
  },[image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {image?<ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.backgroundImage}>

        <Text style={styles.texto}>
        You have chosen a background image
      </Text>
      <TouchableOpacity
        style={styles.button1}
        onPress={() => { navigation.navigate('Camara'); }}
      >
        <Text style={styles.btnText}>Take a photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button1}
        onPress={pickImage}
      >
        <Text style={styles.btnText}>Select from galery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => { navigation.navigate('VideoFav'); }}
      >
        <Text style={styles.btnText}>Watch a video!</Text>
      </TouchableOpacity>

      </ImageBackground>
      :<ImageBackground
      source="https://cdn11.bigcommerce.com/s-l2xlls5oyw/images/stencil/608x608/products/30820/45500/dd0202a2-efab-46ae-8f1b-cfa45c56b8c2__54150.1661175112.jpg"
      resizeMode="cover"
      style={styles.backgroundImage}>
        <Text style={styles.texto}>
        Here you can change the background image
      </Text>
      <TouchableOpacity
        style={styles.button1}
        onPress={() => { navigation.navigate('Camara'); }}
      >
        <Text style={styles.btnText}>Take a photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button1}
        onPress={pickImage}
      >
        <Text style={styles.btnText}>Select from galery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => { navigation.navigate('VideoFav'); }}
      >
        <Text style={styles.btnText}>Watch a video!</Text>
      </TouchableOpacity>
    </ImageBackground>}

      
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
    marginTop: 50,
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
    backgroundColor: "#4C5760",
  },
  button1: {
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
  texto: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#4C5760",
  },
});
