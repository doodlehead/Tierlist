import { useState, useContext, FC } from "react";
import "./ListMaker.scss";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import {
  searchAnime,
  searchManga,
  getAnimeCharacters,
  getMangaCharacters,
  filterAnime,
} from "../utils/Jikan";
import { searchShow, getShowCharacters, MISSING_IMAGE_PLACEHOLDER } from "../utils/tvMaze";
import { makeStyles, createStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";
import Tierlist from "../components/Tierlist/Tierlist";
import { CharacterDragItem, ResultItem, SearchType } from "../utils/common";
import AppContext from "../contexts/AppContext";
import mangaFilter from "../utils/mangaFilter";

//TODO: validate inputs
const CHAR_PLACEHOLDER_IMG = "https://artworks.thetvdb.com/person/actor.jpg";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "grid",
      gridGap: "20px",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    },
    loadingCircle: {
      margin: "100px auto",
    },
    searchBar: {
      marginBottom: 10,
    },
    "@media only screen and (min-width: 768px)": {
      searchBar: {
        marginBottom: 40,
      },
    },
  })
);

const mediaTypePrefix = {
  [SearchType.TVshow]: "tv-",
  [SearchType.Anime]: "anime-",
  [SearchType.Manga]: "manga",
};

const filterSet = new Set(mangaFilter);

// TODO: Refactor this into someting more focused. It's handling too many responsibilities right now...
const ListMaker: FC = () => {
  const [searchResult, setSearchResult] = useState<ResultItem[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [mediaId, setMediaId] = useState<number>();
  const [characterData, setCharacterData] = useState<CharacterDragItem[]>([]);
  const [searchType, setSearchType] = useState<SearchType>(SearchType.TVshow);
  const { setMessage } = useContext(AppContext);

  const classes = useStyles();

  //Handle a search submit
  const handleSearch = (searchValue: string): void => {
    //Clear the previous search's results
    setCharacterData([]);

    if (searchValue.length >= 3) {
      setLoading(true);

      if (searchType === SearchType.TVshow) {
        searchShow(searchValue).then(res => {
          console.log(res);

          // TODO: placeholder image for missing images?
          setSearchResult(res.data.map((elem) => ({
            id: elem.show.id,
            label: elem.show.name,
            imageUrl: elem.show.image?.medium || MISSING_IMAGE_PLACEHOLDER,
          })))

          setLoading(false);
        })
        // searchSeries(searchValue).then(
        //   (res) => {
        //     console.log(res);
        //     setSearchResult(
        //       res.data.data.map((elem) => ({
        //         id: elem.id,
        //         label: elem.seriesName,
        //         imageUrl: `${TVDBUrl}${elem.image}`,
        //       }))
        //     );
        //     setLoading(false);
        //   },
        //   (err) => {
        //     setMessage?.({
        //       text: `Could not search, TVDB's API is down: ${err}`,
        //       severity: "error",
        //     });
        //     console.error(err);
        //     setLoading(false);
        //   }
        // );
      } else if (searchType === SearchType.Anime) {
        searchAnime(searchValue, 10).then(
          (res) => {
            console.log(res);
            const filtered = filterAnime(res.data.data);
            setSearchResult(
              filtered.map((anime) => ({
                id: anime.mal_id,
                label: anime.title,
                imageUrl: anime.images.jpg.image_url
              }))
            );
            setLoading(false);
          },
          (err) => {
            setMessage?.({
              text: `Could not search, either MAL or Jikan's API is down: ${err}`,
              severity: "error",
            });
            console.error(err);
            setLoading(false);
          }
        );
      } else if (searchType === SearchType.Manga) {
        searchManga(searchValue, 10).then(
          (res) => {
            const filtered = res.data.data.filter(
              (manga) => !filterSet.has(manga.mal_id)
            );
            setSearchResult(
              filtered.map((elem) => ({
                id: elem.mal_id,
                label: elem.title,
                imageUrl: elem.images.jpg.image_url,
              }))
            );
            setLoading(false);
          },
          (err) => {
            setMessage?.({
              text: `Could not search, either MAL or Jikan's API is down: ${err}`,
              severity: "error",
            });
            console.error(err);
            setLoading(false);
          }
        );
      }
    }
  };

  //Handle when a user clicks a search result entry
  const handleOnSelect = (id: number): void => {
    setLoading(true);
    if (searchType === SearchType.TVshow) {
      getShowCharacters(id).then((res) => {
        const seenIds = new Set<number>();
        const filteredChars = res.data.filter((char) => {
          if (seenIds.has(char.character.id)) {
            return false; // Skip if ID is already seen
          } else {
            seenIds.add(char.character.id); // Add ID to the set
            return true; // Keep the object
          }
        });
        console.log(res);
        setMediaId(id);
        setCharacterData(
          filteredChars.map((elem) => ({
            id: elem.character.id,
            name: elem.character.name,
            actor: elem.person.name,
            imageUrl: elem.character.image?.medium || elem.person.image?.medium || CHAR_PLACEHOLDER_IMG
          }))
        );
      });
      setLoading(false);
    } else if (searchType === SearchType.Anime) {
      getAnimeCharacters(id)
        .then((res) => {
          //console.log(res);
          if (!res || res.data.data.length === 0) {
            setMessage?.({
              text: "Uh oh, looks like that Anime entry has no characters.",
              severity: "error",
            });
          } else {
            setMediaId(id);
            setCharacterData(
              res.data.data.map((elem) => ({
                id: elem.character.mal_id,
                imageUrl: elem.character.images.jpg.image_url,
                name: elem.character.name
              }))
            );
          }
          setLoading(false);
        })
        .catch((err) => {
          setMessage?.(err.response.data.message);
          setLoading(false);
        });
    } else if (searchType === SearchType.Manga) {
      getMangaCharacters(id)
        .then((res) => {
          if (!res || res.data.data.length === 0) {
            setMessage?.({
              text: "Uh oh, looks like that Manga entry has no characters.",
              severity: "error",
            });
          } else {
            setMediaId(id);
            setCharacterData(
              res.data.data.map((elem) => ({
                id: elem.character.mal_id,
                imageUrl: elem.character.images.jpg.image_url,
                name: elem.character.name
              }))
            );
          }
          setLoading(false);
        })
        .catch((err) => {
          setMessage?.({
            text: err.response.data.message,
            severity: "error",
          });
          console.error(err);
          setLoading(false);
        });
    }
  };

  return (
    <div className="pageRoot">
      <SearchBar
        onSearch={handleSearch}
        className={classes.searchBar}
        defaultValue={searchType}
        onChangeSearchType={(searchType) => {
          setSearchType(searchType);
          console.log(searchType);
        }}
      />
      {!(characterData.length > 0) && (
        <SearchResults
          data={searchResult}
          loading={isLoading}
          onSelect={handleOnSelect}
        />
      )}
      {isLoading && (
        <CircularProgress size={150} className={classes.loadingCircle} />
      )}
      {characterData.length > 0 && mediaId && (
        <Tierlist
          mediaId={`${mediaTypePrefix[searchType]}${mediaId}`}
          characterData={characterData}
        />
      )}
    </div>
  );
};

export default ListMaker;
