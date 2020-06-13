import axios, { AxiosResponse } from "axios";

/*
 * Helper methods that will call the TVDB's REST API for me.
 * Maybe this should be a class?
 */

const baseUrl = "https://api.thetvdb.com";

export const searchSeries = (token: string, query: string) => {
  return axios.get(
    `${baseUrl}/search/series/?name=${encodeURIComponent(query)}`
  );
};

// export const searchMovies = (token: stirng, query: string) => {
//   return axios.get(
//     `${baseUrl}/search/series/?name=${encodeURIComponent(query)}`
//   );
// };
