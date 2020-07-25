import {
  Card,
  CardContent,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@material-ui/core";
import React, { useMemo } from "react";
import { useSortBy, useTable, useFilters } from "react-table";
import { DateRecord } from "../..";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    maxHeight: "480px",
    minHeight: "480px",
    padding: "0px 0px 8px 0px",
  },
  cardContent: {
    padding: "0px",
  },
  table: {
    minWidth: "100%",
  },
  padded: {
    padding: "16px 16px 8px 16px",
  },
  tableRow: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

type CountryListProps = {
  columns?: Array<{ Header: string; accessor: string }>;
  data: DateRecord[];
  onClickCountry: (country: string) => void;
};

const RecordTable = ({
  columns,
  data = [],
  onClickCountry,
}: CountryListProps) => {
  const { tableRow } = useStyles();
  const sortBy = useMemo(() => [{ id: "confirmed", desc: true }], []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy,
      },
    },
    useFilters,
    useSortBy
  );

  return (
    <TableContainer style={{ maxHeight: 416 }}>
      <Table stickyHeader {...getTableProps()} size="small">
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  align={column.align}
                >
                  <TableSortLabel
                    active={column.isSorted}
                    direction={column.isSortedDesc ? "desc" : "asc"}
                  >
                    {column.render("Header")}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow
                {...row.getRowProps()}
                onClick={() => {
                  onClickCountry(row.original.countryRegion);
                }}
                className={tableRow}
              >
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()} align={cell.column.align}>
                    {isNaN(cell.value)
                      ? cell.render("Cell")
                      : new Intl.NumberFormat("en-US").format(cell.value)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CountryList = ({ columns, data, onClickCountry }: CountryListProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" id="tableTitle" className={classes.padded}>
            Countries
          </Typography>
          <RecordTable
            columns={columns}
            data={data}
            onClickCountry={onClickCountry}
          />
        </CardContent>
      </div>
    </Card>
  );
};

export default CountryList;
