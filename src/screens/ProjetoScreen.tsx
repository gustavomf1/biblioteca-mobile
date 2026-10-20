import { ScrollView, StyleSheet, Text } from 'react-native';

export function ProjetoScreen() {
  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Sobre o projeto</Text>
      <Text style={styles.texto}>
        Minha Biblioteca Musical é um aplicativo para organizar músicas favoritas em um só lugar.
      </Text>

      <Text style={styles.topico}>Checkpoint 01</Text>
      <Text style={styles.item}>Cadastro, listagem e exclusão locais</Text>
      <Text style={styles.item}>Navegação simples entre as telas principais</Text>

      <Text style={styles.topico}>Checkpoint 02</Text>
      <Text style={styles.item}>Navegação com React Navigation (stack)</Text>
      <Text style={styles.item}>Integração com a Web API (GET)</Text>
      <Text style={styles.item}>Tratamento de carregamento, lista vazia e erros</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  conteudo: {
    padding: 20,
    paddingBottom: 30,
  },
  titulo: {
    color: '#18212F',
    fontSize: 22,
    fontWeight: '800',
  },
  texto: {
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
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#E1E6ED',
    color: '#3E4C5F',
    fontSize: 15,
    paddingVertical: 10,
  },
});
