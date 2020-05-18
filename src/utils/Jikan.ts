import axios, { AxiosResponse } from "axios";

/*
 * Helper methods that will call Jikan's HTTP API. I need to make my own jikan-client one day...
 */
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

/**
 * Use Jikan's HTTP API to search MAL anime
 * @param searchQuery The search term to use
 */
export const searchAnime = (
  searchQuery: string
): Promise<AxiosResponse<any>> => {
  return axios.get("https://api.jikan.moe/v3/search/anime", {
    params: {
      q: searchQuery,
    },
  });
};
