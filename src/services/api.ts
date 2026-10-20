import { Platform } from 'react-native';

// No emulador Android, localhost aponta para o próprio emulador;
// 10.0.2.2 é o endereço do computador que roda o backend.
// Em celular físico, defina EXPO_PUBLIC_API_URL no arquivo .env (veja .env.example)
// com o IP do computador, ex.: EXPO_PUBLIC_API_URL=http://192.168.0.10:8080/api
const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? `http://${HOST}:8080/api`;

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

async function requisitar<T>(caminho: string, opcoes?: RequestInit): Promise<T> {
  let resposta: Response;

  try {
    resposta = await fetch(`${BASE_URL}${caminho}`, opcoes);
  } catch {
    throw new ErroApi('Não foi possível conectar ao servidor. Verifique sua conexão.', 'rede');
  }

  if (!resposta.ok) {
    let mensagem = `Erro ${resposta.status} ao consultar o servidor.`;

    try {
      const erro: ErroServidor = await resposta.json();
      mensagem = [erro.message, ...(erro.details ?? [])].filter(Boolean).join('\n');
    } catch {
      // resposta sem JSON: mantém a mensagem padrão
    }

    throw new ErroApi(mensagem, 'servidor', resposta.status);
  }

  return await resposta.json();
}

export function get<T>(caminho: string): Promise<T> {
  return requisitar<T>(caminho);
}

export function post<T>(caminho: string, corpo: unknown): Promise<T> {
  return requisitar<T>(caminho, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(corpo),
  });
}
