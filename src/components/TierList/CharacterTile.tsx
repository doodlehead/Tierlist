import { AnimeCharacterData } from "../../utils/Jikan";
import React, { Component, FC, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const IMAGE_SIZE = 100;

/* eslint-disable @typescript-eslint/camelcase */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      cursor: "pointer",
    },
    characterTile: {
      position: "relative",
      flexGrow: 0,
      outline: "1px solid var(--lighter-grey)",
      height: IMAGE_SIZE,
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
      padding: "3px 4px",
    },
    characterTile__image: {
      width: IMAGE_SIZE,
      height: "auto",
    },
  })
);
/* eslint-enable @typescript-eslint/camelcase */

interface CharacterTileProps {
  char: AnimeCharacterData;
}

//Tile that represents a character.
const CharacterTile: FC<CharacterTileProps> = ({ char }): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.characterTile} key={char.mal_id}>
      <div className={classes.characterTile__name} title={char.name}>
        {char.name}
      </div>
      <img
        alt={char.name}
        src={char.image_url}
        className={classes.characterTile__image}
      />
    </div>
  );
};

export default CharacterTile;
