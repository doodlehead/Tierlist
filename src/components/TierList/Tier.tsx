import React, { useState, FC, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ReactSortable } from "react-sortablejs";
import { DragAnimeCharItem } from "../../utils/Jikan";
import CharacterTile from "./CharacterTile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      outline: "1px solid red",
      minHeight: "var(--image-tile-size)",
    },
    tierLabel: {
      width: 40,
      fontSize: 20,
      fontWeight: 600,
      flexGrow: 0,
      color: "black",
    },
    list: {
      flexGrow: 1,
      display: "flex",
      flexWrap: "wrap",
      maxWidth: "calc(100% - 80px)",
    },
    "@media only screen and (min-width: 768px)": {
      tierLabel: {
        width: 80,
        fontSize: 24,
      },
    },
  })
);

interface TierProps {
  name: string;
  group: string;
  listItems: DragAnimeCharItem[];
  labelColour?: string;
  index: number;
  onTierChange: (list: DragAnimeCharItem[], index: number) => void;
}

//Represents a tier in a tierlist. Example: "A-tier"
const Tier: FC<TierProps> = ({
  name,
  group,
  listItems,
  labelColour,
  index,
  onTierChange,
}): JSX.Element => {
  const classes = useStyles();
  const [list, setList] = useState<DragAnimeCharItem[]>(listItems || []);

  useEffect(() => {
    onTierChange(list, index);
  }, [list, index]);

  return (
    <div className={classes.root}>
      <div
        className={classes.tierLabel}
        style={{ backgroundColor: labelColour }}
      >
        <p style={{ verticalAlign: "middle" }}>{name}</p>
      </div>
      <ReactSortable
        list={list}
        setList={setList}
        className={classes.list}
        group={group}
      >
        {list.map((char) => (
          <CharacterTile char={char} key={char.mal_id} />
        ))}
      </ReactSortable>
    </div>
  );
};

export default Tier;