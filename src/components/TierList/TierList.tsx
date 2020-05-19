import React, { Component, FunctionComponent, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { AnimeCharacterData, DragAnimeCharItem } from "../../utils/Jikan";
import { ReactSortable } from "react-sortablejs";
import CharacterTile from "./CharacterTile";
import Tier from "./Tier";
import { DefaultColourOrder, DefaultTiers } from "./constants";

const IMAGE_SIZE = 100;

/* eslint-disable @typescript-eslint/camelcase */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    characterTile: {
      position: "relative",
      flexGrow: 0,
      border: "1px solid var(--lighter-grey)",
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
      maxWidth: IMAGE_SIZE,
      height: "auto",
    },
  })
);
/* eslint-enable @typescript-eslint/camelcase */

interface TierListProps {
  characterData: AnimeCharacterData[];
}

const TierList: FunctionComponent<TierListProps> = ({
  characterData,
}): JSX.Element => {
  const classes = useStyles();
  const [list, setList] = useState<DragAnimeCharItem[]>(
    characterData.map((char) => {
      return { id: char.mal_id, ...char } as DragAnimeCharItem;
    })
  );

  return (
    <div>
      {DefaultTiers.map((tier, index) => (
        <Tier
          name={tier}
          listItems={[]}
          group="tierlist"
          labelColour={`var(--tier-${DefaultColourOrder[index]})`}
        />
      ))}
      <ReactSortable
        group="tierlist"
        list={list}
        setList={setList}
        className={classes.root}
      >
        {list.map((char) => (
          <CharacterTile char={char} key={char.mal_id} />
        ))}
      </ReactSortable>
      {/* <Tier
        name="A"
        listItems={[]}
        group="tierlist"
        labelColour={`var(--tier-${DefaultColourOrder[0]})`}
      /> */}
    </div>
  );
};

export default TierList;
