import React from "react";
import { makeStyles, useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 24,
    borderTop: `1px solid ${theme.palette.divider}`
  }
}));

const Footer = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const classes = useStyles();
  return <div className={classes.root}></div>;
};
export default Footer;
