import {
  Card,
  CardContent,
  makeStyles,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import React, { useMemo } from "react";
import { DateRecord } from "../../../../shared";
import { useTable, useSortBy } from "react-table";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "100%",
    maxHeight: "480px",
    minHeight: "480px",
    padding: "0px 0px 8px 0px"
  },
  cardContent: {
    padding: "0px"
  },
  table: {
    minWidth: "100%"
  },
  padded: {
    padding: "16px 16px 8px 16px"
  }
}));

type CountryListProps = {
  columns?: Array<{ Header: string; accessor: string }>;
  data: DateRecord[];
};

const RecordTable = ({ columns, data }: CountryListProps) => {
  const sortBy = useMemo(() => [{ id: "confirmed", desc: true }], []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy
      }
    },
    useSortBy
  );

  return (
    <TableContainer style={{ maxHeight: 416 }}>
      <Table stickyHeader {...getTableProps()} size="small">
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
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
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => (
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

const CountryList = ({ columns, data }: CountryListProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" id="tableTitle" className={classes.padded}>
            Countries
          </Typography>
          <RecordTable columns={columns} data={data} />
        </CardContent>
      </div>
    </Card>
  );
};

export default CountryList;
