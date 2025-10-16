import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Anime {
  id: string;
  title: string;
  status: string;
  detail: string;
  description: string;
  image: string;
  tags: string[];
  rating: string;
  ranking: string;
}

const { width: screenWidth } = Dimensions.get('window');

// Componente Toast
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

// Componente Sidebar
function Sidebar({
  closed,
  toggle,
}: {
  closed: boolean;
  toggle: () => void;
}) {
  const sidebarItems = [
    { id: "home", label: "Início" },
    { id: "favorites", label: "Favoritos" },
    { id: "about", label: "Sobre" },
    { id: "contact", label: "Contato" },
  ];

  return (
    <>
      {/* Overlay para fechar sidebar quando aberta */}
      {!closed && (
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={toggle}
          activeOpacity={1}
        />
      )}
      
      {/* Sidebar */}
      <Animated.View style={[
        styles.sidebar,
        closed && styles.sidebarClosed
      ]}>
        <Image
          source={{ uri: 'https://wallpaperaccess.com/full/11789057.jpg' }}
          style={styles.sidebarBackground}
        />
        <View style={styles.sidebarContent}>
          {sidebarItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.sidebarLink}
              onPress={toggle}
            >
              <Text style={styles.sidebarLinkText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Botão Toggle */}
      <TouchableOpacity style={styles.toggleBtn} onPress={toggle}>
        <Text style={styles.toggleBtnText}>☰</Text>
      </TouchableOpacity>
    </>
  );
}

// Componente AnimeCard
function AnimeCard({ anime, isFavorite, onToggleFavorite }: { anime: Anime; isFavorite: boolean; onToggleFavorite: (id: string) => void }) {
  return (
    <View style={styles.mainCard}>
      <View style={styles.cardContent}>
        <Image
          source={{ uri: anime.image }}
          style={styles.animeImage}
          resizeMode="cover"
        />
        
        <View style={styles.textContent}>
          <View style={styles.headerRow}>
            <Text style={styles.mainTitle} numberOfLines={1} ellipsizeMode="tail">
              {anime.title}
            </Text>
            <TouchableOpacity 
              onPress={() => onToggleFavorite(anime.id)} 
              style={styles.favoriteButton}
            >
              <MaterialCommunityIcons
                name={isFavorite ? "star" : "star-outline"}
                size={20}
                color={isFavorite ? "#FFD700" : "#ccc"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.subtitle}>{anime.status}</Text>
            <Text style={styles.detail}>{anime.detail}</Text>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {anime.description}
          </Text>

          <View style={styles.bottomInfo}>
            <View style={styles.tagsContainer}>
              {anime.tags.map((tag: string, index: number) => (
                <View key={index} style={styles.tagBubble}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.ratingSection}>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{anime.rating}</Text>
                <Text style={styles.ranking}>{anime.ranking}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
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

      // Mostrar toast message
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

  const animes: Anime[] = [
    {
      id: 'kaiju-no-8',
      title: 'Kaiju N 8',
      status: 'En andamento',
      detail: 'Estreou 2025 • 12 episódios',
      description: 'Kaiju No. 8 acompanha Kafka Nagai, um segurança que, ao ganhar a habilidade de se transformar em um kaiju do nível 8, enfrenta monstros gigantes e conspirações.',
      image: 'https://upload.wikimedia.org/wikipedia/pt/9/92/Kaiju_N%C2%BA_8.jpg',
      tags: ['Ação', 'Ficção'],
      rating: '4,9',
      ranking: '#1111'
    },
    {
      id: 'one-piece',
      title: 'One Piece',
      status: 'Em andamento',
      detail: 'Estreou 1999 • 1100+ episódios',
      description: 'Monkey D. Luffy e sua tripulação navegam pelos mares em busca do tesouro supremo, o One Piece, para que ele se torne o Rei dos Piratas.',
      image: 'https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_jdu9iem1nt14d6ius8kd57p21k/-S897-FWEBP',
      tags: ['Aventura', 'Ação'],
      rating: '4,8',
      ranking: '#25'
    },
    {
      id: 'death-note',
      title: 'Death Note',
      status: 'Concluído',
      detail: 'Estreou 2006 • 37 episódios',
      description: 'Um estudante genius encontra um caderno sobrenatural que permite matar qualquer pessoa cujo nome seja escrito nele.',
      image: 'https://cdn.culturagenial.com/imagens/death-note-cartaz.jpg?class=article',
      tags: ['Suspense', 'Psicológico'],
      rating: '4,9',
      ranking: '#5'
    },
    {
      id: 'bleach',
      title: 'Bleach',
      status: 'Em andamento',
      detail: 'Estreou 2004 • 366 episódios',
      description: 'Ichigo Kurosaki ganha poderes de Shinigami e protege os vivos de espíritos malignos e guia almas ao mundo espiritual.',
      image: 'https://m.media-amazon.com/images/M/MV5BOWQwOWY5NTUtMjAyZi00YjQzLTkwODgtNmQwZjU1MGIzZDhjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      tags: ['Ação', 'Sobrenatural'],
      rating: '4,7',
      ranking: '#48'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Sidebar
        closed={sidebarClosed}
        toggle={() => setSidebarClosed(!sidebarClosed)}
      />
      
      <View style={[
        styles.mainContent,
        !sidebarClosed && styles.mainContentShifted
      ]}>
        {/* Título da página */}
        <Text style={styles.titleStyle}>ANIMES</Text>
        
        {/* Lista de animes */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {animes.map((anime: Anime) => (
            <AnimeCard 
              key={anime.id} 
              anime={anime} 
              isFavorite={favoriteAnimes[anime.id] || false}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </ScrollView>
      </View>

      {/* Toast Message */}
      <SimpleToast message={toastMessage} visible={toastVisible} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  // Sidebar Styles
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 220,
    zIndex: 1000,
  },
  sidebarClosed: {
    width: 0,
    overflow: 'hidden',
  },
  sidebarBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sidebarContent: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  sidebarLink: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebarLinkText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  toggleBtn: {
    position: 'absolute',
    left: 10,
    top: 50,
    backgroundColor: '#222',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    zIndex: 1001,
  },
  toggleBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  // Main Content Styles
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  mainContentShifted: {
    marginLeft: 220,
  },
  // Title Style
  titleStyle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Goldman',
    marginTop: 10,
  },
  // Anime Card Styles
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  mainCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    minHeight: 140,
  },
  cardContent: {
    flexDirection: "row",
    flex: 1,
  },
  animeImage: {
    width: 80,
    height: 110,
    borderRadius: 8,
    marginRight: 12,
  },
  textContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  mainTitle: {
    fontFamily: "Goldman",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    marginRight: 8,
  },
  favoriteButton: {
    padding: 2,
  },
  statusRow: {
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 2,
  },
  detail: {
    fontSize: 11,
    color: "#ccc",
  },
  description: {
    color: "#fff",
    fontSize: 11,
    lineHeight: 14,
    marginBottom: 8,
    flex: 1,
  },
  bottomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  tagsContainer: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  tagBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 2,
  },
  tagText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "600",
  },
  ratingSection: {
    alignItems: "flex-end",
    marginLeft: 8,
  },
  ratingContainer: {
    alignItems: "flex-end",
  },
  rating: {
    color: "#FFD700",
    fontSize: 14,
    fontWeight: "bold",
  },
  ranking: {
    color: "#ccc",
    fontSize: 10,
    marginTop: 1,
  },
  // Toast Styles
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
  },
  toastText: {
    color: "#000000ff",
    fontSize: 14,
    fontWeight: 'bold',
  },
});