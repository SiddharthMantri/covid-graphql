import {
  Card,
  makeStyles,
  CardContent,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import { ChangeEvent, ReactNode } from "react";
import { CountryRegion } from "../../types";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "100px",
  },
});

type CountrySearchProps = {
  countries: CountryRegion[];
  onChange: (
    event: ChangeEvent<{ name?: string; value: unknown }>,
    child: ReactNode
  ) => void;
  selectedCountry: string;
};

const CountrySearch = ({
  countries,
  onChange,
  selectedCountry,
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
