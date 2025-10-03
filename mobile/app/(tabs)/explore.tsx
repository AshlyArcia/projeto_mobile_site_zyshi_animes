import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  ImageBackground,
} from "react-native";
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />




      {}
      <ImageBackground
      
        source={{ uri: "http://i.pinimg.com/originals/76/c0/a8/76c0a814cf966cc2c5093ed8064ac505.gif" }} 
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text>ANIMES</Text>
        </View>
      </ImageBackground>

      {}
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 24 }}>
        <ImageBackground
  source={{ uri: "https://upload.wikimedia.org/wikipedia/pt/9/92/Kaiju_N%C2%BA_8.jpg" }}
  style={styles.card}
  imageStyle={{ borderRadius: 20 }}
>
  <Text style={styles.cardText}>Kaiju No. 8</Text>
</ImageBackground>

        <View style={styles.card}><Text style={styles.cardText}>One Piece</Text></View>
        <View style={styles.card}><Text style={styles.cardText}>Death Note</Text></View>
        <View style={styles.card}><Text style={styles.cardText}>Bleach</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  header: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%", 
    justifyContent: "center",
    alignItems: "center",
  },

  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  cardImage: {






  },
  card: {
    alignSelf:'flex-end',
    backgroundColor: "#1e1e1e",
    width: "50%",
    padding: 100,
    borderRadius: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#2a2a3d",
  },
  cardText: {
    fontFamily: "Goldman",
    color: "#fff",
    fontSize: 22,
  },
});