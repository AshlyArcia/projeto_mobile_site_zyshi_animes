import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ANIMES</Text>

      <ScrollView style={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.cardText}>Kaiju n 8</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>One Piece</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Death Note</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Bleach</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", 
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  scroll: {
    flex: 1,
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
  },
});
