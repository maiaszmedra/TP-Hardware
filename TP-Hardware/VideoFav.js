import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Video, ResizeMode } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VideoFav({ navigation }) {
  const [input, setInput] = useState("");
  const video = useRef(null);
  const [status, setStatus] = useState({});

  const storeData = async (input) => {
    try {
      await AsyncStorage.setItem("input", input);
      console.log(input)
    } catch (error) {
      // Error saving data
    }
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('input');
      if (value !== null) {
        // We have data!!
        setInput(value)
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    retrieveData() 
  }, []);

  const onPlaybackStatusUpdate = playbackStatus => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } }
    


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInput}
        value={input}
        placeholder="Your link here"
        placeholderTextColor="#000"
        onChangeText={(input) => {setInput(input); storeData(input); }}
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
  TextInput: {
    borderRadius: 20,
    height: 40,
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
