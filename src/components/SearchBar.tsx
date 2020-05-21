import React, { FC, useState } from "react";
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
import { Menu, MenuItem, FormControl } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      margin: "0 40px",
      backgroundColor: "var(--darker-grey)",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      //color: "var(--lighter-grey)",
      fontSize: 20,
    },
    iconButton: {
      padding: 10,
      //color: "var(--lighter-grey)",
    },
    divider: {
      height: 28,
      margin: 4,
    },
    select: {
      //color: "var(--lighter-grey)",
      padding: "0 12px",
    },
  })
);

interface SearchProps {
  onSearch: OnSearchFunc;
  onChangeSearchType: OnChangeSearchType;
  className?: string;
  defaultValue: SearchType;
}

interface OnSearchFunc {
  (event: React.FormEvent<HTMLDivElement>): void;
}
interface OnChangeSearchType {
  (event: React.ChangeEvent<{ value: SearchType }>): void;
}

export enum SearchType {
  Anime = "Anime",
  Manga = "Manga",
}

const SearchBar: FC<SearchProps> = ({
  onSearch,
  onChangeSearchType,
  className,
  defaultValue,
}) => {
  const classes = useStyles();
  const [searchType, setSearchType] = useState(defaultValue);

  const handleChangeSearchType = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setSearchType(event.target.value as SearchType);

    //TODO: find a better way...
    onChangeSearchType({
      ...event,
      target: { value: event.target.value as SearchType },
    } as React.ChangeEvent<{ value: SearchType }>);
  };

  return (
    <div className={className}>
      <Paper component="form" className={classes.root} onSubmit={onSearch}>
        <FormControl variant="outlined">
          <Select
            value={searchType}
            onChange={handleChangeSearchType}
            className={classes.select}
          >
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
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default SearchBar;
