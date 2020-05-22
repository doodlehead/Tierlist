import React, { FC, useState, useRef, useEffect } from "react";
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

//Is 100 too big?
//const IMAGE_SIZE = 100;

/* eslint-disable @typescript-eslint/camelcase */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // ":root": {
    //   "--imageSize": "50px",
    //   "@media only screen and (min-width: 768px)": {
    //     "--imageSize": "100px",
    //   },
    // },
    root: {
      padding: 10,
      backgroundColor: "var(--dark-grey)",
    },
    unrankedList: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: 20,
    },
    // characterTile: {
    //   position: "relative",
    //   flexGrow: 0,
    //   border: "1px solid var(--lighter-grey)",
    //   height: "var(--imageSize)",
    //   overflow: "hidden",
    // },
    // characterTile__name: {
    //   position: "absolute",
    //   top: 0,
    //   left: 0,
    //   right: 0,
    //   zIndex: 1,
    //   fontSize: 14,
    //   fontWeight: 500,
    //   whiteSpace: "nowrap",
    //   textOverflow: "ellipsis",
    //   overflow: "hidden",
    //   backgroundColor: "rgb(20, 20, 20, 0.65)",
    //   padding: "3px 4px",
    // },
    // characterTile__image: {
    //   maxWidth: "var(--imageSize)",
    //   height: "auto",
    // },
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

interface TierListProps {
  malId: number;
  characterData: AnimeCharacterData[];
}

interface TierData {
  sorted: DragAnimeCharItem[][];
  unsorted: DragAnimeCharItem[];
}

const store = window.localStorage;
const getSaveData = (
  malId: number,
  characterData: DragAnimeCharItem[]
): TierData => {
  const saveData = store.getItem(`${malId}`);
  if (saveData) {
    return JSON.parse(saveData) as TierData;
  } else {
    return {
      sorted: [],
      unsorted: characterData,
    };
  }
};

const TierList: FC<TierListProps> = ({ malId, characterData }): JSX.Element => {
  const classes = useStyles();
  const tierlistEl = useRef<HTMLDivElement>(null);
  //const [tierRefs, setTierRefs] = useState<Node[]>([]);
  const tierData = useRef<TierData>(
    getSaveData(
      malId,
      characterData.map((char) => {
        return { id: char.mal_id, ...char } as DragAnimeCharItem;
      })
    )
  );

  const [list, setList] = useState<DragAnimeCharItem[]>(
    tierData.current.unsorted
  );

  //Handle "download image"
  const handleExport = (): void => {
    if (tierlistEl.current) {
      domtoimage
        .toBlob(tierlistEl.current)
        .then((blob: Blob) => {
          saveAs(blob, `tierlist-${malId}.png`);
        })
        .catch((error: any) => {
          console.error("Could not generate image", error);
        });
    }
  };

  //Handle save to browser localstorage
  const handleSave = (): void => {
    tierData.current.unsorted = list; //Update the unsorted list
    store.setItem(`${malId}`, JSON.stringify(tierData.current));
  };

  //Propogate state upwards from Tier
  const handleTierChange = (list: DragAnimeCharItem[], index: number): void => {
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
            <CharacterTile char={char} key={char.mal_id} />
          ))}
        </ReactSortable>
      </div>
    </div>
  );
};

export default TierList;
