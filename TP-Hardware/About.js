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
    <QRCode
        size={300}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={`Tami Schnaiderman y Maia Szmedra`}
        viewBox={`0 0 256 256`}
        fgColor="#4C5760"
    />
    <TouchableOpacity
    style={styles.button}
    onPress={() => {navigation.navigate('QRScanner');}}
    >
        <Text>Escanear</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
