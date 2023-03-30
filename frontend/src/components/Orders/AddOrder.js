import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Formik } from "formik";
import http from "../../services/httpService";

import SnackbarPop from "../SharedComponents/SnackbarPop/SnackbarPop";

import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  form: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px #ccc",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "90%",
      margin: "0 auto",
    },
  },
  formHead: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    padding: "10px",
    color: "black",
  },
  formHeader: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    padding: "10px",
    color: theme.palette.primary.main,
  },
  textField: {
    width: "100%",
    margin: "10px 0",
  },
  datePicker: {
    width: "100%",
    margin: "10px 0",
    "& .MuiInputBase-root": {
      borderColor: theme.palette.secondary.main,
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.dark,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
}));

function AddOrder() {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);
  const [renderSnack, setRenderSnack] = useState();

  useEffect(() => {
    http.get("/recipes/").then((response) => {
      setRecipes(response.data);
    });
  }, []);

  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          details: [{ recpieId: "", quantity: "", addtionalDetails: "" }],
        }}
        onSubmit={(values, { setSubmitting }) => {
          http
            .post("/order/add", values)
            .then((response) => {
              setRenderSnack(
                <SnackbarPop
                  isOpen={true}
                  message={response.data}
                  target={"/orders"}
                  severity={"success"}
                />
              );
            })
            .catch((error) => {
              setRenderSnack(
                <SnackbarPop
                  isOpen={true}
                  message={JSON.stringify(error.response.data.message)}
                  severity={"error"}
                />
              );
            });
        }}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          handleBlur,
          touched,
          values,
          errors,
        }) => {
          const { details } = values;
          const handleValueChange = (value, index, name) => {
            let previousValues = [...details];
            previousValues[index][name] = value;
            setFieldValue("details", previousValues);
          };
          const handleAddRow = () => {
            setFieldValue("details", [
              ...details,
              {
                recpieId: "",
                quantity: "",
                additionalDetails: "",
              },
            ]);
          };
          return (
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onKeyDown={onKeyDown}
              onSubmit={handleSubmit}
            >
              <div className={classes.formHead} style={{ marginLeft: "30%" }}>
                Order Form
              </div>

              <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={6}>
                  {details && details.length
                    ? details.map((row, rowIndex) => {
                        return (
                          <FormGroup>
                            <div className={classes.formHeader}>
                              Select a Dish
                            </div>
                            <Grid container spacing={2} key={rowIndex}>
                              <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                  required={true}
                                  name="recpieId"
                                  id="recpieId"
                                  label="Item"
                                  type="text"
                                  select
                                  onChange={(e) =>
                                    handleValueChange(
                                      e.target.value,
                                      rowIndex,
                                      "recpieId"
                                    )
                                  }
                                  className={classes.textField}
                                  variant="outlined"
                                >
                                  {recipes.map((i) => {
                                    return (
                                      <MenuItem value={i.id}>
                                        {i.recipeName}
                                      </MenuItem>
                                    );
                                  })}
                                </TextField>
                              </Grid>
                              <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                  required={true}
                                  onBlur={handleBlur}
                                  name="quantity"
                                  id="quantity"
                                  label="Quantity"
                                  type="text"
                                  className={classes.textField}
                                  variant="outlined"
                                  onChange={(e) =>
                                    handleValueChange(
                                      e.target.value,
                                      rowIndex,
                                      "quantity"
                                    )
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                  required={true}
                                  onBlur={handleBlur}
                                  name="additionalDetails"
                                  id="additionalDetails"
                                  label="Additional Details"
                                  type="text"
                                  className={classes.textField}
                                  variant="outlined"
                                  onChange={(e) =>
                                    handleValueChange(
                                      e.target.value,
                                      rowIndex,
                                      "additionalDetails"
                                    )
                                  }
                                />
                              </Grid>
                            </Grid>
                          </FormGroup>
                        );
                      })
                    : null}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddRow}
                    className={classes.button}
                  >
                    Add More +
                  </Button>
                </Grid>
              </Grid>
              <div style={{ paddingTop: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  data-testid="Publish-btn"
                  style={{
                    marginLeft: "25%",
                    width: "200px",
                    height: "50px",
                  }}
                >
                  Submit
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
      {renderSnack}
    </>
  );
}
export default AddOrder;
