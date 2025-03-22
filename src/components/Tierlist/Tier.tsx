import React, { useState, FC, useEffect } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { ReactSortable } from "react-sortablejs";
import CharacterTile from "./CharacterTile";
import { CharacterDragItem } from "../../utils/common";
import { Box } from "@mui/material";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      // outline: "1px solid red",
      minHeight: "var(--image-tile-size)",
    },
    tierLabel: {
      width: 40,
      fontSize: 20,
      fontWeight: 600,
      flexGrow: 0,
      // color: "black",
    },
    list: {
      flexGrow: 1,
      display: "flex",
      flexWrap: "wrap",
      maxWidth: "calc(100% - 80px)",
      background: "linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)"
    },
    "@media only screen and (min-width: 768px)": {
      tierLabel: {
        width: 80,
        fontSize: 24,
      },
    },
  })
);

interface Props {
  name: string;
  group: string;
  listItems: CharacterDragItem[];
  labelColour?: string;
  index: number;
  onTierChange: (list: CharacterDragItem[], index: number) => void;
  style?: React.CSSProperties;
}

//Represents a tier in a tierlist. Example: "A-tier"
const Tier: FC<Props> = ({
  name,
  group,
  listItems,
  labelColour,
  index,
  onTierChange,
  ...restProps
}): JSX.Element => {
  const classes = useStyles();
  const [list, setList] = useState<CharacterDragItem[]>(listItems || []);

  useEffect(() => {
    onTierChange(list, index);
  }, [list, index, onTierChange]);

  return (
    <Box
      className={classes.root}
      sx={{ border: `2px solid ${labelColour}`, borderRadius: "8px" }}
      {...restProps}
    >
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
          <CharacterTile char={char} key={char.id} />
        ))}
      </ReactSortable>
    </Box>
  );
};

export default Tier;
