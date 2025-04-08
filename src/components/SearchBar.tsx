import { FC, useState, useEffect } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import {
  IconButton,
  InputBase,
  Divider,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Theme,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { SearchType } from "../utils/common";
import { getRandomSearches } from "../utils/SuggestedSearches";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // root: {
    //   display: "flex",
    //   alignItems: "center",
    //   margin: "0 8px",
    //   backgroundColor: "var(--darker-grey)",
    // },
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
    // suggestionsRoot: {
    //   display: "flex",
    //   marginTop: "12px",
    //   marginLeft: "20px",
    // },
    // itemContainer: {
    //   display: "flex",
    //   flexWrap: "wrap",
    //   "& > p": {
    //     marginLeft: "8px",
    //     marginBottom: "6px",
    //   },
    // },
    suggestionItem: {
      marginLeft: "8px",
      backgroundColor: "var(--secondary-blue)",
      border: "2px solid var(--border-blue)",
      fontSize: "14px",
      padding: "4px 12px",
      borderRadius: "8px",
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
  // className,
  defaultValue,
}) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    setSuggestions(getRandomSearches(searchType, 3));
  }, [searchType]);

  const handleChangeSearchType = (
    event: SelectChangeEvent<SearchType>
  ): void => {
    // const casted = event as SelectChangeEvent<{ value: SearchType }>;
    setSearchType(event.target.value as SearchType);
    onChangeSearchType(event.target.value as SearchType);
  };

  // const renderSuggestion = (item: string): JSX.Element => (

  // );

  // const handleSubmit = (event: FormEvent): void => {
  //   onSearch(searchValue);
  //   event.preventDefault();
  // };

  const renderSuggestions = (): JSX.Element => (
    <Box display="flex" paddingY="12px" sx={{ alignItems: "center", color: "var(--hint)" }}>
      <Typography sx={{ whiteSpace: "nowrap" }}>Suggested searches:</Typography>
      <Box display="flex">
        {suggestions.map((item) => (
          <div
            className={classes.suggestionItem}
            onClick={() => {
              onSearch(item);
              setSearchValue(item);
            }}
          >
            <Typography fontSize="14px">{item}</Typography>
          </div>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box display="flex" justifyContent="center">
      <div style={{ justifySelf: "center" }}>
        <Box
          display="flex"
          sx={{
            maxWidth: "600px",
            backgroundColor: "var(--secondary-blue)",
            borderRadius: "8px",
            border: "2px solid var(--border-blue)"
          }}
        >
          {/* <Paper component="form" onSubmit={handleSubmit}> */}
          <FormControl>
            <Select
              value={searchType}
              onChange={handleChangeSearchType}
              // className={classes.select}
            >
              <MenuItem value={SearchType.TVshow}>TV show</MenuItem>
              {/* <MenuItem value={SearchType.Movie}>Movie</MenuItem> */}
              <MenuItem value={SearchType.Anime}>Anime</MenuItem>
              <MenuItem value={SearchType.Manga}>Manga</MenuItem>
            </Select>
          </FormControl>
          <Divider className={classes.divider} orientation="vertical" />
          <InputBase
            sx={{ flexGrow: 1, padding: "0 12px" }}
            // className={classes.input}
            placeholder="Search"
            name="search"
            autoComplete="off"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <IconButton
            type="submit"
            sx={{ flexBasis: "56px" }}
            // className={classes.iconButton}
            aria-label="search"
          >
            <Search />
          </IconButton>
          {/* </Paper> */}
        </Box>
        {renderSuggestions()}
      </div>
    </Box>
  );
};

export default SearchBar;
