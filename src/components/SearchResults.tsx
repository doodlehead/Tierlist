import React, { Component, FunctionComponent } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { AnimeSearchResult } from "../utils/Jikan";

/* eslint-disable @typescript-eslint/camelcase */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
      gridGap: "20px",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    },
    animePanel: {
      border: "1px solid red",
    },
    animePanel__title: {
      fontSize: 18,
      display: "block",
    },
  })
);
/* eslint-enable @typescript-eslint/camelcase */

interface SearchResultProps {
  data: Array<AnimeSearchResult>;
}

const SearchResults: FunctionComponent<SearchResultProps> = ({ data }) => {
  const classes = useStyles();

  const renderAnimePanel = (anime: AnimeSearchResult): JSX.Element => {
    return (
      <div className={classes.animePanel}>
        <div className={classes.animePanel__title}>{anime.title}</div>
        <img alt={anime.title} src={anime.image_url} />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      {data.map((res) => renderAnimePanel(res))}
    </div>
  );
};

export default SearchResults;
