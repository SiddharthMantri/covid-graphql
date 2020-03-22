import React from "react";
import { Summary } from "../../state/useDashboardState";
import { makeStyles, Grid } from "@material-ui/core";
import SummaryCard from "../SummaryCard";

export type ProvinceDataProps = {
  regional: Summary[];
};

const useStyles = makeStyles({
  root: {
    padding: "16px"
  }
});

const ProvinceData = ({ regional }: ProvinceDataProps) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {regional.map((regionalData, i) => (
        <Grid item xs={12} lg={3} key={i}>
          <SummaryCard
            {...regionalData}
            title={`Summary for ${regionalData.provinceState}`}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default ProvinceData;
