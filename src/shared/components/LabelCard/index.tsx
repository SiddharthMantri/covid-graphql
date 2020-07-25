import {
  Card,
  CardContent,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";
import React from "react";
import { blue, red, green, yellow } from "@material-ui/core/colors";
import { ChangeStat } from "../../index";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
  },
});
const COLORS = {
  confirmed: {
    color: blue[700],
  },
  deaths: {
    color: red[700],
  },
  recovered: {
    color: green[700],
  },
  active: {
    color: yellow[700],
  },
};

const LABELS = {
  recovered: "Recovered",
  confirmed: "Confirmed",
  deaths: "Deaths",
  active: "Active",
};

type LabelCardProps = {
  type: "recovered" | "confirmed" | "deaths" | "active";
  data: ChangeStat;
};

const LabelCard = ({ type, data }: LabelCardProps) => {
  const classes = useStyles();
  const numFormat = data
    ? new Intl.NumberFormat("en-US").format(data.number)
    : 0;
  const percChange = data && data.perc ? data.perc.toFixed(3) : 0;
  const changeFormat =
    data && data.change
      ? new Intl.NumberFormat("en-US").format(data.change)
      : 0;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="body1">{LABELS[type]}</Typography>
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" style={{ ...COLORS[type] }}>
              {data ? `${numFormat}` : ""}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {data && data.perc > 0 ? (
              <ArrowUpwardIcon
                style={{ ...COLORS[type], fontSize: "0.875rem" }}
              />
            ) : (
              <ArrowDownwardIcon
                style={{ ...COLORS[type], fontSize: "0.875rem" }}
              />
            )}
            <Typography variant="body2" style={{ ...COLORS[type] }}>
              {data ? `${percChange}%` : ""}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={3}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {data && data.number > 0 ? (
              <ArrowUpwardIcon
                style={{ ...COLORS[type], fontSize: "0.875rem" }}
              />
            ) : (
              <ArrowDownwardIcon
                style={{ ...COLORS[type], fontSize: "0.875rem" }}
              />
            )}
            <Typography variant="body2" style={{ ...COLORS[type] }}>
              {data ? `${changeFormat}` : ""}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LabelCard;
