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

      <ImageBackground
        source={{ uri: "https://i.pinimg.com/originals/4e/c6/e9/4ec6e92c44ee8d02e5ca5ce58dfb7035.gif" }}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>FAVORITOS.</Text>
        </View>
      </ImageBackground>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <ImageBackground
              source={{ uri: 'https://i.pinimg.com/1200x/73/98/85/73988526c06d7197980e7559276eb1c2.jpg' }} // Coloque o link da imagem aqui
              style={styles.cardImage}
              resizeMode="contain"
            >
              <Text style={styles.cardText}>Jujutsu Kaisen8</Text>
            </ImageBackground>
          </View>

          <View style={styles.card}>
            <ImageBackground
              source={{ uri: 'link-da-imagem-para-record-of-ragnarok' }} // Coloque o link da imagem aqui
              style={styles.cardImage}
              resizeMode="cover"
            >
              <Text style={styles.cardText}>Record of Ragnarok</Text>
            </ImageBackground>
          </View>

          <View style={styles.card}>
            <ImageBackground
              source={{ uri: 'link-da-imagem-para-death-note' }} // Coloque o link da imagem aqui
              style={styles.cardImage}
              resizeMode="cover"
            >
              <Text style={styles.cardText}>Death Note</Text>
            </ImageBackground>
          </View>

          <View style={styles.card}>
            <ImageBackground
              source={{ uri: 'link-da-imagem-para-to-be-herox' }} // Coloque o link da imagem aqui
              style={styles.cardImage}
              resizeMode="cover"
            >
              <Text style={styles.cardText}>To Be HeroX</Text>
            </ImageBackground>
          </View>
        </View>
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
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  card: {
    backgroundColor: "#1e1e1e",
    width: "45%", // Ajuste a largura para ser menor
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 180,
    justifyContent: "flex-end",
    padding: 10,
  },
  cardText: {
    fontFamily: "Goldman",
    color: "#fff",
    fontSize: 18,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Coloca fundo semi-transparente para o texto
    padding: 5,
  },
});
