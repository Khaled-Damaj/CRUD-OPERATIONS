import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import useStyles from "./style";
import React from "react";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";

const Header = ({ onAdd, showAddData }) => {
  const classes = useStyles();
  return (
    <Box style={{ backgroundColor: "#f7f7f7" }} elevation={2}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" style={{ flexGrow: 1, color: "#333" }}>
          CRUD Operations
        </Typography>
        <Button
          variant="contained"
          color={showAddData ? "secondary" : "primary"}
          style={{ color: "white" }}
          startIcon={
            showAddData ? (
              <RemoveCircleOutlineRoundedIcon />
            ) : (
              <AddCircleOutlineRoundedIcon />
            )
          }
          onClick={onAdd}
        >
          {showAddData ? "Close" : "Add new Data"}
        </Button>
      </Toolbar>
    </Box>
  );
};

export default Header;
