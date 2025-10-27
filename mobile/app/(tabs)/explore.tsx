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
  ActivityIndicator,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Anime {
  mal_id: number;
  title: string;
  type: string;
  episodes: number;
  status: string;
  score: number;
  rank: number;
  year: number;
  synopsis: string;
  images: {
    jpg: {
      large_image_url: string;
      image_url: string;
    };
  };
  genres: Array<{
    name: string;
  }>;
  duration: string;
  rating: string;
  aired: {
    from: string;
    to: string;
    prop: {
      from: {
        year: number;
      };
      to: {
        year: number;
      };
    };
  };
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

// Componente SearchBar
function SearchBar({ 
  searchQuery, 
  onSearchChange, 
  onClearSearch 
}: { 
  searchQuery: string; 
  onSearchChange: (text: string) => void; 
  onClearSearch: () => void; 
}) {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <MaterialCommunityIcons 
          name="magnify" 
          size={20} 
          color="#888" 
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar filmes de anime..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={onSearchChange}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={onClearSearch} style={styles.clearButton}>
            <MaterialCommunityIcons name="close-circle" size={18} color="#888" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Função para traduzir sinopse (simulação - em uma app real você usaria uma API de tradução)
const translateSynopsis = async (synopsis: string): Promise<string> => {
  if (!synopsis) return 'Sinopse não disponível';
  
  // Esta é uma simulação. Em uma aplicação real, você integraria com:
  // Google Translate API, DeepL, ou outra API de tradução
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulando algumas traduções comuns
      const commonTranslations: { [key: string]: string } = {
        'The story': 'A história',
        'story': 'história',
        'follows': 'acompanha',
        'young': 'jovem',
        'world': 'mundo',
        'life': 'vida',
        'death': 'morte',
        'friend': 'amigo',
        'friends': 'amigos',
        'love': 'amor',
        'battle': 'batalha',
        'war': 'guerra',
        'power': 'poder',
        'magic': 'magia',
        'school': 'escola',
        'student': 'estudante',
        'teacher': 'professor',
        'city': 'cidade',
        'town': 'cidade',
        'village': 'aldeia',
        'journey': 'jornada',
        'adventure': 'aventura',
        'mystery': 'mistério',
        'secret': 'segredo',
        'dream': 'sonho',
        'hope': 'esperança',
        'future': 'futuro',
        'past': 'passado',
        'present': 'presente',
        'family': 'família',
        'brother': 'irmão',
        'sister': 'irmã',
        'mother': 'mãe',
        'father': 'pai',
        'child': 'criança',
        'children': 'crianças',
      };

      let translated = synopsis;
      
      // Aplicar traduções simples (em uma app real, use uma API profissional)
      Object.keys(commonTranslations).forEach(english => {
        const portuguese = commonTranslations[english];
        const regex = new RegExp(`\\b${english}\\b`, 'gi');
        translated = translated.replace(regex, portuguese);
      });

      // Adicionar um indicador que é uma tradução simulada
      resolve(translated);
    }, 500);
  });
};

