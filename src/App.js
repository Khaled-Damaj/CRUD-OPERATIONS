import React, { useEffect, useState } from "react";
import Header from "./component/Header/Header.js";
import {
  CssBaseline,
  Paper,
  Grid,
  Button,
  TextField,
  Container,
  Typography,
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Form from "./component/Form/Form";

import { chain, isEmpty } from "lodash";
import Table from "./component/Table/Table.js";
import { DateRange } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

const dummyData = [
  {
    id: 1,
    year: "2009",
    caza: "Beirut",
    marriages: 38857,
    divorces: 5717,
  },
  {
    id: 2,
    year: "2010",
    caza: "Bequaa",
    marriages: 39769,
    divorces: 5732,
  },
  {
    id: 3,
    year: "2011",
    caza: "Saida",
    marriages: 40232,
    divorces: 6122,
  },
  {
    id: 4,
    year: "2012",
    caza: "Saida",
    marriages: 36748,
    divorces: 6249,
  },
  {
    id: 5,
    year: "2013",
    caza: "Tripoli",
    marriages: 36037,
    divorces: 6398,
  },
  {
    id: 6,
    year: "2014",
    caza: "Chouf",
    marriages: 37342,
    divorces: 6898,
  },
  {
    id: 7,
    year: "2015",
    caza: "Jezzine",
    marriages: 37099,
    divorces: 7112,
  },
  {
    id: 8,
    year: "2016",
    caza: "South",
    marriages: 34849,
    divorces: 7173,
  },
  {
    id: 9,
    year: "2017",
    caza: "North",
    marriages: 37318,
    divorces: 7751,
  },
  {
    id: 10,
    year: "2018",
    caza: "Mount Lebanon",
    marriages: 36287,
    divorces: 7995,
  },
  {
    id: 11,
    year: "2019",
    caza: "Beirut",
    marriages: 34076,
    divorces: 7646,
  },
  {
    id: 12,
    year: "2020",
    caza: "Zahle",
    marriages: 29493,
    divorces: 6793,
  },
  {
    id: 13,
    year: "2021",
    caza: "Batroun",
    marriages: 33661,
    divorces: 7751,
  },
  {
    id: 14,
    year: "2022",
    caza: "Kesrwen",
    marriages: 32400,
    divorces: 7851,
  },
];

function App() {
  const [data, setData] = React.useState([]);
  const [filterYear, setFilterYear] = React.useState("All");
  const [filterCaza, setFilterCaza] = React.useState("");
  const [showAddData, setShowAddData] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState([]);
  const [updatedItem, setUpdatedItem] = React.useState([]);
  const years = ["All", ...Object.keys(chain(data).groupBy("year").value())];
  const caza = Object.keys(chain(data).groupBy("caza").value());
  const [showAlert, setShowAlert] = useState(false);
  const [updateOrAdded, setUpdateOrAdded] = useState(0); // 0 means updated ; 1 means added
  useEffect(() => {
    setData(dummyData);
    setFilteredData(dummyData);
  }, []);

  useEffect(() => {
    console.log(data);
    handleSearch();
  }, [data]);

  const handleSearch = () => {
    let sanitizedData = data;
    if (isEmpty(filterYear) && isEmpty(filterCaza)) {
      return;
    } else if (filterYear && filterCaza) {
      if (filterYear === "All") {
        sanitizedData = sanitizedData.filter(
          (item) => item.caza === filterCaza
        );
      } else {
        sanitizedData = sanitizedData.filter(
          (item) => item.caza === filterCaza && item.year === filterYear
        );
      }
    } else if (filterYear && isEmpty(filterCaza)) {
      if (filterYear === "All") {
        sanitizedData = sanitizedData;
      } else {
        sanitizedData = sanitizedData.filter(
          (item) => item.year === filterYear
        );
      }
    } else {
      sanitizedData = sanitizedData.filter((item) => item.caza === filterCaza);
    }
    setFilteredData(sanitizedData);
  };

  const handleDelete = (id) => {
    let newData = data.filter((item) => item.id !== id);
    let sanitezedData = filteredData.filter((item) => item.id !== id);
    setFilteredData(sanitezedData);
    setData(newData);
  };

  const handleUpdate = (id) => {
    let object = filteredData.filter((item) => item.id === id);
    if (!showAddData) {
      setShowAddData(true);
    }
    setUpdatedItem(object);
  };

  const handleAddNewData = (object) => {
    let index = data.filter((item) => item.id === object.id);
    console.log(index);
    if (index.length > 0) {
      console.log(object);
      let newArray = data.map((item) =>
        item.id === object.id
          ? {
              ...item,
              year: object.year,
              caza: object.caza,
              marriages: object.marriages,
              divorces: object.divorces,
            }
          : item
      );
      setData(newArray);
      setUpdatedItem([]);
      setUpdateOrAdded(0);
    } else {
      setData([{ id: data.length + 1, ...object }, ...data]);
      setUpdateOrAdded(1);
    }
    setShowAlert(true);
    handleSearch();
  };

  return (
    <>
      <CssBaseline />
      {showAlert && (
        <Alert
          severity="success"
          onClose={() => {
            setShowAlert(false);
          }}
        >
          <strong>
            {updateOrAdded === 1
              ? "Data added successfully"
              : "Your change have been successfully saved"}
          </strong>
        </Alert>
      )}
      <Paper variant="outlined">
        <Header
          onAdd={() => setShowAddData(!showAddData)}
          showAddData={showAddData}
        />
        {showAddData && (
          <Form
            onAddNewData={handleAddNewData}
            onUpdate={updatedItem}
            onCancel={() => {
              setUpdatedItem([]);
              setShowAddData(!showAddData);
            }}
          />
        )}
        <Container maxWidth="xl">
          <Paper elevation={2} style={{ margin: "20px 0", padding: 10 }}>
            <Typography variant="h5" style={{ padding: "10px" }}>
              Find By:
            </Typography>
            <Grid container spacing={3} style={{ padding: "10px 0" }}>
              <Grid item xs={12} sm={6} md={4}>
                <Autocomplete
                  disablePortal
                  variant="outlined"
                  value={filterYear}
                  onChange={(_, newValue) => {
                    if (newValue === null) {
                      newValue = "All";
                    }
                    setFilterYear(newValue);
                    console.log(newValue);
                  }}
                  options={years}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Year" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Autocomplete
                  disablePortal
                  variant="outlined"
                  onChange={(_, newValue) => {
                    if (newValue === null) {
                      newValue = "";
                    }
                    setFilterCaza(newValue);
                    console.log(newValue);
                  }}
                  options={caza}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Caza" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{
                    height: "100%",
                  }}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Table
            data={filteredData}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </Container>
      </Paper>
    </>
  );
}

export default App;
