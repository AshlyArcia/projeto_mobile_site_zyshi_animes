import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ANIMES</Text>
      </View>

      {/* Conteúdo Principal */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Card do Kaiju No. 8 */}
        <View style={styles.mainCard}>
          <View style={styles.cardContent}>
            <Image
              source={{ uri: "https://upload.wikimedia.org/wikipedia/pt/9/92/Kaiju_N%C2%BA_8.jpg" }}
              style={styles.animeImage}
              resizeMode="cover"
            />
            
            <View style={styles.textContent}>
              <Text style={styles.mainTitle}>Kaiju N 8</Text>
              <Text style={styles.subtitle}>En andamento</Text>
              <Text style={styles.detail}>Estreou 2025 • 12 episódios</Text>
              
              <Text style={styles.description} numberOfLines={3}>
                Kaiju No. 8 acompanha Kafka Nagai, um segurança que, ao ganhar a habilidade de se transformar em um kaiju do nível 8, enfrenta monstros gigantes e conspirações.
              </Text>

              <View style={styles.bottomInfo}>
                <View style={styles.tagsContainer}>
                  <Text style={styles.tag}>Ação</Text>
                  <Text style={styles.tag}>ficção</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>4,9</Text>
                  <Text style={styles.ranking}>#1111</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Card One Piece */}
        <View style={styles.mainCard}>
          <View style={styles.cardContent}>
            <Image
              source={{ uri: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_jdu9iem1nt14d6ius8kd57p21k/-S897-FWEBP" }}
              style={styles.animeImage}
              resizeMode="cover"
            />
            
            <View style={styles.textContent}>
              <Text style={styles.mainTitle}>One Piece</Text>
              <Text style={styles.subtitle}>Em andamento</Text>
              <Text style={styles.detail}>Estreou 1999 • 1100+ episódios</Text>
              
              <Text style={styles.description} numberOfLines={3}>
                Monkey D. Luffy e sua tripulação navegam pelos mares em busca do tesouro supremo, o One Piece, para que ele se torne o Rei dos Piratas.
              </Text>

              <View style={styles.bottomInfo}>
                <View style={styles.tagsContainer}>
                  <Text style={styles.tag}>Aventura</Text>
                  <Text style={styles.tag}>Ação</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>4,8</Text>
                  <Text style={styles.ranking}>#25</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Card Death Note */}
        <View style={styles.mainCard}>
          <View style={styles.cardContent}>
            <Image
              source={{ uri: "https://cdn.culturagenial.com/imagens/death-note-cartaz.jpg?class=article" }}
              style={styles.animeImage}
              resizeMode="cover"
            />
            
            <View style={styles.textContent}>
              <Text style={styles.mainTitle}>Death Note</Text>
              <Text style={styles.subtitle}>Concluído</Text>
              <Text style={styles.detail}>Estreou 2006 • 37 episódios</Text>
              
              <Text style={styles.description} numberOfLines={3}>
                Um estudante genius encontra um caderno sobrenatural que permite matar qualquer pessoa cujo nome seja escrito nele.
              </Text>

              <View style={styles.bottomInfo}>
                <View style={styles.tagsContainer}>
                  <Text style={styles.tag}>Suspense</Text>
                  <Text style={styles.tag}>Psicológico</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>4,9</Text>
                  <Text style={styles.ranking}>#5</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Card Bleach */}
        <View style={styles.mainCard}>
          <View style={styles.cardContent}>
            <Image
              source={{ uri: "https://images.justwatch.com/poster/300543213/s718/bleach.jpg" }}
              style={styles.animeImage}
              resizeMode="cover"
            />
            
            <View style={styles.textContent}>
              <Text style={styles.mainTitle}>Bleach</Text>
              <Text style={styles.subtitle}>Em andamento</Text>
              <Text style={styles.detail}>Estreou 2004 • 366 episódios</Text>
              
              <Text style={styles.description} numberOfLines={3}>
                Ichigo Kurosaki ganha poderes de Shinigami e protege os vivos de espíritos malignos e guia almas ao mundo espiritual.
              </Text>

              <View style={styles.bottomInfo}>
                <View style={styles.tagsContainer}>
                  <Text style={styles.tag}>Ação</Text>
                  <Text style={styles.tag}>Sobrenatural</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>4,7</Text>
                  <Text style={styles.ranking}>#48</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#121212" 
  },
  header: { 
    height: 80, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerTitle: {
    fontFamily: "Goldman",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
  },
  scroll: { 
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    height: 140,
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
  mainTitle: {
    fontFamily: "Goldman",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 2,
  },
  detail: {
    fontSize: 11,
    color: "#ccc",
    marginBottom: 6,
  },
  description: {
    color: "#fff",
    fontSize: 10,
    lineHeight: 12,
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
  },
  tag: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    marginRight: 8,
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
  },
});