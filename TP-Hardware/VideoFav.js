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
import React, { useRef, useState, useEffect } from "react";
import { Video, ResizeMode } from 'expo-av';
import {AsyncStorage} from 'react-native';

export default function VideoFav({ navigation }) {
  const [input, setInput] = useState();
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [item, setItem] = useState();

  storeData = async () => {
    try {
      await AsyncStorage.setItem(
        '@MySuperStore:key',
        'I like to save it.',
      );
    } catch (error) {
      // Error saving data
    }
  };

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('recientes');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInput}
        value={input}
        placeholder="Your link here"
        placeholderTextColor="#000"
        onChangeText={(input) => setInput(input)}
      />
      <View style={styles.videoView}>
        <Video
        ref={video}
        videoStyle={{position: 'none'}}
        style={styles.video}
        source={{
          uri: input || 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Clima");
        }}
      >
        <Text style={styles.btnText}>Go to Weather</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAED",
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
    backgroundColor: "#93A8AC",
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#FFFAED",
  },
  TextInput: {
    borderRadius: 20,
    height: 50,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    width: "80%",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    placeholderTextColor: "gray",
  },
  videoView:{
    width: "80%",
  },
  video: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
    position: "relative",
  }
});
