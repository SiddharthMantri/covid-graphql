import { Card, CardContent, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "100%",
    maxHeight: "480px",
    minHeight: "480px",
    overflowY: "auto"
  },
  cardContent: {
    padding: "0px"
  },
  table: {
    minWidth: "100%"
  }
}));

const MapContainer = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}></CardContent>
    </Card>
  );
};

export default MapContainer;
