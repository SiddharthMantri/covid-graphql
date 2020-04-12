import React from "react";
import {
  Card,
  makeStyles,
  CardContent,
  Typography,
  Select,
  MenuItem
} from "@material-ui/core";
import dayjs from "dayjs";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "100px"
  }
});

type DateUpdated = {
  updated?: string;
};

const DatePicker = ({ updated }: DateUpdated) => {
  const classes = useStyles();
  let formatted =
    updated !== "" && updated
      ? dayjs(updated).format("YYYY-MM-DD HH:mm:ss")
      : "";
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="body2">Data last updated at:</Typography>
        <Typography variant="h6">{formatted}</Typography>
      </CardContent>
    </Card>
  );
};
export default DatePicker;
