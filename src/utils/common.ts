/**
 * File for shared util methods and types. Not sure if this is the best project architecture...
 */

export enum SearchType {
  TVshow = "TVshow",
  //Movie = "Movie",
  Anime = "Anime",
  Manga = "Manga",
}

export interface DragItem {
  id: number;
}

export interface ResultItem {
  id: number;
  label: string;
  imageUrl: string;
}

export interface CharacterItem extends DragItem {
  id: number;
  name: string;
  actor?: string;
  imageUrl: string;
}

export interface SnackbarMessage {
  text: string;
  severity: "error" | "warning" | "info" | "success";
}
