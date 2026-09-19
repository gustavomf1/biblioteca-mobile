import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Musica } from '../models/Musica';

interface CardMusicaProps {
  musica: Musica;
  onDelete: (id: number) => void;
}

export function CardMusica({ musica, onDelete }: CardMusicaProps) {
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
        accessibilityLabel={`Excluir ${musica.titulo}`}
        onPress={() => onDelete(musica.id)}
        style={({ pressed }) => [styles.excluir, pressed && styles.pressionado]}
      >
        <Text style={styles.textoExcluir}>Excluir</Text>
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
  excluir: {
    minHeight: 42,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C94B4B',
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  pressionado: {
    opacity: 0.65,
  },
  textoExcluir: {
    color: '#A73535',
    fontSize: 14,
    fontWeight: '700',
  },
});
