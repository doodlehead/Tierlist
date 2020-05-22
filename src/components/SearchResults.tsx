import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { AnimeSearchResult, Rating } from "../utils/Jikan";

const mobileItemWidth = 100;
/* eslint-disable @typescript-eslint/camelcase */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
      gridGap: "5px",
      gridTemplateColumns: `repeat(auto-fill, minmax(${mobileItemWidth}px, 1fr))`,
    },
    animePanel: {
      borderRadius: 3,
      backgroundColor: "var(--darker-grey)",
      "&:hover": {
        outline: "2px solid var(--lighter-grey)",
        cursor: "pointer",
      },
    },
    animePanel__title: {
      fontSize: 14,
      fontWeight: 500,
      display: "block",
      padding: "8px",
    },
    animePanel__image: {
      maxWidth: mobileItemWidth,
      height: "auto",
    },
    loadingCircle: {
      margin: "100px auto",
    },
    "@media only screen and (min-width: 768px)": {
      root: {
        display: "grid",
        gridGap: "20px",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      },
      animePanel: {
        borderRadius: 3,
        backgroundColor: "var(--darker-grey)",
        "&:hover": {
          outline: "2px solid var(--lighter-grey)",
          cursor: "pointer",
        },
      },
      animePanel__title: {
        fontSize: 18,
        fontWeight: 500,
        display: "block",
        padding: "8px",
      },
      animePanel__image: {
        maxWidth: 200,
        height: "auto",
      },
      loadingCircle: {
        margin: "100px auto",
      },
    },
  })
);
/* eslint-enable @typescript-eslint/camelcase */

interface SearchResultProps {
  data: AnimeSearchResult[];
  loading: boolean;
  onSelect: OnSelectFunction;
  className?: string;
}

interface OnSelectFunction {
  (malId: number): void;
}

const SearchResults: FC<SearchResultProps> = ({
  data,
  loading,
  onSelect,
  className,
}) => {
  const classes = useStyles();
  const filteredData = data.filter((elem) => {
    //TODO: fix this. OH GOD WHY. TYPESCRIPT ENUMS ARE USELESS :'(

    //console.log(`${elem.title} ${elem.rated}`);

    return (
      Object.values(Rating).indexOf(elem.rated) <=
      Object.values(Rating).indexOf(Rating.r)
    );
  });

  const renderAnimePanel = (anime: AnimeSearchResult): JSX.Element => {
    return (
      <div
        className={classes.animePanel}
        key={anime.mal_id}
        onClick={(): void => {
          onSelect(anime.mal_id);
        }}
      >
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
    return <div></div>;
  } else {
    return (
      <div className={className}>
        <div className={classes.root}>
          {!loading && filteredData.map((res) => renderAnimePanel(res))}
        </div>
      </div>
    );
  }
};

export default SearchResults;
