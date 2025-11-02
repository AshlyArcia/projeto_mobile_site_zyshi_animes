import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Anime {
  mal_id: number;
  title: string;
  type: string;
  episodes: number;
  score: number;
  synopsis: string;
  images: { jpg: { large_image_url: string } };
  genres: Array<{ name: string }>;
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

function AnimeCard({ anime, isFavorite, onToggleFavorite }: { 
  anime: Anime; 
  isFavorite: boolean; 
  onToggleFavorite: (id: number) => void 
}) {
  const [expanded, setExpanded] = useState(false);

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

        <Text style={styles.details}>{anime.type} • {anime.episodes || '?'} episódios</Text>

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
          <Text style={styles.score}>⭐ {anime.score || 'N/A'}</Text>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  const [sidebarClosed, setSidebarClosed] = useState(true);
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAnimes = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v4/top/anime?type=movie&limit=15');
      const data = await response.json();
      setAnimes(data.data);
    } catch (err) {
      console.log('Erro ao carregar animes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnimes();
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Carregando animes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Sidebar 
        closed={sidebarClosed} 
        toggle={() => setSidebarClosed(!sidebarClosed)} 
      />
      
      <View style={[
        styles.main,
        !sidebarClosed && styles.mainWithSidebar
      ]}>
        <ScrollView style={styles.list}>
          {animes.map((anime) => (
            <AnimeCard 
              key={anime.mal_id} 
              anime={anime} 
              isFavorite={favorites[anime.mal_id] || false}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </ScrollView>
      </View>
    </View>
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
  list: {
    flex: 1,
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
  score: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  loadingText: {
    color: '#fff',
    marginTop: 8,
    fontFamily: 'Roboto',
  },
});