import { useState, useContext, FC } from "react";
import "./ListMaker.scss";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import {
  searchAnime,
  searchManga,
  getAnimeCharactersStaff,
  getMangaCharacters,
  filterAnime,
} from "../utils/Jikan";
import {
  searchSeries,
  TVDBUrl,
  getSeriesCharacters,
  TVDBImgUrl,
  missingActorUrl,
} from "../utils/TVDB";
import { makeStyles, createStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";
import TierList from "../components/TierList/TierList";
import { CharacterItem, ResultItem, SearchType } from "../utils/common";
import AppContext from "../contexts/AppContext";
import mangaFilter from "../utils/mangaFilter";
//import Firebase, { FirebaseContext } from "../components/Firebase";

//TODO: validate inputs

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

//TODO: Refactor this into someting more focused. It's handling too many responsibilities right now...
const ListMaker: FC = () => {
  const [searchResult, setSearchResult] = useState<ResultItem[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [mediaId, setMediaId] = useState<number>();
  const [characterData, setCharacterData] = useState<CharacterItem[]>([]);
  const [searchType, setSearchType] = useState<SearchType>(SearchType.TVshow);
  //const [token, setToken] = useState<string>(localStorage.getItem("auth-token") || "");
  //const firebase = useContext(FirebaseContext);
  const { setMessage } = useContext(AppContext);

  const classes = useStyles();

  //Handle a search submit
  const handleSearch = (searchValue: string): void => {
    //Clear the previous search's results
    setCharacterData([]);

    if (searchValue.length >= 3) {
      setLoading(true);

      if (searchType === SearchType.TVshow) {
        searchSeries(searchValue).then(
          (res) => {
            console.log(res);
            setSearchResult(
              res.data.data.map((elem) => ({
                id: elem.id,
                label: elem.seriesName,
                imageUrl: `${TVDBUrl}${elem.image}`,
              }))
            );
            setLoading(false);
          },
          (err) => {
            setMessage?.({
              text: `Could not search, TVDB's API is down: ${err}`,
              severity: "error",
            });
            setLoading(false);
          }
        );
      } else if (searchType === SearchType.Anime) {
        searchAnime(searchValue, 10).then(
          (res) => {
            console.log(res);
            const filtered = filterAnime(res.data.results);
            setSearchResult(
              filtered.map((elem) => ({
                id: elem.mal_id,
                label: elem.title,
                imageUrl: elem.image_url,
              }))
            );
            setLoading(false);
          },
          (err) => {
            setMessage?.({
              text: `Could not search, either MAL or Jikan's API is down: ${err}`,
              severity: "error",
            });
            setLoading(false);
          }
        );
      } else if (searchType === SearchType.Manga) {
        searchManga(searchValue, 10).then(
          (res) => {
            console.log(res);
            const filtered = res.data.results.filter(
              (manga) => !filterSet.has(manga.mal_id)
            );
            setSearchResult(
              filtered.map((elem) => ({
                id: elem.mal_id,
                label: elem.title,
                imageUrl: elem.image_url,
              }))
            );
            setLoading(false);
          },
          (err) => {
            setMessage?.({
              text: `Could not search, either MAL or Jikan's API is down: ${err}`,
              severity: "error",
            });
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
      getSeriesCharacters(id).then((res) => {
        console.log(res);
        setMediaId(id);
        setCharacterData(
          res.data.data.map((elem) => ({
            id: elem.id,
            name: elem.role,
            actor: elem.name,
            imageUrl: elem.image
              ? `${TVDBImgUrl}${elem.image}`
              : missingActorUrl,
          }))
        );
      });
      setLoading(false);
    } else if (searchType === SearchType.Anime) {
      getAnimeCharactersStaff(id)
        .then((res) => {
          //console.log(res);
          if (!res || res.data.characters.length === 0) {
            setMessage?.({
              text: "Uh oh, looks like that Anime entry has no characters.",
              severity: "error",
            });
          } else {
            setMediaId(id);
            setCharacterData(
              res.data.characters.map((elem) => ({
                ...elem,
                id: elem.mal_id,
                imageUrl: elem.image_url,
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
          console.log(res);
          if (!res || res.data.characters.length === 0) {
            setMessage?.({
              text: "Uh oh, looks like that Manga entry has no characters.",
              severity: "error",
            });
          } else {
            setMediaId(id);
            setCharacterData(
              res.data.characters.map((elem) => ({
                ...elem,
                id: elem.mal_id,
                imageUrl: elem.image_url,
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
        <TierList
          mediaId={`${mediaTypePrefix[searchType]}${mediaId}`}
          characterData={characterData}
        />
      )}
    </div>
  );
};

export default ListMaker;
