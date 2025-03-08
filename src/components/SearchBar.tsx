import { FC, useState, useEffect, FormEvent } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { IconButton, Paper, InputBase, Divider, Select, MenuItem, FormControl, Typography, Theme, SelectChangeEvent } from "@mui/material";
import { Search } from "@mui/icons-material";
import { SearchType } from "../utils/common";
import { getRandomSearches } from "../utils/SuggestedSearches";

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
  onChangeSearchType: (searchType: SearchType) => void;
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
    setSuggestions(getRandomSearches(searchType, 3));
  }, [searchType]);

  const handleChangeSearchType = (event: SelectChangeEvent<SearchType>): void => {
    // const casted = event as SelectChangeEvent<{ value: SearchType }>;
    setSearchType(event.target.value as SearchType);
    onChangeSearchType(event.target.value as SearchType);
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

  const handleSubmit = (event: FormEvent): void => {
    onSearch(searchValue);
    event.preventDefault();
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
          <Search />
        </IconButton>
      </Paper>
      {renderSuggestions()}
    </div>
  );
};

export default SearchBar;
