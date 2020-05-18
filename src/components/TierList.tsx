import React, { Component, FunctionComponent } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { AnimeCharacterData } from "../utils/Jikan";

/* eslint-disable @typescript-eslint/camelcase */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    characterTile: {
      position: "relative",
      //flexBasis: "100px",
      flexGrow: 0,
      border: "1px solid var(--lighter-grey)",
      height: 120,
      overflow: "hidden",
    },
    characterTile__name: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      fontSize: 14,
      fontWeight: 500,
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      backgroundColor: "rgb(20, 20, 20, 0.65)",
    },
    characterTile__image: {
      maxWidth: 120,
      height: "auto",
    },
  })
);
/* eslint-enable @typescript-eslint/camelcase */

interface TierListProps {
  characterData: Array<AnimeCharacterData>;
}

const TierList: FunctionComponent<TierListProps> = ({
  characterData,
}): JSX.Element => {
  const classes = useStyles();

  const renderCharacter = (char: AnimeCharacterData): JSX.Element => {
    return (
      <div className={classes.characterTile} key={char.mal_id}>
        <div className={classes.characterTile__name}>{char.name}</div>
        <img
          alt={char.name}
          src={char.image_url}
          className={classes.characterTile__image}
        />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      {characterData.map((char) => renderCharacter(char))}
    </div>
  );
};

export default TierList;
