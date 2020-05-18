import React, { Component, FunctionComponent } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      margin: "0 40px",
      backgroundColor: "var(--darker-grey)",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      color: "var(--lighter-grey)",
    },
    iconButton: {
      padding: 10,
      color: "var(--lighter-grey)",
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

interface SearchProps {
  onSearch: OnSearchFunc;
}

interface OnSearchFunc {
  (event: React.FormEvent<HTMLDivElement>): void;
}

const SearchBar: FunctionComponent<SearchProps> = ({ onSearch }) => {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root} onSubmit={onSearch}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase className={classes.input} placeholder="Search" name="search" />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      {/* <Divider className={classes.divider} orientation="vertical" /> */}
    </Paper>
  );
};

export default SearchBar;
