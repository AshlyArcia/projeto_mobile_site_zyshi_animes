import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";


import { MaterialCommunityIcons } from "@expo/vector-icons";



interface Anime {
    id: string;
    title: string;
    uri: string;
}


const ANIME_MAP: Anime[] = [
  { 
    id: 'jujutsu-kaisen', 
    title: 'Jujutsu Kaisen', 
    uri: 'https://i.pinimg.com/1200x/73/98/85/73988526c06d7197980e7559276eb1c2.jpg' 
  },
  { 
    id: 'record-of-ragnarok', 
    title: 'Record of Ragnarok', 
    uri: 'https://i.pinimg.com/564x/df/76/9a/df769a667b2d5f7f32e957a078e8b23c.jpg' 
  },
  { 
    id: 'death-note', 
    title: 'Death Note', 
    uri: 'https://i.pinimg.com/564x/a4/09/cc/a409cc9f36f90380f2d4e68e47f55b2d.jpg' 
  },
  { 
    id: 'to-be-herox', 
    title: 'To Be HeroX', 
    uri: 'https://i.pinimg.com/564x/b8/ec/a9/b8eca924874c8b9d249f69741e9e7b41.jpg' 
  },
];


export default function App() {
  const [favoriteAnimes, setFavoriteAnimes] = useState<Record<string, boolean>>({});

  const toggleFavorite = (animeId: string) => {
    setFavoriteAnimes(prevFavorites => ({
      ...prevFavorites,
      [animeId]: !prevFavorites[animeId], 
    }));
  };
 
  const renderCard = (anime: Anime) => {
    const isFavorite = favoriteAnimes[anime.id] || false; 

    return (
      <View style={styles.card} key={anime.id}>
        <ImageBackground
          source={{ uri: anime.uri }}
          style={styles.cardImage}
          resizeMode="cover"
        >
          {/* Container para o texto e a estrela UnU*/}
          <View style={styles.cardContent}> 
            <Text style={styles.cardText}>{anime.title}</Text>
            
            {/* Botão de Estrela */}
            <TouchableOpacity 
                onPress={() => toggleFavorite(anime.id)} 
                style={styles.favoriteButton}
            >
              <MaterialCommunityIcons
                name={isFavorite ? "star" : "star-outline"}
                size={24}
                color={isFavorite ? "#FFD700" : "#fff"}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={{ uri: "https://i.pinimg.com/originals/11/39/cd/1139cdb940ce667395b9e4b839c1c5f8.gif" }}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>FAVORITOS.</Text>
        </View>
      </ImageBackground>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={styles.cardsContainer}>
          
          {ANIME_MAP.map(renderCard)}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


// --- (Styles) ---

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
    fontSize: 28,
    color: "#fff",
    fontFamily: "Golsdman",
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
    width: "48%", 
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 180,
    justifyContent: "flex-end",
  },
  
  cardContent: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.6)", 
    padding: 10,
  },
  cardText: {
    fontFamily: "Goldman",
    color: "#fff",
    fontSize: 16, 
  },
  
  favoriteButton: {
      paddingLeft: 9, 
  }
});