import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Musica } from '../models/Musica';

interface CardMusicaProps {
  musica: Musica;
  onPress: (id: number) => void;
}

export function CardMusica({ musica, onPress }: CardMusicaProps) {
  return (
    <View style={styles.card}>
      <View style={styles.informacoes}>
        <Text style={styles.titulo}>{musica.titulo}</Text>
        <Text style={styles.artista}>{musica.artista}</Text>
        <Text style={styles.detalhes}>
          {musica.album} · {musica.anoLancamento}
        </Text>
      </View>

      <Pressable
        accessibilityLabel={`Ver detalhes de ${musica.titulo}`}
        onPress={() => onPress(musica.id)}
        style={({ pressed }) => [styles.detalhesBotao, pressed && styles.pressionado]}
      >
        <Text style={styles.textoDetalhes}>Detalhes</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 112,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#D8DEE7',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  informacoes: {
    flex: 1,
    gap: 3,
  },
  titulo: {
    color: '#18212F',
    fontSize: 18,
    fontWeight: '700',
  },
  artista: {
    color: '#3E4C5F',
    fontSize: 15,
    fontWeight: '600',
  },
  detalhes: {
    color: '#68768A',
    fontSize: 14,
  },
  detalhesBotao: {
    minHeight: 42,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#187D68',
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  pressionado: {
    opacity: 0.65,
  },
  textoDetalhes: {
    color: '#126452',
    fontSize: 14,
    fontWeight: '700',
  },
});