// Componente AnimeCard
function AnimeCard({ anime, isFavorite, onToggleFavorite }: { anime: Anime; isFavorite: boolean; onToggleFavorite: (id: number) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [translatedSynopsis, setTranslatedSynopsis] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);

  // Função para obter o ano de lançamento
  const getReleaseYear = () => {
    if (anime.aired?.prop?.from?.year) {
      return anime.aired.prop.from.year;
    }
    if (anime.year) {
      return anime.year;
    }
    if (anime.aired?.from) {
      const year = new Date(anime.aired.from).getFullYear();
      return isNaN(year) ? 'Ano não informado' : year;
    }
    return 'Ano não informado';
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Traduzir sinopse quando o componente montar
  useEffect(() => {
    const translate = async () => {
      if (anime.synopsis) {
        setTranslating(true);
        try {
          const translated = await translateSynopsis(anime.synopsis);
          setTranslatedSynopsis(translated);
        } catch (error) {
          console.error('Erro na tradução:', error);
          setTranslatedSynopsis(anime.synopsis);
        } finally {
          setTranslating(false);
        }
      }
    };

    translate();
  }, [anime.synopsis]);

  const releaseYear = getReleaseYear();
  const displaySynopsis = translatedSynopsis || anime.synopsis || 'Sinopse não disponível';

  return (
    <View style={styles.mainCard}>
      <View style={styles.cardContent}>
        <Image
          source={{ uri: anime.images.jpg.large_image_url || anime.images.jpg.image_url }}
          style={styles.animeImage}
          resizeMode="cover"
          onError={(e) => console.log('Erro ao carregar imagem:', e.nativeEvent.error)}
        />
        
        <View style={styles.textContent}>
          <View style={styles.headerRow}>
            <Text style={styles.mainTitle} numberOfLines={2} ellipsizeMode="tail">
              {anime.title}
            </Text>
            <TouchableOpacity 
              onPress={() => onToggleFavorite(anime.mal_id)} 
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
            <Text style={styles.subtitle}>{anime.type} • {anime.episodes || '?'} episódios</Text>
            <Text style={styles.releaseYear}>🎬 {releaseYear}</Text>
          </View>

          <TouchableOpacity onPress={toggleExpanded} activeOpacity={0.7}>
            <View style={styles.synopsisContainer}>
              {translating ? (
                <View style={styles.translatingContainer}>
                  <ActivityIndicator size="small" color="#FFD700" />
                  <Text style={styles.translatingText}>Traduzindo sinopse...</Text>
                </View>
              ) : (
                <>
                  <Text style={styles.description} numberOfLines={expanded ? undefined : 3}>
                    {displaySynopsis}
                  </Text>
                  {displaySynopsis.length > 120 && (
                    <Text style={styles.readMore}>
                      {expanded ? 'Ver menos' : 'Ver mais'}
                    </Text>
                  )}
                </>
              )}
            </View>
          </TouchableOpacity>

          <View style={styles.bottomInfo}>
            <View style={styles.tagsContainer}>
              {anime.genres.slice(0, 3).map((genre, index) => (
                <View key={index} style={styles.tagBubble}>
                  <Text style={styles.tagText}>{genre.name}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.ratingSection}>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐ {anime.score || 'N/A'}</Text>
                <Text style={styles.ranking}>#{anime.rank || 'N/A'}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

// Componente Loading
function LoadingIndicator() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#FFD700" />
      <Text style={styles.loadingText}>Carregando filmes...</Text>
    </View>
  );
}

// Componente Error
function ErrorMessage({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.errorContainer}>
      <MaterialCommunityIcons name="alert-circle-outline" size={50} color="#FF6B6B" />
      <Text style={styles.errorText}>{message}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}>Tentar Novamente</Text>
      </TouchableOpacity>
    </View>
  );
}

// Componente Empty State para busca
function EmptySearch({ searchQuery }: { searchQuery: string }) {
  return (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="movie-search" size={80} color="#666" />
      <Text style={styles.emptyTitle}>Nenhum resultado encontrado</Text>
      <Text style={styles.emptyText}>
        Não foram encontrados filmes para "{searchQuery}"
      </Text>
    </View>
  );
}

export default function App() {
  const [sidebarClosed, setSidebarClosed] = useState(true);
  const [favoriteAnimes, setFavoriteAnimes] = useState<Record<number, boolean>>({});
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Função para buscar dados da API com paginação
  const fetchAnimes = async (pageNum: number = 1, append: boolean = false) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      }
      setError(null);
      
      // Aumentando o limite para 50 e usando paginação
      const response = await fetch(`https://api.jikan.moe/v4/top/anime?type=movie&page=${pageNum}&limit=25`);
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.data || data.data.length === 0) {
        if (pageNum === 1) {
          throw new Error('Nenhum filme encontrado');
        } else {
          setHasMore(false);
          return;
        }
      }
      
      if (append) {
        setAnimes(prev => [...prev, ...data.data]);
        setFilteredAnimes(prev => [...prev, ...data.data]);
      } else {
        setAnimes(data.data);
        setFilteredAnimes(data.data);
      }
      
      // Verificar se há mais páginas
      if (data.data.length < 25) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  // Função para carregar mais animes
  const loadMoreAnimes = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchAnimes(nextPage, true);
    }
  };

  // Função para filtrar animes baseado na busca
  const filterAnimes = (query: string) => {
    if (!query.trim()) {
      setFilteredAnimes(animes);
      return;
    }

    const filtered = animes.filter(anime =>
      anime.title.toLowerCase().includes(query.toLowerCase()) ||
      anime.genres.some(genre => 
        genre.name.toLowerCase().includes(query.toLowerCase())
      ) ||
      (anime.synopsis && anime.synopsis.toLowerCase().includes(query.toLowerCase()))
    );

    setFilteredAnimes(filtered);
  };

  // Atualizar busca quando o texto mudar
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filterAnimes(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, animes]);

  // Buscar dados quando o componente montar
  useEffect(() => {
    fetchAnimes(1);
  }, []);

  const toggleFavorite = (animeId: number) => {
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

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Função para detectar quando o usuário chega no final da lista
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

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
        <Text style={styles.titleStyle}>FILMES DE ANIME</Text>
        
        {/* Barra de Pesquisa */}
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
        />

        {/* Contador de resultados */}
        {!loading && !error && (
          <View style={styles.resultsInfo}>
            <Text style={styles.resultsText}>
              {searchQuery ? (
                `${filteredAnimes.length} resultado${filteredAnimes.length !== 1 ? 's' : ''} para "${searchQuery}"`
              ) : (
                `${filteredAnimes.length} filme${filteredAnimes.length !== 1 ? 's' : ''} carregado${filteredAnimes.length !== 1 ? 's' : ''}`
              )}
              {hasMore && !searchQuery && ' • Role para baixo para carregar mais'}
            </Text>
          </View>
        )}
        
        {/* Loading, Error ou Lista de animes */}
        {loading && page === 1 ? (
          <LoadingIndicator />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => fetchAnimes(1)} />
        ) : filteredAnimes.length === 0 && searchQuery ? (
          <EmptySearch searchQuery={searchQuery} />
        ) : (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent) && hasMore && !searchQuery) {
                loadMoreAnimes();
              }
            }}
            scrollEventThrottle={400}
          >
            {filteredAnimes.map((anime: Anime) => (
              <AnimeCard 
                key={anime.mal_id} 
                anime={anime} 
                isFavorite={favoriteAnimes[anime.mal_id] || false}
                onToggleFavorite={toggleFavorite}
              />
            ))}
            
            {/* Loading para mais dados */}
            {loading && page > 1 && (
              <View style={styles.loadingMoreContainer}>
                <ActivityIndicator size="small" color="#FFD700" />
                <Text style={styles.loadingMoreText}>Carregando mais filmes...</Text>
              </View>
            )}
            
            {/* Mensagem do final */}
            {!hasMore && filteredAnimes.length > 0 && (
              <View style={styles.endMessageContainer}>
                <Text style={styles.endMessageText}>
                  🎉 Você viu todos os {filteredAnimes.length} filmes!
                </Text>
              </View>
            )}
          </ScrollView>
        )}
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
    marginBottom: 15,
    fontFamily: 'Goldman',
    marginTop: 10,
  },
  // Search Bar Styles
  searchContainer: {
    marginBottom: 15,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  // Results Info
  resultsInfo: {
    marginBottom: 15,
  },
  resultsText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
  // Empty State Styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  loadingMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingMoreText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  // End Message Styles
  endMessageContainer: {
    padding: 20,
    alignItems: 'center',
  },
  endMessageText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Error Styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  retryButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  retryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  releaseYear: {
    fontSize: 12,
    color: "#FFD700",
    fontWeight: "600",
  },
  synopsisContainer: {
    marginBottom: 8,
  },
  description: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 16,
  },
  readMore: {
    color: "#FFD700",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
    textAlign: 'right',
  },
  translatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  translatingText: {
    color: '#FFD700',
    fontSize: 11,
    marginLeft: 8,
    fontStyle: 'italic',
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