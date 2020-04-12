import React from "react";
import {
  Card,
  makeStyles,
  CardContent,
  Typography,
  Select,
  MenuItem
} from "@material-ui/core";
import { CountryRegion } from "../../types";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "100px"
  }
});

type CountrySearchProps = {
  countries: CountryRegion[];
  onChange: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: React.ReactNode
  ) => void;
  selectedCountry: string;
};

const CountrySearch = ({
  countries,
  onChange,
  selectedCountry
}: CountrySearchProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="body2">
          Country
        </Typography>
        <Select fullWidth onChange={onChange} value={selectedCountry}>
          {countries.map((country, i) => (
            <MenuItem key={i} value={country.name}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </CardContent>
    </Card>
  );
};
export default CountrySearch;
