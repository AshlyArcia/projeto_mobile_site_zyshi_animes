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
  Image,
  Dimensions,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Anime {
  id: string;
  title: string;
  uri: string;
}

const { width: screenWidth } = Dimensions.get("window");

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

// === SIDEBAR ===
function Sidebar({
  closed,
  toggle,
}: {
  closed: boolean;
  toggle: () => void;
}) {
  const items = ["Início", "Favoritos", "Sobre/Contato"];

  return (
    <>
      {!closed && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={toggle}
          activeOpacity={1}
        />
      )}

      <View style={[styles.sidebar, closed && styles.sidebarClosed]}>
        <View style={styles.sidebarContent}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.sidebarItem}
              onPress={toggle}
            >
              <Text style={styles.sidebarText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={toggle}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
    </>
  );
}

// Toast simples
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
  const [sidebarClosed, setSidebarClosed] = useState(true);
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
                color={isFavorite ? "#FFD700" : "#ccc"}
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

      <Sidebar closed={sidebarClosed} toggle={() => setSidebarClosed(!sidebarClosed)} />

      <View style={[styles.mainContent, !sidebarClosed && styles.mainContentShifted]}>
        <ImageBackground
          source={{
            uri: "https://i.pinimg.com/originals/11/39/cd/1139cdb940ce667395b9e4b839c1c5f8.gif",
          }}
          style={styles.header}
          resizeMode="cover"
        >
          {/* Centraliza o título */}
          <View style={styles.headerOverlay}>
            <Text style={styles.headerTitle}>FAVORITOS.</Text>
          </View>
        </ImageBackground>

        <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 50 }}>
          <View style={styles.cardsContainer}>{ANIME_MAP.map(renderCard)}</View>
        </ScrollView>

        <SimpleToast message={toastMessage} visible={toastVisible} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  // === SIDEBAR ===
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: 200,
    backgroundColor: "#1a1a1a",
    zIndex: 1000,
  },
  sidebarClosed: {
    display: "none",
  },
  sidebarContent: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 10,
  },
  sidebarItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
  },
  sidebarText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto",
  },
  menuButton: {
    position: "absolute",
    left: 16,
    top: 50,
    backgroundColor: "#222",
    padding: 8,
    borderRadius: 4,
    zIndex: 1001,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },

  mainContent: {
    flex: 1,
  },
  mainContentShifted: {
    marginLeft: 200,
  },

  // === HEADER CENTRALIZADO ===
  header: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },

  // === CARDS ===
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
    backgroundColor: "#1a1a1a",
    width: "48%",
    marginBottom: 20,
    borderRadius: 8,
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
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  favoriteButton: {
    paddingLeft: 9,
  },

  // === TOAST ===
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
