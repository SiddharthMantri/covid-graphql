import { Card, CardContent, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    maxHeight: "480px",
    minHeight: "480px",
    overflowY: "auto",
  },
  cardContent: {
    padding: "0px",
  },
  table: {
    minWidth: "100%",
  },
}));

const MapContainer = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent} />
    </Card>
  );
};

export default MapContainer;
