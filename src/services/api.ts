import { Platform } from 'react-native';

// No emulador Android, localhost aponta para o próprio emulador;
// 10.0.2.2 é o endereço do computador que roda o backend.
// Em celular físico (Expo Go), troque pelo IP do computador na rede, ex.: http://192.168.0.10:8080
const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const BASE_URL = `http://${HOST}:8080/api`;

// Formato do erro devolvido pelo backend (ErrorResponse)
interface ErroServidor {
  status: number;
  error: string;
  message: string;
  details: string[];
}

export class ErroApi extends Error {
  // 'servidor' = a API respondeu com erro; 'rede' = não foi possível falar com a API
  tipo: 'servidor' | 'rede';
  status?: number;

  constructor(mensagem: string, tipo: 'servidor' | 'rede', status?: number) {
    super(mensagem);
    this.tipo = tipo;
    this.status = status;
  }
}

export async function get<T>(caminho: string): Promise<T> {
  let resposta: Response;

  try {
    resposta = await fetch(`${BASE_URL}${caminho}`);
  } catch {
    throw new ErroApi('Não foi possível conectar ao servidor. Verifique sua conexão.', 'rede');
  }

  if (!resposta.ok) {
    let mensagem = `Erro ${resposta.status} ao consultar o servidor.`;

    try {
      const erro: ErroServidor = await resposta.json();
      mensagem = erro.message || mensagem;
    } catch {
      // resposta sem JSON: mantém a mensagem padrão
    }

    throw new ErroApi(mensagem, 'servidor', resposta.status);
  }

  return await resposta.json();
}
