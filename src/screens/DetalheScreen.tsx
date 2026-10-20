import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Botao } from '../components/Botao';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhe'>;

export function DetalheScreen({ route, navigation }: Props) {
  const { id } = route.params;

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Música #{id}</Text>
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
  titulo: {
    color: '#18212F',
    fontSize: 22,
    fontWeight: '800',
  },
});
