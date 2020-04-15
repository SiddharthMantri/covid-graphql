import React from "react";
import {
  Container,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Link
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  padded: {
    padding: "32px !important"
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <Divider></Divider>
      <Container maxWidth="lg" className={classes.padded}>
        <Grid container spacing={2}>
          <Typography variant="body1">Sources: </Typography>
          {"    "}
          <Typography
            variant="body1"
            component={Link}
            href="https://github.com/CSSEGISandData/COVID-19"
            target="_blank"
          >
            Novel Coronavirus (COVID-19) Cases, provided by JHU CSSE
          </Typography>
        </Grid>
      </Container>
    </>
  );
};

export default Footer;
