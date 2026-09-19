import { Pressable, StyleSheet, Text } from 'react-native';

interface BotaoProps {
  titulo: string;
  onPress: () => void;
}

export function Botao({ titulo, onPress }: BotaoProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#187D68',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  pressionado: {
    opacity: 0.78,
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
