import React, { Component, FunctionComponent } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
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
      //border: "1px solid red",
      borderRadius: 3,
      backgroundColor: "var(--darker-grey)",
      "&:hover": {
        opacity: 0.6,
        cursor: "pointer",
      },
    },
    animePanel__title: {
      fontSize: 18,
      display: "block",
      padding: "8px 4px",
    },
    animePanel__image: {
      maxWidth: 200,
      height: "auto",
    },
    loadingCircle: {
      margin: "100px auto",
    },
  })
);
/* eslint-enable @typescript-eslint/camelcase */

interface SearchResultProps {
  data: Array<AnimeSearchResult>;
  loading: boolean;
  onAnimeSelect: OnAnimeSelectFunction;
}

interface OnAnimeSelectFunction {
  (): void;
}

const SearchResults: FunctionComponent<SearchResultProps> = ({
  data,
  loading,
  onAnimeSelect,
}) => {
  const classes = useStyles();

  const renderAnimePanel = (anime: AnimeSearchResult): JSX.Element => {
    return (
      <div className={classes.animePanel} key={anime.mal_id}>
        <div className={classes.animePanel__title}>{anime.title}</div>
        <img
          alt={anime.title}
          src={anime.image_url}
          className={classes.animePanel__image}
        />
      </div>
    );
  };

  if (loading) {
    return <CircularProgress size={150} className={classes.loadingCircle} />;
  } else {
    return (
      <div className={classes.root}>
        {!loading && data.map((res) => renderAnimePanel(res))}
      </div>
    );
  }
};

export default SearchResults;
