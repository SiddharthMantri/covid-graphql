import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { blue, red, green, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "100%",
    maxHeight: "480px",
    minHeight: "480px",
    overflowY: 'scroll'
  }
}));

type CountryListProps = {
  type: "recovered" | "confirmed" | "deaths" | "active";
  data: number;
};

const CountryList = ({ type, data }: CountryListProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        
      </CardContent>
    </Card>
  );
};

export default CountryList;
