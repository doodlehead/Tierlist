import { useState, useRef, useContext } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { ReactSortable } from "react-sortablejs";
import CharacterTile from "./CharacterTile";
import Tier from "./Tier";
import { DefaultColourOrder, DefaultTiers } from "./constants";
import domtoimage from "dom-to-image";
import { Theme, Button } from "@mui/material";
import { saveAs } from "file-saver";
import { Save, SaveAlt } from "@mui/icons-material";
import MediaQuery from "react-responsive";
import { CharacterDragItem } from "../../utils/common";
import AppContext from "../../contexts/AppContext";

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

interface TierlistProps {
  mediaId: string;
  characterData: CharacterDragItem[];
}

interface TierData {
  sorted: CharacterDragItem[][];
  unsorted: CharacterDragItem[];
}

// TODO: make a class that manages the save data?
const store = window.localStorage;

/**
 * Load save data from localStorage if it exists.
 * @param mediaId - the series/anime/manga's ID with the media's prefix
 * @param characterData - character data
 */
const getSaveData = (mediaId: string, characterData: CharacterDragItem[]): TierData => {
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

const Tierlist = ({ mediaId, characterData }: TierlistProps) => {
  const classes = useStyles();
  const tierlistEl = useRef<HTMLDivElement>(null);
  const tierData = useRef<TierData>(getSaveData(mediaId, characterData));
  const [list, setList] = useState<CharacterDragItem[]>(tierData.current.unsorted);
  const appContext = useContext(AppContext);

  // Handle "download image"
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

  // Handle save to browser localstorage
  const handleSave = (): void => {
    try {
      tierData.current.unsorted = list; // Update the unsorted list
      store.setItem(`${mediaId}`, JSON.stringify(tierData.current));
      appContext.setMessage?.({
        text: "Saved successfully!",
        severity: "success",
      });
    } catch (err) {
      appContext.setMessage?.({
        text: `${err}`,
        severity: "error",
      });
    }
  };

  // Propogate state upwards from Tier
  const handleTierChange = (list: CharacterDragItem[], index: number): void => {
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
          <SaveAlt className={classes.btnIcon} />
          Download <MediaQuery minWidth={768}>image</MediaQuery>
        </Button>
        <Button
          onClick={handleSave}
          className={classes.button}
          variant="outlined"
        >
          <Save className={classes.btnIcon} />
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

export default Tierlist;
