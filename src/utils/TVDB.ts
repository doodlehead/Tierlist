import axios, { AxiosResponse } from "axios";

/*
 * Helper methods that will call the TVDB's REST API for me.
 * Maybe this should be a class?
 */

//URL used for loading images
export const TVDBUrl = "https://thetvdb.com";

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

export const searchSeries = (
  query: string
): Promise<AxiosResponse<{ data: SeriesResult[] }>> => {
  return axios.get(
    `${proxyBaseUrl}/search/series?name=${encodeURIComponent(query)}`
  );
};
