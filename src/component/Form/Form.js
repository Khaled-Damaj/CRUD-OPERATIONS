import {
  Box,
  Container,
  TextField,
  Grid,
  Button,
  IconButton,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import ClearIcon from "@material-ui/icons/Clear";

const Form = ({ onAddNewData, onUpdate, onCancel }) => {
  const [year, setYear] = useState("");
  const [caza, setCaza] = useState("");
  const [marriages, setMarriages] = useState("");
  const [divorces, setDivorces] = useState("");

  const [yearError, setYearError] = useState({ error: false, helperText: "" });
  const [cazaError, setCazaError] = useState({ error: false, helperText: "" });
  const [marriagesError, setMarriagesError] = useState({
    error: false,
    helperText: "",
  });
  const [divorcesError, setDivorcesError] = useState({
    error: false,
    helperText: "",
  });

  useEffect(() => {
    if (onUpdate.length > 0) {
      setYear(onUpdate[0].year);
      setCaza(onUpdate[0].caza);
      setMarriages(onUpdate[0].marriages);
      setDivorces(onUpdate[0].divorces);
    } else {
      setYear("");
      setCaza("");
      setMarriages("");
      setDivorces("");
    }
  }, [onUpdate]);

  function yearValidation(year) {
    let pattern = /^[0-9]+$/;
    if (year !== "" && !pattern.test(year)) {
      console.log(1);
      setYearError({
        error: true,
        helperText: "Please Enter Numeric Values Only",
      });
      return false;
    }

    if (year.length !== 4) {
      console.log(1);
      setYearError({
        error: true,
        helperText: "Year is not proper. Please check",
      });
      return false;
    }

    let current_year = new Date().getFullYear();

    if (year > current_year) {
      setYearError({
        error: true,
        helperText: "Year is greater then the current year",
      });
      return false;
    }
    return true;
  }

  function checkString(input) {
    let pattern = /^[A-Za-z]+$/;
    if (!input.match(pattern)) {
      setCazaError({
        error: true,
        helperText: "Please Enter a valid caza",
      });
      return false;
    }
    return true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!yearValidation(year) || !checkString(caza)) {
      return;
    }

    if (isNaN(marriages)) {
      setMarriagesError({
        error: true,
        helperText: "Please Enter Numeric value only!",
      });
      return;
    }

    if (isNaN(divorces)) {
      setDivorcesError({
        error: true,
        helperText: "Please Enter Numeric value only!",
      });
      return;
    }

    if (onUpdate.length > 0) {
      onAddNewData({
        id: onUpdate[0].id,
        year: year,
        caza: caza,
        marriages: marriages,
        divorces: divorces,
      });
    } else {
      onAddNewData({
        year: year,
        caza: caza,
        marriages: marriages,
        divorces: divorces,
      });
    }
    setYear("");
    setCaza("");
    setMarriages("");
    setDivorces("");
    setYearError({
      error: false,
      helperText: "",
    });
    setCazaError({
      error: false,
      helperText: "",
    });
    setMarriagesError({
      error: false,
      helperText: "",
    });
    setDivorcesError({
      error: false,
      helperText: "",
    });
  };

  const addNewData = () => {};

  return (
    <Container maxWidth="xl" style={{ backgroundColor: "#f7f7f7" }}>
      <Box component="form" onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              required
              error={yearError.error ? true : false}
              helperText={yearError.error ? yearError.helperText : ""}
              fullWidth
              variant="outlined"
              id="year"
              label="Year"
              value={year}
              onChange={(e) => {
                if (e.target.value === null) {
                  e.target.value = "";
                }
                setYear(e.target.value);
              }}
              placeholder="Enter a year"
              InputProps={{
                endAdornment: year ? (
                  <IconButton size="small" onClick={() => setYear("")}>
                    <ClearIcon />
                  </IconButton>
                ) : undefined,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              required
              error={cazaError.error ? true : false}
              helperText={cazaError.error ? cazaError.helperText : ""}
              variant="outlined"
              id="caza"
              value={caza}
              label="Caza"
              onChange={(e) => {
                if (e.target.value === null) {
                  e.target.value = "";
                }
                setCaza(e.target.value);
              }}
              placeholder="Enter a caza"
              InputProps={{
                endAdornment: caza ? (
                  <IconButton size="small" onClick={() => setCaza("")}>
                    <ClearIcon />
                  </IconButton>
                ) : undefined,
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              required
              error={marriagesError.error ? true : false}
              helperText={marriagesError.error ? marriagesError.helperText : ""}
              variant="outlined"
              id="marriages"
              value={marriages}
              placeholder="Enter the total marriages"
              onChange={(e) => {
                if (e.target.value === null) {
                  e.target.value = "";
                }
                setMarriages(e.target.value);
              }}
              label="Marriages"
              InputProps={{
                endAdornment: marriages ? (
                  <IconButton size="small" onClick={() => setMarriages("")}>
                    <ClearIcon />
                  </IconButton>
                ) : undefined,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              required
              variant="outlined"
              id="divorces"
              error={divorcesError.error ? true : false}
              helperText={divorcesError.error ? divorcesError.helperText : ""}
              label="Divorces"
              value={divorces}
              onChange={(e) => {
                if (e.target.value === null) {
                  e.target.value = "";
                }
                setDivorces(e.target.value);
              }}
              placeholder="Enter the total divorces"
              InputProps={{
                endAdornment: divorces ? (
                  <IconButton size="small" onClick={() => setDivorces("")}>
                    <ClearIcon />
                  </IconButton>
                ) : undefined,
              }}
            />
          </Grid>
        </Grid>

        {onUpdate.length > 0 ? (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                style={{
                  backgroundColor: "#333",
                  color: "white",
                  margin: "10px 0px",
                }}
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Button
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: "#333",
                  color: "white",
                  margin: "10px 0px",
                }}
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Button
            fullWidth
            variant="contained"
            type="submit"
            style={{
              backgroundColor: "#333",
              color: "white",
              margin: "10px 0px",
            }}
          >
            Add new Data
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Form;
