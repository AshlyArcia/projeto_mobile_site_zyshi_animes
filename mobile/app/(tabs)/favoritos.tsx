import { Platform, StyleSheet, View, FlatList } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const favorites = [
  {
    id: '1',
    title: 'Jujutsu Kaisen',
  },
  {
    id: '2',
    title: 'Record of Ragnarok',
  },
  {
    id: '3',
    title: 'To Be HeroX',
  },
];

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#000000."
          name="heart"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pagina de Favoritos.</ThemedText>
      </ThemedView>
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <ThemedText style={styles.cardTitle}>{item.title}</ThemedText>
            </View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  favoritesContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  card: {
    width: 150,
    height: 100,  // Diminuímos a altura, pois não há mais imagens
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',  // Centraliza o título no card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    color: '#000',  // Mudança para cor de texto escura, visto que não há mais imagem
    fontWeight: 'bold',
    fontSize: 16,
  },
});
