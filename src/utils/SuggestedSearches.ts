import { SearchType } from "./common";
import { sampleSize } from "lodash";

/**
 * Suggestions for search ideas in case the user doesn't have any
 */
export const suggestedSearches = {
  [SearchType.TVshow]: [
    "Game of Thrones",
    "Breaking Bad",
    "Stranger Things",
    "Rick and Morty",
    "Adventure Time",
    "Avatar: The Last Airbender",
    "Community",
    "The Office",
    "The Walking Dead",
    "Fargo",
  ],
  [SearchType.Anime]: [
    "Baccano",
    "Fate/Zero",
    "Hunter x Hunter",
    "Ping Pong the Animation",
    "Death Parade",
    "Mob Psycho 100",
    "Gankutsuou",
    "Neon Genesis Evangelion",
    "Attack on Titan",
    "Koe no Katachi",
  ],
  [SearchType.Manga]: [
    "One Punch Man",
    "Fullmetal Alchemist",
    "Vinland Saga",
    "Tower of God",
    "Houseki no Kuni",
    "Bleach",
    "Tokyo Ghoul",
    "Naruto",
    "Death Note",
    "JoJo's Bizarre Adventure Part 5: Golden Wind",
  ],
};

export const getItems = (
  searchType: SearchType,
  numItems: number
): string[] => {
  return sampleSize(suggestedSearches[searchType], numItems);
};
