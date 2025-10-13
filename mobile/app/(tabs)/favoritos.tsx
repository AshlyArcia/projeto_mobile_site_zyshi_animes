import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Anime {
  id: string;
  title: string;
  uri: string;
}

const ANIME_MAP: Anime[] = [
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    uri: "https://i.pinimg.com/1200x/73/98/85/73988526c06d7197980e7559276eb1c2.jpg",
  },
  {
    id: "record-of-ragnarok",
    title: "Record of Ragnarok",
    uri: "https://m.media-amazon.com/images/M/MV5BMjQ5NWY2OWEtMDdjNC00N2YxLTkxYTctNDJlNmE1MmMzYzU5XkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: "death-note",
    title: "Death Note",
    uri: "https://m.media-amazon.com/images/I/716ASj7z2GL._UF894,1000_QL80_.jpg",
  },
  {
    id: "to-be-herox",
    title: "To Be HeroX",
    uri: "https://m.media-amazon.com/images/M/MV5BMWRjNjFmY2UtNDA2ZS00ZmFhLWI5ZmQtNGQwNGMwMWU3Nzg5XkEyXkFqcGc@._V1_.jpg",
  },
];


function SimpleToast({ message, visible }: { message: string; visible: boolean }) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

     
      const timeout = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
}

export default function App() {
  const [favoriteAnimes, setFavoriteAnimes] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const toggleFavorite = (animeId: string) => {
    setFavoriteAnimes((prevFavorites) => {
      const newStatus = !prevFavorites[animeId];

      
      setToastMessage(newStatus ? "Salvo em favoritos" : "Removido dos favoritos");
      setToastVisible(true);

      
      setTimeout(() => {
        setToastVisible(false);
      }, 2300);

      return {
        ...prevFavorites,
        [animeId]: newStatus,
      };
    });
  };

  const renderCard = (anime: Anime) => {
    const isFavorite = favoriteAnimes[anime.id] || false;

    return (
      <View style={styles.card} key={anime.id}>
        <ImageBackground source={{ uri: anime.uri }} style={styles.cardImage} resizeMode="cover">
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>{anime.title}</Text>

            <TouchableOpacity onPress={() => toggleFavorite(anime.id)} style={styles.favoriteButton}>
              <MaterialCommunityIcons
                name={isFavorite ? "star" : "star-outline"}
                size={24}
                color={isFavorite ? "#ffd500ff" : "#ff9900ff"}
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
        source={{
          uri: "https://i.pinimg.com/originals/11/39/cd/1139cdb940ce667395b9e4b839c1c5f8.gif",
        }}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>FAVORITOS.</Text>
        </View>
      </ImageBackground>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={styles.cardsContainer}>{ANIME_MAP.map(renderCard)}</View>
      </ScrollView>

      
      <SimpleToast message={toastMessage} visible={toastVisible} />
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
    backgroundColor: "#000000ff",
    width: "48%",
    marginBottom: 20,
    borderRadius: 5,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 180,
    justifyContent: "flex-end",
  },

  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  },

  toastContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "#ffffff7a",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    opacity: 0.9,
  },
  toastText: {
    color: "#000000ff",
    fontSize: 14,
  },
});
