import React, { Component, useState, useEffect } from "react";
import "./ListMaker.scss";
//import "../App.scss";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
// import * as Mal from "jikan-client";
// import { Search } from "jikan-client/dist/interfaces/search/Search";
import { searchAnime, AnimeSearchResult } from "../utils/Jikan";
import { AxiosResponse } from "axios";

//TODO: validate inputs

const ListMaker: React.FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Array<AnimeSearchResult>>(
    []
  );
  const [isLoading, setLoading] = useState<boolean>(false);

  //Do a search when searchValue changes
  useEffect(() => {
    if (searchValue.length >= 3) {
      setLoading(true);
      searchAnime(searchValue, 10).then((res) => {
        setSearchResult(res.data.results);
        setLoading(false);
      });
    }
  }, [searchValue]);

  const handleSearch = (event: React.FormEvent<HTMLDivElement>): void => {
    event.preventDefault();

    setSearchValue(
      ((event.target as HTMLFormElement).elements as any).search.value
    );
  };

  const handleOnAnimeSelect = (): void => {};

  return (
    <div className="pageRoot">
      <SearchBar onSearch={handleSearch} />
      <h2>Tier list maker in progress!</h2>
      <SearchResults
        data={searchResult}
        loading={isLoading}
        onAnimeSelect={handleOnAnimeSelect}
      />
    </div>
  );
};

export default ListMaker;
