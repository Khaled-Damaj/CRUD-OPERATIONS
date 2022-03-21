import React from "react";
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
  Checkbox,
} from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import ModeEditIcon from "@material-ui/icons/Edit";
import useStyles from "./style";
import { Alert } from "@material-ui/lab";

const DataTable = ({ data, onDelete, onUpdate }) => {
  const columns = ["ID", "Year", "Caza", "Marriages", "Divorces"];
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [checked, setChecked] = React.useState(false);

  const handleChangeCheckBox = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      {data.length > 0 ? (
        <>
          <TableContainer className={classes.tableContainer}>
            <Table className={classes.table} aria-label="Data table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>ID</TableCell>
                  <TableCell className={classes.tableHead}>Year</TableCell>
                  <TableCell className={classes.tableHead}>Caza</TableCell>
                  <TableCell className={classes.tableHead}>Marriages</TableCell>
                  <TableCell className={classes.tableHead}>Divorces</TableCell>
                  <TableCell className={classes.tableHead}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className={classes.tableCell}>
                        {row.id}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.year}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.caza}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.marriages}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.divorces}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Box className={classes.box}>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<ModeEditIcon />}
                            onClick={() => onUpdate(row.id)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={() => onDelete(row.id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Alert severity="error">No data available for this search</Alert>
      )}
    </Paper>
  );
};
export default DataTable;
