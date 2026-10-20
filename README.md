# Minha Biblioteca Musical

Projeto desenvolvido em React Native com TypeScript para o Checkpoint 02 de Projeto Integrador. O aplicativo consome a Web API do `backend-music` (`GET /api/songs`).

## Como executar

0. Suba o backend (`backend-music`) e, em celular físico, ajuste o `HOST` em `src/services/api.ts`.

1. Instale as dependências:

```bash
npm install
```

2. Inicie o Expo:

```bash
npm start
```

3. Leia o QR Code com o Expo Go ou pressione `a` para abrir no emulador Android.

Para executar no navegador:

```bash
npm run web
```

## Estrutura

```text
src/
  components/   Botao, CardMusica, MensagemEstado
  screens/      BibliotecaScreen, DetalheScreen, ProjetoScreen
  navigation/   types.ts
  services/     api.ts, musicaService.ts
  models/       Musica.ts
App.tsx
```

A documentação da entrega está em [docs/Documentacao](docs/Documentacao.md) e o termo de uso de IA está em [docs/Termo-de-Uso-de-IA-Generativa.md](docs/Termo-de-Uso-de-IA-Generativa.md).
