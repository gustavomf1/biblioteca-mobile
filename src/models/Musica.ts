export interface Musica {
  id: number;
  titulo: string;
  artista: string;
  album: string;
  anoLancamento: number;
}

export type NovaMusica = Omit<Musica, 'id'>;
