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
import QRCode from "react-qr-code";

export default function About({navigation}) {
  return (
    <View style={styles.container}>
   
    <TouchableOpacity
    style={styles.button}
    onPress={() => {navigation.navigate('');}}
    >
        <Text>Escanear</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E9DC',
    alignItems: 'center',
    justifyContent: 'center',
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
