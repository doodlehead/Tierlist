import { FC } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { CharacterItem } from "../../utils/common";

const useStyles = makeStyles(() =>
  createStyles({
    characterTile: {
      position: "relative",
      flexGrow: 0,
      outline: "1px solid var(--lighter-grey)",
      height: "var(--image-tile-size)",
      overflow: "hidden",
      cursor: "pointer",
    },
    characterTile__name: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      fontSize: 10,
      fontWeight: 500,
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      backgroundColor: "rgb(20, 20, 20, 0.65)",
      padding: "3px 4px",
    },
    characterTile__image: {
      width: "var(--image-tile-size)",
      height: "auto",
    },
    "@media only screen and (min-width: 768px)": {
      characterTile__name: {
        fontSize: 14,
      },
    },
  })
);

interface CharacterTileProps {
  char: CharacterItem;
}

//Tile that represents a character.
const CharacterTile: FC<CharacterTileProps> = ({ char }): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.characterTile} key={char.id}>
      <div className={classes.characterTile__name} title={char.name}>
        {char.name}
      </div>
      <img
        alt={char.name}
        src={char.imageUrl}
        className={classes.characterTile__image}
      />
    </div>
  );
};

export default CharacterTile;
