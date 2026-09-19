import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Botao } from './src/components/Botao';
import { CardMusica } from './src/components/CardMusica';
import { MenuNavegacao, type Tela } from './src/components/MenuNavegacao';
import type { Musica } from './src/models/Musica';

const musicasIniciais: Musica[] = [
  {
    id: 1,
    titulo: 'Oceano',
    artista: 'Djavan',
    album: 'Djavan',
    anoLancamento: 1989,
  },
  {
    id: 2,
    titulo: 'Velha Infância',
    artista: 'Tribalistas',
    album: 'Tribalistas',
    anoLancamento: 2002,
  },
];

export default function App() {
  const [telaAtual, setTelaAtual] = useState<Tela>('biblioteca');
  const [musicas, setMusicas] = useState<Musica[]>(musicasIniciais);
  const [titulo, setTitulo] = useState('');
  const [artista, setArtista] = useState('');
  const [album, setAlbum] = useState('');
  const [anoLancamento, setAnoLancamento] = useState('');
  const [erro, setErro] = useState('');

  function cadastrar() {
    const ano = Number(anoLancamento);

    if (!titulo.trim() || !artista.trim() || !album.trim() || !anoLancamento.trim()) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (!Number.isInteger(ano) || ano < 1900 || ano > new Date().getFullYear()) {
      setErro('Informe um ano de lançamento válido.');
      return;
    }

    const novaMusica: Musica = {
      id: Date.now(),
      titulo: titulo.trim(),
      artista: artista.trim(),
      album: album.trim(),
      anoLancamento: ano,
    };

    setMusicas((listaAtual) => [novaMusica, ...listaAtual]);
    setTitulo('');
    setArtista('');
    setAlbum('');
    setAnoLancamento('');
    setErro('');
    setTelaAtual('biblioteca');
  }

  function excluir(id: number) {
    setMusicas((listaAtual) => listaAtual.filter((musica) => musica.id !== id));
  }

  function navegar(tela: Tela) {
    setErro('');
    setTelaAtual(tela);
  }

  function renderizarBiblioteca() {
    return (
      <View style={styles.tela}>
        <View style={styles.tituloLinha}>
          <View>
            <Text style={styles.tituloSecao}>Minha biblioteca</Text>
            <Text style={styles.subtituloSecao}>Músicas cadastradas no aplicativo</Text>
          </View>
          <View style={styles.contador}>
            <Text style={styles.numeroContador}>{musicas.length}</Text>
          </View>
        </View>

        <FlatList
          contentContainerStyle={styles.lista}
          data={musicas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CardMusica musica={item} onDelete={excluir} />}
          ItemSeparatorComponent={() => <View style={styles.separador} />}
          ListEmptyComponent={
            <View style={styles.vazio}>
              <Text style={styles.vazioTitulo}>Nenhuma música cadastrada</Text>
              <Text style={styles.vazioTexto}>Use a tela Cadastrar para adicionar uma música.</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  function renderizarCadastro() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.tela}
      >
        <ScrollView contentContainerStyle={styles.formulario} keyboardShouldPersistTaps="handled">
          <Text style={styles.tituloSecao}>Cadastrar música</Text>
          <Text style={styles.subtituloSecao}>Adicione uma música à sua biblioteca</Text>

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

          <Botao titulo="Cadastrar música" onPress={cadastrar} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  function renderizarProjeto() {
    return (
      <ScrollView contentContainerStyle={styles.projeto}>
        <Text style={styles.tituloSecao}>Sobre o projeto</Text>
        <Text style={styles.textoProjeto}>
          Minha Biblioteca Musical é um aplicativo para organizar músicas favoritas em um só lugar.
        </Text>

        <Text style={styles.topico}>Checkpoint 01</Text>
        <Text style={styles.itemProjeto}>Cadastro de músicas</Text>
        <Text style={styles.itemProjeto}>Listagem das músicas cadastradas</Text>
        <Text style={styles.itemProjeto}>Exclusão de músicas</Text>
        <Text style={styles.itemProjeto}>Navegação entre as telas principais</Text>

        <Text style={styles.topico}>Próximas etapas</Text>
        <Text style={styles.itemProjeto}>Integração com o backend</Text>
        <Text style={styles.itemProjeto}>Edição e busca de músicas</Text>
        <Text style={styles.itemProjeto}>Persistência dos dados</Text>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.areaSegura}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.cabecalho}>
          <Text style={styles.nomeApp}>Minha Biblioteca Musical</Text>
          <Text style={styles.identificacao}>Projeto Integrador · Checkpoint 01</Text>
        </View>

        {telaAtual === 'biblioteca' && renderizarBiblioteca()}
        {telaAtual === 'cadastro' && renderizarCadastro()}
        {telaAtual === 'projeto' && renderizarProjeto()}

        <MenuNavegacao telaAtual={telaAtual} onNavigate={navegar} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: Platform.OS === 'android' ? 34 : 0,
  },
  container: {
    flex: 1,
  },
  cabecalho: {
    borderBottomWidth: 1,
    borderBottomColor: '#D8DEE7',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  nomeApp: {
    color: '#18212F',
    fontSize: 21,
    fontWeight: '800',
  },
  identificacao: {
    marginTop: 3,
    color: '#68768A',
    fontSize: 13,
  },
  tela: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  tituloLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    marginBottom: 18,
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
    paddingBottom: 20,
  },
  separador: {
    height: 12,
  },
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 64,
  },
  vazioTitulo: {
    color: '#3E4C5F',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  vazioTexto: {
    marginTop: 6,
    color: '#7A8799',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
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
  projeto: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 30,
  },
  textoProjeto: {
    marginTop: 10,
    color: '#3E4C5F',
    fontSize: 16,
    lineHeight: 24,
  },
  topico: {
    marginTop: 24,
    marginBottom: 8,
    color: '#126452',
    fontSize: 16,
    fontWeight: '800',
  },
  itemProjeto: {
    borderBottomWidth: 1,
    borderBottomColor: '#E1E6ED',
    color: '#3E4C5F',
    fontSize: 15,
    paddingVertical: 10,
  },
});
