import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Botao } from '../components/Botao';
import { CardMusica } from '../components/CardMusica';
import type { Musica } from '../models/Musica';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Biblioteca'>;

export function BibliotecaScreen({ navigation }: Props) {
  // Temporário: dados locais até a integração com a API (Etapa 3).
  const [musicas] = useState<Musica[]>([
    { id: 1, titulo: 'Oceano', artista: 'Djavan', album: 'Djavan', anoLancamento: 1989 },
    {
      id: 2,
      titulo: 'Velha Infância',
      artista: 'Tribalistas',
      album: 'Tribalistas',
      anoLancamento: 2002,
    },
  ]);

  return (
    <View style={styles.tela}>
      <View style={styles.tituloLinha}>
        <View>
          <Text style={styles.tituloSecao}>Minha biblioteca</Text>
          <Text style={styles.subtituloSecao}>Músicas da sua biblioteca</Text>
        </View>
        <View style={styles.contador}>
          <Text style={styles.numeroContador}>{musicas.length}</Text>
        </View>
      </View>

      <FlatList
        contentContainerStyle={styles.lista}
        data={musicas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardMusica
            musica={item}
            onPress={(id) => navigation.navigate('Detalhe', { id })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        showsVerticalScrollIndicator={false}
      />

      <Botao titulo="Sobre o projeto" onPress={() => navigation.navigate('Projeto')} />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    gap: 12,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  tituloLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  },
  tituloSecao: {
    color: '#18212F',
    fontSize: 22,
    fontWeight: '800',
  },
  subtituloSecao: {
    marginTop: 4,
    color: '#68768A',
    fontSize: 14,
  },
  contador: {
    minWidth: 42,
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
    backgroundColor: '#F4C95D',
  },
  numeroContador: {
    color: '#44350D',
    fontSize: 17,
    fontWeight: '800',
  },
  lista: {
    flexGrow: 1,
    paddingBottom: 12,
  },
  separador: {
    height: 12,
  },
});
