import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Botao } from '../components/Botao';
import { MensagemEstado } from '../components/MensagemEstado';
import type { Musica } from '../models/Musica';
import type { RootStackParamList } from '../navigation/types';
import { buscarMusica } from '../services/musicaService';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhe'>;

export function DetalheScreen({ route, navigation }: Props) {
  const { id } = route.params;

  const [musica, setMusica] = useState<Musica | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregar() {
    setCarregando(true);
    setErro('');

    try {
      const dado = await buscarMusica(id);
      setMusica(dado);
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [id]);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#187D68" />
        <Text style={styles.textoCarregando}>Carregando música...</Text>
      </View>
    );
  }

  if (erro || !musica) {
    return (
      <View style={styles.tela}>
        <MensagemEstado
          erro
          titulo="Não foi possível carregar"
          texto={erro}
          tituloBotao="Tentar novamente"
          onPress={carregar}
        />
      </View>
    );
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>{musica.titulo}</Text>
      <Text style={styles.artista}>{musica.artista}</Text>

      <View style={styles.linha}>
        <Text style={styles.rotulo}>Álbum</Text>
        <Text style={styles.valor}>{musica.album}</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.rotulo}>Ano de lançamento</Text>
        <Text style={styles.valor}>{musica.anoLancamento}</Text>
      </View>

      <Botao titulo="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    gap: 12,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#F5F7FA',
  },
  textoCarregando: {
    color: '#68768A',
    fontSize: 14,
  },
  titulo: {
    color: '#18212F',
    fontSize: 24,
    fontWeight: '800',
  },
  artista: {
    color: '#3E4C5F',
    fontSize: 17,
    fontWeight: '600',
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E6ED',
    paddingVertical: 12,
  },
  rotulo: {
    color: '#68768A',
    fontSize: 15,
  },
  valor: {
    color: '#18212F',
    fontSize: 15,
    fontWeight: '700',
  },
});
