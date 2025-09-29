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
        source={{ uri: "https://wallpapers.com/images/hd/male-anime-characters-e5qgslpvg4gaf0rc.jpg" }} 
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>ANIMES.</Text>
        </View>
      </ImageBackground>

      {}
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.card}><Text style={styles.cardText}>Kaiju No. 8</Text></View>
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
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", 
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Goldman",
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
  },

  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: 24,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#2a2a3d",
  },
  cardText: {
    fontFamily: "Goldman",
    color: "#fff",
    fontSize: 22,
  },
});