import React from "react";
import {
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction
} from "@material-ui/core";
import { ChangeStat } from "../../../shared";

const LABELS = {
  recovered: "Recovered",
  confirmed: "Confirmed",
  deaths: "Deaths",
  active: "Active"
};

type CountryListItemProps = {
  type: "recovered" | "confirmed" | "deaths" | "active";
  data?: ChangeStat;
};

const CountryListItem = ({ type, data }: CountryListItemProps) => {
  let value = data ? new Intl.NumberFormat("en-US").format(data.number) : "";
  return (
    <ListItem disableGutters>
      <ListItemText>
        <Typography variant="body1">{LABELS[type]}</Typography>
      </ListItemText>
      <ListItemSecondaryAction>
        <ListItemText>
          <Typography variant="body1">{value}</Typography>
        </ListItemText>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default CountryListItem;
