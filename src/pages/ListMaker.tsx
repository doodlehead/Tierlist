import React, { useState, useEffect } from "react";
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
//import { AxiosResponse } from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import TierList from "../components/TierList/TierList";
import { SearchType } from "../components/SearchBar";

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
      marginBottom: 40,
    },
  })
);

const ListMaker: React.FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<AnimeSearchResult[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [characterData, setCharacterData] = useState<AnimeCharacterData[]>([]);
  const [searchType, setSearchType] = useState<SearchType>(SearchType.Anime);

  const classes = useStyles();

  //Do a search when searchValue changes
  useEffect(() => {
    if (searchValue.length >= 3) {
      setLoading(true);

      if (searchType === SearchType.Anime) {
        searchAnime(searchValue, 10).then((res) => {
          setSearchResult(res.data.results);
          setLoading(false);
        });
      } else if (searchType === SearchType.Manga) {
        searchManga(searchValue, 10).then((res) => {
          setSearchResult(res.data.results);
          setLoading(false);
        });
      }
    }
  }, [searchValue]);

  const handleSearch = (event: React.FormEvent<HTMLDivElement>): void => {
    event.preventDefault();

    setCharacterData([]);

    setSearchValue(
      ((event.target as HTMLFormElement).elements as any).search.value
    );
  };

  const handleOnSelect = (malId: number): void => {
    setLoading(true);

    if (searchType === SearchType.Anime) {
      getAnimeCharactersStaff(malId).then((res) => {
        setCharacterData(res.data.characters);
        setLoading(false);
      });
    } else if (searchType === SearchType.Manga) {
      getMangaCharacters(malId).then((res) => {
        setCharacterData(res.data.characters);
        setLoading(false);
      });
    }
  };

  return (
    <div className="pageRoot">
      <h2>Tierlist Maker</h2>
      <SearchBar
        onSearch={handleSearch}
        className={classes.searchBar}
        onChangeSearchType={(event): void => {
          setSearchType(event.target.value);
          console.log(event.target.value);
        }}
      />
      {/* <h2>Tier list maker in progress!</h2> */}
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
      {characterData.length > 0 && <TierList characterData={characterData} />}
    </div>
  );
};

export default ListMaker;
