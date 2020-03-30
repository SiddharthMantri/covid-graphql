import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { blue, red, green, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    minWidth: "100%"
  },
  typography: {
    confirmed: {
      color: blue
    },
    deaths: {
      color: red
    },
    recovered: {
      color: green
    },
    active: {
      color: yellow
    }
  }
});

const LABELS = {
  recovered: "Recovered",
  confirmed: "Confirmed",
  deaths: "Deaths",
  active: "Active"
};

type LabelCardProps = {
  type: "recovered" | "confirmed" | "deaths" | "active";
  data: number;
};

const LabelCard = ({ type, data }: LabelCardProps) => {
  const classes = useStyles();
  console.log(classes)
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6">{LABELS[type]}</Typography>
        <Typography variant="h5" className={classes.typography[type]}>
          {data}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LabelCard;
