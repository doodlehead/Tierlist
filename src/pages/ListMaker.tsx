import React, { useState, useEffect, useRef } from "react";
import "./ListMaker.scss";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import {
  searchAnime,
  searchManga,
  getAnimeCharactersStaff,
  AnimeSearchResult,
  AnimeCharacterData,
  getMangaCharacters,
} from "../utils/Jikan";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TierList from "../components/TierList/TierList";
import { SearchType } from "../components/SearchBar";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

//TODO: validate inputs

const useStyles = makeStyles((theme: Theme) =>
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

const ListMaker: React.FC = () => {
  const [searchResult, setSearchResult] = useState<AnimeSearchResult[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [malId, setMalId] = useState<number>();
  const [characterData, setCharacterData] = useState<AnimeCharacterData[]>([]);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [searchType, setSearchType] = useState<SearchType>(SearchType.TVshow);

  const classes = useStyles();

  //Show the snackbar when there's an error message available
  useEffect(() => {
    if (errorMsg) {
      setShowSnackbar(true);
    }
  }, [errorMsg]);

  //Handle a search submit
  const handleSearch = (event: React.FormEvent<HTMLDivElement>): void => {
    event.preventDefault();

    //Clear the previous search's results
    setCharacterData([]);
    //Get the search value
    const searchValue = ((event.target as HTMLFormElement).elements as any)
      .search.value;

    if (searchValue.length >= 3) {
      setLoading(true);

      if (searchType === SearchType.Anime) {
        searchAnime(searchValue, 10).then(
          (res) => {
            setSearchResult(res.data.results);
            setLoading(false);
          },
          (err) => {
            setErrorMsg("Could not search, either MAL or Jikan's API is down");
            setLoading(false);
          }
        );
      } else if (searchType === SearchType.Manga) {
        searchManga(searchValue, 10).then(
          (res) => {
            setSearchResult(res.data.results);
            setLoading(false);
          },
          (err) => {
            setErrorMsg("Could not search, either MAL or Jikan's API is down");
            setLoading(false);
          }
        );
      }
    }
  };

  //Handle when a user clicks a search result entry
  const handleOnSelect = (malId: number): void => {
    setLoading(true);

    if (searchType === SearchType.Anime) {
      getAnimeCharactersStaff(malId)
        .then((res) => {
          if (!res || res.data.characters.length === 0) {
            setErrorMsg(
              "Uh oh, looks like that Anime entry has no characters."
            );
          } else {
            setMalId(malId);
            setCharacterData(res.data.characters);
          }
          setLoading(false);
        })
        .catch((err) => {
          setErrorMsg(err.response.data.message);
          setLoading(false);
        });
    } else if (searchType === SearchType.Manga) {
      getMangaCharacters(malId)
        .then((res) => {
          if (!res || res.data.characters.length === 0) {
            setErrorMsg(
              "Uh oh, looks like that Manga entry has no characters."
            );
          } else {
            setMalId(malId);
            setCharacterData(res.data.characters);
          }
          setLoading(false);
        })
        .catch((err) => {
          setErrorMsg(err.response.data.message);
          setLoading(false);
        });
    }
  };

  const handleCloseError = (): void => {
    setShowSnackbar(false);
    setErrorMsg("");
  };

  return (
    <div className="pageRoot">
      {/* <h2>Tierlist Maker</h2> */}
      <SearchBar
        onSearch={handleSearch}
        className={classes.searchBar}
        defaultValue={searchType}
        onChangeSearchType={(event): void => {
          setSearchType(event.target.value);
          //searchType.current = event.target.value;
          console.log(event.target.value);
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
      {characterData.length > 0 && malId && (
        <TierList malId={malId} characterData={characterData} />
      )}

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseError}
          severity="error"
        >
          {errorMsg}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ListMaker;