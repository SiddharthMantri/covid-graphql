import React from "react";
import {
  Card,
  makeStyles,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "420px"
  }
});

type SummaryCardProps = {
  confirmed: number;
  deaths: number;
  recovered: number;
  all?: number;
};

const SummaryCard = ({
  confirmed,
  deaths,
  recovered,
  all
}: SummaryCardProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6">Summary</Typography>
        <List dense disablePadding>
          <ListItem disableGutters>
            <ListItemText
              primary={<Typography variant="body1">All</Typography>}
            />
            <ListItemSecondaryAction>
              <Typography variant="body1">{all}</Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary={<Typography variant="body1">Confirmed Cases</Typography>}
            />
            <ListItemSecondaryAction>
              <Typography variant="body1">{confirmed}</Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary={<Typography variant="body1">Deaths</Typography>}
            />
            <ListItemSecondaryAction>
              <Typography variant="body1">{deaths}</Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary={<Typography variant="body1">Recovered</Typography>}
            />
            <ListItemSecondaryAction>
              <Typography variant="body1">{recovered}</Typography>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
export default SummaryCard;
