import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField } from "@material-ui/core";
import { Formik } from "formik";
import http from "../../services/httpService";
import SnackbarPop from "../SharedComponents/SnackbarPop/SnackbarPop";
import MaterialUiPhoneNumber from "material-ui-phone-number";

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

function Create() {
  const classes = useStyles();
  const [renderSnack, setRenderSnack] = useState();
  const [contact, setContact] = useState("");
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          contact: contact,
          address: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Restaurant Name is Required"),
          address: Yup.string().required("Restaurant Address is Required"),
        })}
        onSubmit={(values) => {
          values.contact = contact;
          http
            .post("/restaurant/add", values)
            .then((response) => {
              setRenderSnack(
                <SnackbarPop
                  isOpen={true}
                  message={response.data.message}
                  target={"/restaurants"}
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
          return (
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className={classes.formHead} style={{ marginLeft: "30%" }}>
                Restaurant Form
              </div>

              <Grid container spacing={5}>
                <TextField
                  required={true}
                  helperText={touched.name ? errors.name : ""}
                  error={touched.name && errors.name}
                  onBlur={handleBlur}
                  name="name"
                  id="name"
                  label="Name"
                  type="text"
                  onChange={handleChange}
                  className={classes.textField}
                  variant="outlined"
                />
                <TextField
                  required={true}
                  helperText={touched.address ? errors.address : ""}
                  error={touched.address && errors.address}
                  onBlur={handleBlur}
                  address="address"
                  id="address"
                  label="Address"
                  type="text"
                  onChange={handleChange}
                  className={classes.textField}
                  variant="outlined"
                />
                <MaterialUiPhoneNumber
                  defaultCountry={"de"}
                  id="contact"
                  label="Contact"
                  onChange={(e) => {
                    setContact(e);
                  }}
                  className={classes.textField}
                  variant="outlined"
                  name="contact"
                />
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
export default Create;
