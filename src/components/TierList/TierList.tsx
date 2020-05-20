import React, { FC, useState, useRef } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { AnimeCharacterData, DragAnimeCharItem } from "../../utils/Jikan";
import { ReactSortable } from "react-sortablejs";
import CharacterTile from "./CharacterTile";
import Tier from "./Tier";
import { DefaultColourOrder, DefaultTiers } from "./constants";
import domtoimage from "dom-to-image";
import Button from "@material-ui/core/Button";
import { saveAs } from "file-saver";

//Is 100 too big?
const IMAGE_SIZE = 100;

/* eslint-disable @typescript-eslint/camelcase */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 10,
      backgroundColor: "var(--dark-grey)",
    },
    unrankedList: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: 20,
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
    exportBtn: {
      marginBottom: theme.spacing(2),
    },
  })
);
/* eslint-enable @typescript-eslint/camelcase */

interface TierListProps {
  characterData: AnimeCharacterData[];
}

const TierList: FC<TierListProps> = ({ characterData }): JSX.Element => {
  const classes = useStyles();
  const tierlistEl = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<DragAnimeCharItem[]>(
    characterData.map((char) => {
      return { id: char.mal_id, ...char } as DragAnimeCharItem;
    })
  );

  const handleExport = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (tierlistEl.current) {
      domtoimage
        .toBlob(tierlistEl.current)
        .then((blob: Blob) => {
          saveAs(blob, `tierlist.png`);
        })
        .catch((error: any) => {
          console.error("Could not generate image", error);
        });
    }
  };

  return (
    <div>
      <Button
        onClick={handleExport}
        className={classes.exportBtn}
        variant="outlined"
      >
        Export to image
      </Button>
      <div ref={tierlistEl} className={classes.root}>
        {DefaultTiers.map((tier, index) => (
          <Tier
            key={index}
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
          className={classes.unrankedList}
        >
          {list.map((char) => (
            <CharacterTile char={char} key={char.mal_id} />
          ))}
        </ReactSortable>
      </div>
    </div>
  );
};

export default TierList;
