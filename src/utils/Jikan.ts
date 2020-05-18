import axios, { AxiosResponse } from "axios";

/*
 * Helper methods that will call Jikan's HTTP API. I need to make my own jikan-client one day...
 */

enum CharacterRole {
  Main = "Main",
  Supporting = "Supporting",
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
  rated: string;
}

export interface AnimeCharacterData {
  image_url: string;
  mal_id: number;
  name: string;
  role: CharacterRole;
  voice_actors: Array<any>;
}

/**
 * Use Jikan's HTTP API to search MAL anime
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

export const getAnimeCharactersStaff = (
  malId: number
): Promise<AxiosResponse<any>> => {
  return axios.get(`https://api.jikan.moe/v3/anime/${malId}/characters_staff`);
};
