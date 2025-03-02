import { FC } from "react";
import { makeStyles, createStyles } from "@mui/styles";
//import { AnimeSearchResult, Rating } from "../utils/Jikan";
import { ResultItem } from "../utils/common";

const mobileItemWidth = 100;
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "grid",
      gridGap: "5px",
      gridTemplateColumns: `repeat(auto-fill, minmax(${mobileItemWidth}px, 1fr))`,
    },
    panel: {
      borderRadius: 3,
      backgroundColor: "var(--darker-grey)",
      "&:hover": {
        outline: "2px solid var(--lighter-grey)",
        cursor: "pointer",
      },
    },
    panel__title: {
      fontSize: 14,
      fontWeight: 500,
      display: "block",
      padding: "8px",
    },
    panel__image: {
      maxWidth: mobileItemWidth,
      height: "auto",
    },
    loadingCircle: {
      margin: "100px auto",
    },
    "@media only screen and (min-width: 768px)": {
      root: {
        display: "grid",
        gridGap: "20px",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      },
      panel: {
        borderRadius: 3,
        backgroundColor: "var(--darker-grey)",
        "&:hover": {
          outline: "2px solid var(--lighter-grey)",
          cursor: "pointer",
        },
      },
      panel__title: {
        fontSize: 18,
        fontWeight: 500,
        display: "block",
        padding: "8px",
      },
      panel__image: {
        maxWidth: 200,
        height: "auto",
      },
      loadingCircle: {
        margin: "100px auto",
      },
    },
  })
);

interface Props {
  data: ResultItem[];
  loading: boolean;
  onSelect: (malId: number) => void;
  className?: string;
}

// interface OnSelectFunction {
//   (malId: number): void;
// }

const SearchResults: FC<Props> = ({ data, loading, onSelect, className }) => {
  const classes = useStyles();

  //Anime/Manga panel
  const renderItem = (item: ResultItem): JSX.Element => {
    return (
      <div
        className={classes.panel}
        key={item.id}
        onClick={() => onSelect(item.id)}
      >
        <div className={classes.panel__title}>{item.label}</div>
        <img
          alt={item.label}
          src={item.imageUrl}
          className={classes.panel__image}
        />
      </div>
    );
  };

  if (loading) {
    return <div></div>;
  } else {
    return (
      <div className={className}>
        <div className={classes.root}>
          {!loading && data.map((elem) => renderItem(elem))}
        </div>
      </div>
    );
  }
};

export default SearchResults;
