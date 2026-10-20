import type { Musica, NovaMusica } from '../models/Musica';
import { get, post } from './api';

// Formato do JSON retornado pela API (SongResponse)
interface SongResponse {
  id: number;
  title: string;
  artist: string;
  album: string;
  releaseYear: number;
}

function converter(song: SongResponse): Musica {
  return {
    id: song.id,
    titulo: song.title,
    artista: song.artist,
    album: song.album,
    anoLancamento: song.releaseYear,
  };
}

export async function listarMusicas(): Promise<Musica[]> {
  const songs = await get<SongResponse[]>('/songs');
  return songs.map(converter);
}

export async function buscarMusica(id: number): Promise<Musica> {
  const song = await get<SongResponse>(`/songs/${id}`);
  return converter(song);
}

export async function criarMusica(nova: NovaMusica): Promise<Musica> {
  const song = await post<SongResponse>('/songs', {
    title: nova.titulo,
    artist: nova.artista,
    album: nova.album,
    releaseYear: nova.anoLancamento,
  });
  return converter(song);
}
