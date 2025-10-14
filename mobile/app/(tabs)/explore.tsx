import React, { useState } from "react";
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

// Componente Sidebar
function Sidebar({
  onNavigate,
  closed,
  toggle,
  currentPage,
}: {
  onNavigate: (page: string) => void;
  closed: boolean;
  toggle: () => void;
  currentPage: string;
}) {
  const sidebarItems = [
    { id: "home", label: "Início" },
    { id: "services", label: "Serviços" },
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
              style={[
                styles.sidebarLink,
                currentPage === item.id && styles.sidebarLinkActive
              ]}
              onPress={() => {
                onNavigate(item.id);
                toggle();
              }}
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

// Componente Navbar
function Navbar({ onNavigate, current }: { onNavigate: (page: string) => void; current: string }) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "Sobre" },
    { id: "contact", label: "Contato" },
  ];

  return (
    <View style={styles.navbar}>
      <View style={styles.navbarUl}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onNavigate(item.id)}
          >
            <Text style={[
              styles.navbarLink,
              current === item.id && styles.navbarLinkActive
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// Componentes das páginas
function HomeCards({ animes, favoriteAnimes, toggleFavorite }: any) {
  const AnimeCard = ({ anime }: { anime: Anime }) => {
    const isFavorite = favoriteAnimes[anime.id] || false;

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
                onPress={() => toggleFavorite(anime.id)} 
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
  };

  return (
    <>
      <Text style={styles.titleStyle}>ANIMES</Text>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {animes.map((anime: Anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </ScrollView>
    </>
  );
}

function About() {
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Sobre</Text>
      <View style={styles.contentCard}>
        <Text style={styles.cardText}>
          <Text style={styles.boldText}>Sobre:</Text> Este é um projeto exemplo com Sidebar, Navbar e cards de animes, tudo em React Native!
        </Text>
      </View>
    </View>
  );
}

function Contact() {
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Contato</Text>
      <View style={styles.contentCard}>
        <Text style={styles.cardText}>
          <Text style={styles.boldText}>Contato:</Text> Envie um email para contato@exemplo.com
        </Text>
      </View>
    </View>
  );
}

function Services() {
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Serviços</Text>
      <View style={styles.contentCard}>
        <Text style={styles.cardText}>
          <Text style={styles.boldText}>Serviços:</Text> Aqui você pode encontrar nossos serviços fictícios!
        </Text>
      </View>
    </View>
  );
}

export default function App() {
  const [sidebarClosed, setSidebarClosed] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [favoriteAnimes, setFavoriteAnimes] = useState<Record<string, boolean>>({});

  const toggleFavorite = (animeId: string) => {
    setFavoriteAnimes((prevFavorites) => ({
      ...prevFavorites,
      [animeId]: !prevFavorites[animeId],
    }));
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

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomeCards animes={animes} favoriteAnimes={favoriteAnimes} toggleFavorite={toggleFavorite} />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "services":
        return <Services />;
      default:
        return <HomeCards animes={animes} favoriteAnimes={favoriteAnimes} toggleFavorite={toggleFavorite} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Sidebar
        onNavigate={setCurrentPage}
        closed={sidebarClosed}
        toggle={() => setSidebarClosed(!sidebarClosed)}
        currentPage={currentPage}
      />
      
      <View style={[
        styles.mainContent,
        !sidebarClosed && styles.mainContentShifted
      ]}>
        <Navbar onNavigate={setCurrentPage} current={currentPage} />
        {renderPage()}
      </View>
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
  sidebarLinkActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
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
  // Navbar Styles
  navbar: {
    backgroundColor: '#333',
    padding: 16,
    marginHorizontal: -16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 20,
  },
  navbarUl: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navbarLink: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  navbarLinkActive: {
    color: '#FFD700',
  },
  // Page Styles
  pageContainer: {
    flex: 1,
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Goldman',
  },
  contentCard: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
  titleStyle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Goldman',
    marginTop: 10,
  },
  // Anime Card Styles (mantidos do código anterior)
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
});