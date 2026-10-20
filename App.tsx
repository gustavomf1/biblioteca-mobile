import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import type { RootStackParamList } from './src/navigation/types';
import { BibliotecaScreen } from './src/screens/BibliotecaScreen';
import { CadastroScreen } from './src/screens/CadastroScreen';
import { DetalheScreen } from './src/screens/DetalheScreen';
import { ProjetoScreen } from './src/screens/ProjetoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator id="MainStack" initialRouteName="Biblioteca">
        <Stack.Screen
          name="Biblioteca"
          component={BibliotecaScreen}
          options={{ title: 'Minha Biblioteca Musical' }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ title: 'Cadastrar música' }}
        />
        <Stack.Screen
          name="Detalhe"
          component={DetalheScreen}
          options={{ title: 'Detalhes da música' }}
        />
        <Stack.Screen
          name="Projeto"
          component={ProjetoScreen}
          options={{ title: 'Sobre o projeto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
