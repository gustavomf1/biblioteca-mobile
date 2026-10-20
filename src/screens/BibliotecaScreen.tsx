import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Botao } from '../components/Botao';
import { CardMusica } from '../components/CardMusica';
import { MensagemEstado } from '../components/MensagemEstado';
import type { Musica } from '../models/Musica';
import type { RootStackParamList } from '../navigation/types';
import { listarMusicas } from '../services/musicaService';

type Props = NativeStackScreenProps<RootStackParamList, 'Biblioteca'>;

export function BibliotecaScreen({ navigation }: Props) {
  const [musicas, setMusicas] = useState<Musica[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregar() {
    setCarregando(true);
    setErro('');

    try {
      const dados = await listarMusicas();
      setMusicas(dados);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

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

      {carregando ? (
        <View style={styles.carregando}>
          <ActivityIndicator size="large" color="#187D68" />
          <Text style={styles.textoCarregando}>Carregando músicas...</Text>
        </View>
      ) : erro ? (
        <MensagemEstado
          erro
          titulo="Não foi possível carregar"
          texto={erro}
          tituloBotao="Tentar novamente"
          onPress={carregar}
        />
      ) : (
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
          ListEmptyComponent={
            <MensagemEstado
              titulo="Nenhuma música cadastrada"
              texto="A biblioteca está vazia no servidor."
              tituloBotao="Atualizar"
              onPress={carregar}
            />
          }
          showsVerticalScrollIndicator={false}
        />

      )}

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
  carregando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  textoCarregando: {
    color: '#68768A',
    fontSize: 14,
  },
  separador: {
    height: 12,
  },
});
