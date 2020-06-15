import React, { FC, useState, useRef, useEffect, useContext } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { AnimeCharacterData, DragAnimeCharItem } from "../../utils/Jikan";
import { ReactSortable } from "react-sortablejs";
import CharacterTile from "./CharacterTile";
import Tier from "./Tier";
import { DefaultColourOrder, DefaultTiers } from "./constants";
import domtoimage from "dom-to-image";
import Button from "@material-ui/core/Button";
import { saveAs } from "file-saver";
//import { Save, SaveAlt } from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import MediaQuery from "react-responsive";
import { CharacterItem, DragItem } from "../../utils/common";
import AppContext from "../../contexts/AppContext";

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
    button: {
      marginRight: theme.spacing(1),
    },
    buttonGroup: {
      display: "flex",
      marginBottom: theme.spacing(2),
    },
    btnIcon: {
      marginRight: theme.spacing(1),
    },
  })
);
/* eslint-enable @typescript-eslint/camelcase */

interface Props {
  mediaId: string | number;
  characterData: CharacterItem[];
}

interface TierData {
  sorted: CharacterItem[][];
  unsorted: CharacterItem[];
}

const store = window.localStorage;

/**
 * Load save data from localStorage if it exists.
 * @param mediaId - the series/anime/manga's ID with the media's prefix
 * @param characterData - character data
 */
const getSaveData = (
  mediaId: string | number,
  characterData: CharacterItem[]
): TierData => {
  const saveData = store.getItem(`${mediaId}`);
  if (saveData) {
    return JSON.parse(saveData) as TierData;
  } else {
    return {
      sorted: [],
      unsorted: characterData,
    };
  }
};

const TierList: FC<Props> = ({ mediaId, characterData }): JSX.Element => {
  const classes = useStyles();
  const tierlistEl = useRef<HTMLDivElement>(null);
  const tierData = useRef<TierData>(getSaveData(mediaId, characterData));
  const [list, setList] = useState<CharacterItem[]>(tierData.current.unsorted);
  const appContext = useContext(AppContext);

  //Handle "download image"
  const handleExport = (): void => {
    if (tierlistEl.current) {
      domtoimage
        .toBlob(tierlistEl.current)
        .then((blob: Blob) => {
          saveAs(blob, `tierlist-${mediaId}.png`);
        })
        .catch((error) => {
          console.error("Could not generate image", error);
        });
    }
  };

  //Handle save to browser localstorage
  const handleSave = (): void => {
    try {
      tierData.current.unsorted = list; //Update the unsorted list
      store.setItem(`${mediaId}`, JSON.stringify(tierData.current));
      appContext.setMessage?.({
        text: "Saved successfully!",
        severity: "success",
      });
    } catch (err) {
      appContext.setMessage?.({
        text: err.toString(),
        severity: "error",
      });
    }
  };

  //Propogate state upwards from Tier
  const handleTierChange = (list: CharacterItem[], index: number): void => {
    tierData.current.sorted[index] = list;
  };

  return (
    <div>
      <div className={classes.buttonGroup}>
        <Button
          onClick={handleExport}
          className={classes.button}
          variant="outlined"
        >
          <SaveAltIcon className={classes.btnIcon} />
          Download <MediaQuery minWidth={768}>image</MediaQuery>
        </Button>
        <Button
          onClick={handleSave}
          className={classes.button}
          variant="outlined"
        >
          <SaveIcon className={classes.btnIcon} />
          Save
        </Button>
      </div>
      <div ref={tierlistEl} className={classes.root}>
        {DefaultTiers.map((tier, index) => (
          <Tier
            index={index}
            key={index}
            //ref={tierRefs[index]}
            onTierChange={handleTierChange}
            name={tier}
            listItems={tierData.current.sorted[index]}
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
            <CharacterTile char={char} key={char.id} />
          ))}
        </ReactSortable>
      </div>
    </div>
  );
};

export default TierList;
