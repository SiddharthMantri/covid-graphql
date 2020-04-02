import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { blue, red, green, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    minWidth: "100%"
  }
});
const COLORS = {
  confirmed: {
    color: blue[700]
  },
  deaths: {
    color: red[700]
  },
  recovered: {
    color: green[700]
  },
  active: {
    color: yellow[700]
  }
};

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
  const numFormat = new Intl.NumberFormat("en-US").format(data);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="body1">{LABELS[type]}</Typography>
        <Typography variant="h4" style={{ ...COLORS[type] }}>
          {data ? `${numFormat}` : ""}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LabelCard;
