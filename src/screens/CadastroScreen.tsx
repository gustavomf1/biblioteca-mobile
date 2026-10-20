import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Botao } from '../components/Botao';
import type { RootStackParamList } from '../navigation/types';
import { criarMusica } from '../services/musicaService';

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

export function CadastroScreen({ navigation }: Props) {
  const [titulo, setTitulo] = useState('');
  const [artista, setArtista] = useState('');
  const [album, setAlbum] = useState('');
  const [anoLancamento, setAnoLancamento] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  async function cadastrar() {
    if (enviando) {
      return;
    }

    const ano = Number(anoLancamento);

    if (!titulo.trim() || !artista.trim() || !album.trim() || !anoLancamento.trim()) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (!Number.isInteger(ano) || ano < 1900 || ano > new Date().getFullYear()) {
      setErro('Informe um ano de lançamento válido.');
      return;
    }

    setEnviando(true);
    setErro('');

    try {
      await criarMusica({
        titulo: titulo.trim(),
        artista: artista.trim(),
        album: album.trim(),
        anoLancamento: ano,
      });
      navigation.goBack();
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro inesperado.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.tela}
    >
      <ScrollView contentContainerStyle={styles.formulario} keyboardShouldPersistTaps="handled">
        <View style={styles.grupoCampo}>
          <Text style={styles.rotulo}>Título</Text>
          <TextInput
            onChangeText={setTitulo}
            placeholder="Ex.: Oceano"
            placeholderTextColor="#8A96A8"
            style={styles.input}
            value={titulo}
          />
        </View>

        <View style={styles.grupoCampo}>
          <Text style={styles.rotulo}>Artista</Text>
          <TextInput
            onChangeText={setArtista}
            placeholder="Ex.: Djavan"
            placeholderTextColor="#8A96A8"
            style={styles.input}
            value={artista}
          />
        </View>

        <View style={styles.grupoCampo}>
          <Text style={styles.rotulo}>Álbum</Text>
          <TextInput
            onChangeText={setAlbum}
            placeholder="Ex.: Djavan"
            placeholderTextColor="#8A96A8"
            style={styles.input}
            value={album}
          />
        </View>

        <View style={styles.grupoCampo}>
          <Text style={styles.rotulo}>Ano de lançamento</Text>
          <TextInput
            keyboardType="number-pad"
            maxLength={4}
            onChangeText={setAnoLancamento}
            placeholder="Ex.: 1989"
            placeholderTextColor="#8A96A8"
            style={styles.input}
            value={anoLancamento}
          />
        </View>

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <Botao titulo={enviando ? 'Salvando...' : 'Salvar música'} onPress={cadastrar} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formulario: {
    gap: 16,
    paddingBottom: 30,
  },
  grupoCampo: {
    gap: 6,
  },
  rotulo: {
    color: '#3E4C5F',
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#C9D1DC',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    color: '#18212F',
    fontSize: 16,
    paddingHorizontal: 14,
  },
  erro: {
    color: '#A73535',
    fontSize: 14,
    fontWeight: '600',
  },
});
