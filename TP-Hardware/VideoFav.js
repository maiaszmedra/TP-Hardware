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

export default function VideoFav({ navigation }) {
  const [input, setInput] = useState();
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInput}
        value={input}
        placeholder="Your link here"
        placeholderTextColor="#000"
        onChangeText={(input) => setInput(input)}
      />
      <Text>video</Text>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={"contain"}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <Text>video</Text>
    {input
    ?
    //video
    <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    : <Text>Aca iría tu video</Text>
}



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
  video: {
    resizeMode: 'contain',
    width: "80%",
    height: "100px",
    position: "static",
  }
});
