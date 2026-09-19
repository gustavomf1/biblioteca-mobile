import { Pressable, StyleSheet, Text, View } from 'react-native';

export type Tela = 'biblioteca' | 'cadastro' | 'projeto';

interface MenuNavegacaoProps {
  telaAtual: Tela;
  onNavigate: (tela: Tela) => void;
}

const itens: { tela: Tela; titulo: string }[] = [
  { tela: 'biblioteca', titulo: 'Biblioteca' },
  { tela: 'cadastro', titulo: 'Cadastrar' },
  { tela: 'projeto', titulo: 'Projeto' },
];

export function MenuNavegacao({ telaAtual, onNavigate }: MenuNavegacaoProps) {
  return (
    <View style={styles.menu}>
      {itens.map((item) => {
        const ativo = item.tela === telaAtual;

        return (
          <Pressable
            accessibilityRole="button"
            key={item.tela}
            onPress={() => onNavigate(item.tela)}
            style={({ pressed }) => [
              styles.item,
              ativo && styles.itemAtivo,
              pressed && styles.pressionado,
            ]}
          >
            <Text style={[styles.texto, ativo && styles.textoAtivo]}>
              {item.titulo}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#D8DEE7',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 10,
  },
  item: {
    minHeight: 44,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  itemAtivo: {
    backgroundColor: '#E4F3EF',
  },
  pressionado: {
    opacity: 0.7,
  },
  texto: {
    color: '#68768A',
    fontSize: 13,
    fontWeight: '600',
  },
  textoAtivo: {
    color: '#126452',
    fontWeight: '800',
  },
});
