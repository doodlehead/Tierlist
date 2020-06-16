import axios, { AxiosResponse } from "axios";

/*
 * Helper methods that will call the TVDB's REST API for me.
 * Maybe this should be a class?
 */

//URL used for loading images
export const TVDBUrl = "https://thetvdb.com";
export const TVDBImgUrl = "https://artworks.thetvdb.com/banners/";
export const missingActorUrl = "https://artworks.thetvdb.com/person/actor.jpg";

//For local testing
const proxyBaseUrl = `http://localhost:5001/${process.env.REACT_APP_DEV_PROJECT_ID}/us-central1/proxy`;

export interface SeriesResult {
  id: number;
  banner: string | null;
  image: string;
  overview: string;
  poster: string | null;
  seriesName: string;
}

export interface SeriesCharacter {
  id: number;
  image: string;
  imageAdded: string; //Date
  imageAuthor: number;
  lastUpdated: string; //Date
  name: string;
  role: string;
  seriesId: number;
  sortOrder: number;
}

export const searchSeries = (
  query: string
): Promise<AxiosResponse<{ data: SeriesResult[] }>> => {
  return axios.get(
    `${proxyBaseUrl}/search/series?name=${encodeURIComponent(query)}`
  );
};

export const getSeriesCharacters = (
  id: number
): Promise<AxiosResponse<{ data: SeriesCharacter[] }>> => {
  return axios.get(`${proxyBaseUrl}/series/${id}/actors`);
};
