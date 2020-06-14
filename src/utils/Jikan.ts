import axios, { AxiosResponse } from "axios";

/*
 * Helper methods that will call Jikan's HTTP API. I need to make my own jikan-client one day...
 */

export enum CharacterRole {
  Main = "Main",
  Supporting = "Supporting",
}

export enum Rating {
  g = "G",
  pg = "PG",
  pg13 = "PG-13",
  r17 = "R",
  r = "R+",
  rx = "Rx",
}

//Anime and Manga search result shared values
interface MALSearchResult {
  end_date: string | null;
  image_url: string;
  mal_id: number;
  members: number;
  title: string;
  url: string;
  score: number;
  start_date: string;
  synopsis: string;
}

export interface AnimeSearchResult extends MALSearchResult {
  airing: boolean;
  episodes: number;
  type: string;
  rated: Rating;
}

export interface MangaSearchResult extends MALSearchResult {
  chapters: number;
  publishing: boolean;
  type: string;
  volumes: number;
}

export interface AnimeCharacterData {
  image_url: string;
  mal_id: number;
  name: string;
  role: CharacterRole;
  voice_actors: any[];
}

export interface DragItem {
  id: number;
}

export interface DragAnimeCharItem extends AnimeCharacterData, DragItem {}

const baseUrl = "https://api.jikan.moe/v3";

/**
 * Search MAL for a matching anime
 * @param searchQuery The search term to use
 * @param limit Max results returned
 */
export const searchAnime = (
  searchQuery: string,
  limit?: number
): Promise<AxiosResponse<{ results: AnimeSearchResult[] }>> => {
  return axios.get(`${baseUrl}/search/anime`, {
    params: {
      q: searchQuery,
      limit,
    },
  });
};

/**
 * Search MAL for a matching manga
 * @param searchQuery The search term to use
 * @param limit Max results returned
 */
export const searchManga = (
  searchQuery: string,
  limit?: number
): Promise<AxiosResponse<{ results: MangaSearchResult[] }>> => {
  return axios.get(`${baseUrl}/search/manga`, {
    params: {
      q: searchQuery,
      limit,
    },
  });
};

/**
 * Gets an anime's staff and character list.
 * @param malId The anime's id to get the info for
 */
export const getAnimeCharactersStaff = (malId: number) => {
  return axios.get(`${baseUrl}/anime/${malId}/characters_staff`);
};

/**
 * Gets a manga's character list.
 * @param malId The manga's id to get the info for
 */
export const getMangaCharacters = (malId: number) => {
  return axios.get(`${baseUrl}/manga/${malId}/characters`);
};
