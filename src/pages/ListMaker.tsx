import React, { useState, useEffect, useRef, useContext } from "react";
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
import { searchSeries } from "../utils/TVDB";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TierList from "../components/TierList/TierList";
import { SearchType } from "../components/SearchBar";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
//import Firebase, { FirebaseContext } from "../components/Firebase";
import axios from "axios";

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

//TODO: Refactor this into someting more focused. It's handling too many responsibilities right now...
const ListMaker: React.FC = () => {
  const [searchResult, setSearchResult] = useState<AnimeSearchResult[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [malId, setMalId] = useState<number>();
  const [characterData, setCharacterData] = useState<AnimeCharacterData[]>([]);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [searchType, setSearchType] = useState<SearchType>(SearchType.TVshow);
  const [token, setToken] = useState<string>(
    localStorage.getItem("auth-token") || ""
  );
  //const firebase = useContext(FirebaseContext);

  const classes = useStyles();

  //Run on first render
  useEffect(() => {
    const fetchData = async () => {
      //TODO: this is probably bad practice. Store into a Context? Or something reactive?
      let token = localStorage.getItem("auth-token");
      if (!token) {
        //TODO: move this to util file and decide on a schema for the response
        try {
          const res = await axios.get(
            `http://localhost:5001/${process.env.REACT_APP_DEV_PROJECT_ID}/us-central1/getToken`
          );
          token = res.data.value;
        } catch (err) {}

        if (!token) {
          setErrorMsg("Uh oh, could not get auth token for TVDB.");
        } else {
          localStorage.setItem("auth-token", token);
          setToken(token);
        }
      }
    };
    fetchData();
  }, []);

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

      if (searchType === SearchType.TVshow) {
        searchSeries(token, searchValue).then(
          (res) => {
            console.log(res);
          },
          (err) => {
            setErrorMsg("Could not search, TVDB's API is down");
            setLoading(false);
          }
        );
      } else if (searchType === SearchType.Anime) {
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
