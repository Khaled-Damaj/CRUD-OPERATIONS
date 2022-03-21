import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  tableContainer: {
    borderRadius: 4,
    margin: "10px auto",
  },
  table: {
    tableLayout: "auto",
  },
  box: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  button: {
    margin: "5px 10px",
  },
  tableHead: {
    padding: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableCell: {
    padding: 8,
    textAlign: "center",
  },
}));
