import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Anime {
  mal_id: number;
  title: string;
  type: string;
  episodes: number;
  score: number;
  rank: number;
  synopsis: string;
  images: { jpg: { large_image_url: string } };
  genres: Array<{ name: string }>;
  aired: { prop: { from: { year: number } } };
}

const { width: screenWidth } = Dimensions.get('window');

function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <View style={styles.toast}>
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
}

function Sidebar({ closed, toggle }: { closed: boolean; toggle: () => void }) {
  const items = ['Início', 'Favoritos', 'Sobre/Contato'];
  
  return (
    <>
      {!closed && (
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={toggle}
          activeOpacity={1}
        />
      )}
      <View style={[
        styles.sidebar, 
        closed && styles.sidebarClosed
      ]}>
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

function SearchBar({ value, onChange, onClear }: { 
  value: string; 
  onChange: (text: string) => void; 
  onClear: () => void; 
}) {
  return (
    <View style={styles.searchBar}>
      <MaterialCommunityIcons name="magnify" size={20} color="#888" />
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar animes..."
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChange}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <MaterialCommunityIcons name="close-circle" size={18} color="#888" />
        </TouchableOpacity>
      )}
    </View>
  );
}

function AnimeCard({ anime, isFavorite, onToggleFavorite }: { 
  anime: Anime; 
  isFavorite: boolean; 
  onToggleFavorite: (id: number) => void 
}) {
  const [expanded, setExpanded] = useState(false);
  const year = anime.aired?.prop?.from?.year || 'N/A';

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: anime.images.jpg.large_image_url }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>{anime.title}</Text>
          <TouchableOpacity onPress={() => onToggleFavorite(anime.mal_id)}>
            <MaterialCommunityIcons
              name={isFavorite ? "star" : "star-outline"}
              size={20}
              color={isFavorite ? "#FFD700" : "#ccc"}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.details}>{anime.type} • {anime.episodes || '?'} episódios • {year}</Text>

        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={styles.synopsis} numberOfLines={expanded ? undefined : 3}>
            {anime.synopsis || 'Sinopse não disponível'}
          </Text>
          {anime.synopsis?.length > 120 && (
            <Text style={styles.more}>{expanded ? 'Ver menos' : 'Ver mais'}</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <View style={styles.genres}>
            {anime.genres.slice(0, 2).map((genre, index) => (
              <View key={index} style={styles.genre}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>
          <View style={styles.ratings}>
            <Text style={styles.score}>⭐ {anime.score || 'N/A'}</Text>
            <Text style={styles.rank}>#{anime.rank || 'N/A'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  const [sidebarClosed, setSidebarClosed] = useState(true);
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [toast, setToast] = useState({ message: '', visible: false });
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const loadAnimes = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.jikan.moe/v4/top/anime?type=movie&limit=20');
      const data = await response.json();
      setAnimes(data.data);
      setFilteredAnimes(data.data);
    } catch (err) {
      setError('Erro ao carregar animes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnimes();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredAnimes(animes);
    } else {
      const filtered = animes.filter(anime =>
        anime.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredAnimes(filtered);
    }
  }, [search, animes]);

  const toggleFavorite = (id: number) => {
    const newFavorites = { ...favorites, [id]: !favorites[id] };
    setFavorites(newFavorites);
    setToast({ 
      message: newFavorites[id] ? 'Salvo em favoritos' : 'Removido dos favoritos', 
      visible: true 
    });
    setTimeout(() => setToast({ ...toast, visible: false }), 2000);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Carregando animes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadAnimes}>
          <Text style={styles.retryText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Sidebar 
        closed={sidebarClosed} 
        toggle={() => setSidebarClosed(!sidebarClosed)} 
      />
      
      <View style={[
        styles.main,
        !sidebarClosed && styles.mainWithSidebar
      ]}>
        <SearchBar 
          value={search}
          onChange={setSearch}
          onClear={() => setSearch('')}
        />

        <Text style={styles.results}>
          {search ? `${filteredAnimes.length} resultados` : `${filteredAnimes.length} animes`}
        </Text>

        <ScrollView 
          style={styles.list}
          contentContainerStyle={styles.listContent}
        >
          {filteredAnimes.map((anime) => (
            <AnimeCard 
              key={anime.mal_id} 
              anime={anime} 
              isFavorite={favorites[anime.mal_id] || false}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </ScrollView>
      </View>

      <Toast message={toast.message} visible={toast.visible} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  main: {
    flex: 1,
    padding: 16,
  },
  mainWithSidebar: {
    marginLeft: 200,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 200,
    backgroundColor: '#1a1a1a',
    zIndex: 1000,
  },
  sidebarClosed: {
    display: 'none',
  },
  sidebarContent: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 10,
  },
  sidebarItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
  },
  sidebarText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  menuButton: {
    position: 'absolute',
    left: 16,
    top: 50,
    backgroundColor: '#222',
    padding: 8,
    borderRadius: 4,
    zIndex: 1001,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto',
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  results: {
    color: '#888',
    marginBottom: 16,
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 110,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
    fontFamily: 'Roboto',
  },
  details: {
    color: '#fff',
    fontSize: 12,
    marginVertical: 4,
    fontFamily: 'Roboto',
  },
  synopsis: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Roboto',
  },
  more: {
    color: '#FFD700',
    fontSize: 11,
    marginTop: 4,
    fontFamily: 'Roboto',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  genre: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 2,
  },
  genreText: {
    color: '#fff',
    fontSize: 9,
    fontFamily: 'Roboto',
  },
  ratings: {
    alignItems: 'flex-end',
  },
  score: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  rank: {
    color: '#ccc',
    fontSize: 10,
    fontFamily: 'Roboto',
  },
  toast: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    zIndex: 1002,
  },
  toastText: {
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  loadingText: {
    color: '#fff',
    marginTop: 8,
    fontFamily: 'Roboto',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
    fontFamily: 'Roboto',
  },
  retryButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});