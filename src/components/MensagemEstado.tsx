import { StyleSheet, Text, View } from 'react-native';

import { Botao } from './Botao';

interface MensagemEstadoProps {
  titulo: string;
  texto: string;
  erro?: boolean;
  tituloBotao?: string;
  onPress?: () => void;
}

export function MensagemEstado({ titulo, texto, erro, tituloBotao, onPress }: MensagemEstadoProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.titulo, erro && styles.tituloErro]}>{titulo}</Text>
      <Text style={styles.texto}>{texto}</Text>
      {tituloBotao && onPress ? <Botao titulo={tituloBotao} onPress={onPress} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  titulo: {
    color: '#3E4C5F',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  tituloErro: {
    color: '#A73535',
  },
  texto: {
    color: '#7A8799',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});
