import axios from "axios"

const baseUrl = "https://api.tvmaze.com"

export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime: number | null;
  premiered: string | null;
  ended: string | null;
  officialSite: string | null;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number | null;
  };
  weight: number;
  network: {
    id: number;
    name: string;
    country: Country;
    officialSite: string | null;
  } | null;
  webChannel: {
    id: number;
    name: string;
    country: Country | null;
    officialSite: string | null;
  } | null;
  dvdCountry: null;
  externals: {
    tvrage: number | null;
    thetvdb: number | null;
    imdb: string | null;
  };
  image: Image | null;
  summary: string | null;
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode?: {
      href: string;
      name: string;
    };
  };
}

export interface ShowResult {
  score: number;
  show: Show;
}

interface Country {
  name: string;
  code: string;
  timezone: string;
}

interface Image {
  medium: string;
  original: string;
}

interface Links {
  self: {
    href: string;
  };
}

interface Person {
  id: number;
  url: string;
  name: string;
  country: Country;
  birthday: string | null;
  deathday: string | null;
  gender: string;
  image: Image;
  updated: number;
  _links: Links;
}

interface Character {
  id: number;
  url: string;
  name: string;
  image: Image | null;
  _links: Links;
}

export interface CastCredit {
  person: Person;
  character: Character;
  self: boolean;
  voice: boolean;
}

export const searchShow = (query: string) => {
  return axios.get<ShowResult[]>(`${baseUrl}/search/shows?q=${query}`)
}

export const getShowCharacters = (showId: number) => {
  return axios.get<CastCredit[]>(`${baseUrl}/shows/${showId}/cast`)
}

export const MISSING_IMAGE_PLACEHOLDER = "https://static.tvmaze.com/images/no-img/no-img-portrait-clean.png"