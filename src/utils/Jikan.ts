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
export interface AnimeSearchResult {
  mal_id: number;
  url: string;
  image_url: string;
  title: string;
  airing: boolean;
  synopsis: string;
  type: string;
  episodes: number;
  score: number;
  start_date: string;
  end_date: string;
  members: number;
  rated: Rating;
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

/**
 * Search MAL for a matching anime
 * @param searchQuery The search term to use
 * @param limit Max results returned
 */
export const searchAnime = (
  searchQuery: string,
  limit?: number
): Promise<AxiosResponse<any>> => {
  return axios.get("https://api.jikan.moe/v3/search/anime", {
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
export const getAnimeCharactersStaff = (
  malId: number
): Promise<AxiosResponse<any>> => {
  return axios.get(`https://api.jikan.moe/v3/anime/${malId}/characters_staff`);
};
