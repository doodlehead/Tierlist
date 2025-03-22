import axios, { AxiosResponse } from "axios";
import { DragItem } from "./common";

/*
 * Helper methods that call Jikan's REST API.
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

// Anime and Manga search result shared values
export interface MALItem {
  end_date: string | null;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  mal_id: number;
  members: number;
  title: string;
  url: string;
  score: number;
  start_date: string;
  synopsis: string;
}

export interface MalSearchResult<T> {
  data: T[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface MALCharacterData {
  image_url: string;
  mal_id: number;
  name: string;
  role: CharacterRole;
}

export interface AnimeSearchItem extends MALItem {
  airing: boolean;
  episodes: number;
  type: string;
  rated: Rating;
}

export interface MangaSearchItem extends MALItem {
  chapters: number;
  publishing: boolean;
  type: string;
  volumes: number;
}

export interface AnimeCharacterData extends MALCharacterData {
  voice_actors: VoiceActorData[];
}

export interface MangaCharacterData extends MALCharacterData {
  url: string;
}

export interface VoiceActorData {
  image_url: string;
  language: string;
  mal_id: number;
  name: string;
  url: string;
}

// Jikan V4 types

// From fetching from /resource/id/characters
export interface MalCharacterResult {
  character: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url?: string;
      };
    };
    name: string;
  };
  role: string;
}

export interface AnimeCharacterResult extends MalCharacterResult {
  voice_actors: unknown[];
}

// export interface MangaCharacterResult {}

export interface DragAnimeCharItem extends AnimeCharacterData, DragItem {}

const v3BaseUrl = "https://api.jikan.moe/v3";
const v4BaseUrl = "https://api.jikan.moe/v4";

export const searchAnime = (searchQuery: string, limit?: number) => {
  return axios.get<MalSearchResult<AnimeSearchItem>>(`${v4BaseUrl}/anime`, {
    params: {
      q: searchQuery,
      limit,
      swf: true,
    },
  });
};

export const getAnimeCharacters = (malId: number) => {
  return axios.get<{ data: AnimeCharacterResult[] }>(
    `${v4BaseUrl}/anime/${malId}/characters`
  );
};

export const searchManga = (searchQuery: string, limit?: number) => {
  return axios.get<MalSearchResult<MangaSearchItem>>(`${v4BaseUrl}/manga`, {
    params: {
      q: searchQuery,
      limit,
      sfw: true,
    },
  });
};

export const getMangaCharacters = (malId: number) => {
  return axios.get<{ data: MalCharacterResult[] }>(
    `${v4BaseUrl}/manga/${malId}/characters`
  );
};

/**
 * Search MAL for a matching anime
 * @deprecated
 * @param searchQuery The search term to use
 * @param limit Max results returned
 */
export const searchAnimeV3 = (
  searchQuery: string,
  limit?: number
): Promise<AxiosResponse<{ results: AnimeSearchItem[] }>> => {
  return axios.get(`${v3BaseUrl}/search/anime`, {
    params: {
      q: searchQuery,
      limit,
    },
  });
};

/**
 * Search MAL for a matching manga
 * @deprecated
 * @param searchQuery The search term to use
 * @param limit Max results returned
 */
// export const searchMangaV3 = (
//   searchQuery: string,
//   limit?: number
// ): Promise<AxiosResponse<{ results: MangaSearchResult[] }>> => {
//   return axios.get(`${v3BaseUrl}/search/manga`, {
//     params: {
//       q: searchQuery,
//       limit,
//     },
//   });
// };

/**
 * Gets an anime's staff and character list.
 * @deprecated
 * @param malId The anime's id to get the info for
 */
export const getAnimeCharactersStaffV3 = (
  malId: number
): Promise<AxiosResponse<{ characters: AnimeCharacterData[] }>> => {
  return axios.get(`${v3BaseUrl}/anime/${malId}/characters_staff`);
};

/**
 * Gets a manga's character list.
 * @deprecated
 * @param malId The manga's id to get the info for
 */
export const getMangaCharactersV3 = (
  malId: number
): Promise<AxiosResponse<{ characters: MangaCharacterData[] }>> => {
  return axios.get(`${v3BaseUrl}/manga/${malId}/characters`);
};

export const filterAnime = (data: AnimeSearchItem[]): AnimeSearchItem[] => {
  //TODO: fix this. OH GOD WHY. TYPESCRIPT ENUMS ARE USELESS :'(
  return data.filter(
    (elem) =>
      Object.values(Rating).indexOf(elem.rated) <=
      Object.values(Rating).indexOf(Rating.r)
  );
};
