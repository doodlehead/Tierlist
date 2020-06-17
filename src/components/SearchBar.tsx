import React, { FC, useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
//import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
//import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import { Menu, MenuItem, FormControl, Typography } from "@material-ui/core";
import { SearchType } from "../utils/common";
import { getItems } from "../utils/SuggestedSearches";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      margin: "0 8px",
      backgroundColor: "var(--darker-grey)",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      fontSize: 16,
    },
    iconButton: {
      padding: "0 10px",
    },
    divider: {
      height: 28,
      margin: 4,
    },
    select: {
      padding: "0 8px",
      fontSize: 14,
    },
    "@media only screen and (min-width: 768px)": {
      root: {
        display: "flex",
        alignItems: "center",
        margin: "0 40px",
        backgroundColor: "var(--darker-grey)",
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        fontSize: 20,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
      select: {
        padding: "0 12px",
      },
    },
    suggestionsRoot: {
      display: "flex",
      marginTop: "12px",
      marginLeft: "20px",
    },
    itemContainer: {
      display: "flex",
      flexWrap: "wrap",
      "& > p": {
        marginLeft: "8px",
        marginBottom: "6px",
      },
    },
    suggestionItem: {
      border: "1px solid var(--lighter-grey)",
      fontSize: "14px",
      padding: "2px 8px 0",
      borderRadius: "14px",
      cursor: "pointer",
      whiteSpace: "nowrap",
      "&:hover": {
        opacity: "0.6",
      },
    },
  })
);

interface Props {
  onSearch: (search: string) => void;
  onChangeSearchType: (event: React.ChangeEvent<{ value: SearchType }>) => void;
  className?: string;
  defaultValue: SearchType;
}

const SearchBar: FC<Props> = ({
  onSearch,
  onChangeSearchType,
  className,
  defaultValue,
}) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    setSuggestions(getItems(searchType, 3));
  }, [searchType]);

  const handleChangeSearchType = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    const casted = event as React.ChangeEvent<{ value: SearchType }>;
    setSearchType(event.target.value as SearchType);
    onChangeSearchType(casted);
  };

  const renderSuggestion = (item: string): JSX.Element => (
    <Typography
      className={classes.suggestionItem}
      onClick={() => {
        onSearch(item);
        setSearchValue(item);
      }}
    >
      {item}
    </Typography>
  );

  const handleSubmit = (event: React.FormEvent<HTMLDivElement>): void => {
    onSearch(((event.target as HTMLFormElement).elements as any).search.value);
  };

  const renderSuggestions = (): JSX.Element => (
    <div className={classes.suggestionsRoot}>
      <Typography component="div" style={{ whiteSpace: "nowrap" }}>
        Suggested searches:
      </Typography>
      <div className={classes.itemContainer}>
        {suggestions.map(renderSuggestion)}
      </div>
    </div>
  );

  return (
    <div className={className}>
      <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
        <FormControl variant="outlined">
          <Select
            value={searchType}
            onChange={handleChangeSearchType}
            className={classes.select}
          >
            <MenuItem value={SearchType.TVshow}>TV show</MenuItem>
            {/* <MenuItem value={SearchType.Movie}>Movie</MenuItem> */}
            <MenuItem value={SearchType.Anime}>Anime</MenuItem>
            <MenuItem value={SearchType.Manga}>Manga</MenuItem>
          </Select>
        </FormControl>
        <Divider className={classes.divider} orientation="vertical" />
        <InputBase
          className={classes.input}
          placeholder="Search"
          name="search"
          autoComplete="off"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {renderSuggestions()}
    </div>
  );
};

export default SearchBar;
