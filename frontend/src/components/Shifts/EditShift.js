import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  InputAdornment,
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

function EditShift(props) {
  const classes = useStyles();
  const [renderSnack, setRenderSnack] = useState();
  const [shift, setShift] = useState();
  const [workers, setWorkers] = useState([]);
  const id = props.match.params.id;
  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }
  useEffect(() => {
    http
      .get(`/shift/${id}`)
      .then((res) => {
        setShift(res.data);
      })
      .catch((err) => console.log(err));

    http.post("/users/getWorkers").then((response) => {
      setWorkers(response.data.user);
    });
  }, []);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    day: Yup.string().required("Day is required"),
    from: Yup.string().required("Starting time is required"),
    to: Yup.string().required("Ending time is required"),
  });
  return (
    <>
      {shift && (
        <Formik
          initialValues={{
            title: shift.title,
            day: shift.day,
            to: shift.to,
            from: shift.from,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            http
              .put(`/shift/${id}`, values)
              .then((response) => {
                setRenderSnack(
                  <SnackbarPop
                    isOpen={true}
                    message={"Shift Updated"}
                    target={"/shifts"}
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
                onKeyDown={onKeyDown}
                onSubmit={handleSubmit}
              >
                <div
                  className={classes.formHeader}
                  style={{ marginLeft: "30%" }}
                >
                  Shift Form
                </div>

                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      required={true}
                      helperText={touched.title ? errors.title : ""}
                      error={touched.title && errors.title}
                      onBlur={handleBlur}
                      name="title"
                      id="title"
                      label="Title"
                      type="text"
                      onChange={handleChange}
                      className={classes.textField}
                      variant="outlined"
                      defaultValue={shift.title}
                    />
                    <TextField
                      required={true}
                      helperText={touched.day ? errors.day : ""}
                      error={touched.day && errors.day}
                      onBlur={handleBlur}
                      name="day"
                      id="day"
                      label="Day"
                      type="text"
                      select
                      onChange={handleChange}
                      className={classes.textField}
                      variant="outlined"
                      defaultValue={shift.day}
                    >
                      <MenuItem value="sunday">Sunday</MenuItem>
                      <MenuItem value="monday">Monday</MenuItem>
                      <MenuItem value="tuesday">Tuesday</MenuItem>
                      <MenuItem value="wednesday">Wednesday</MenuItem>
                      <MenuItem value="thursday">Thursday</MenuItem>
                      <MenuItem value="friday">Friday</MenuItem>
                      <MenuItem value="saturday">Saturday</MenuItem>
                    </TextField>

                    <TextField
                      required={true}
                      helperText={touched.from ? errors.from : ""}
                      error={touched.from && errors.from}
                      onBlur={handleBlur}
                      name="from"
                      id="from"
                      type="time"
                      onChange={handleChange}
                      className={classes.textField}
                      variant="outlined"
                      ampm={true}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">From</InputAdornment>
                        ),
                      }}
                      defaultValue={shift.from}
                    />

                    <TextField
                      required={true}
                      helperText={touched.to ? errors.to : ""}
                      error={touched.to && errors.to}
                      onBlur={handleBlur}
                      name="to"
                      id="to"
                      type="time"
                      onChange={handleChange}
                      className={classes.textField}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">To</InputAdornment>
                        ),
                      }}
                      defaultValue={shift.to}
                    />
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
      )}
      {renderSnack}
    </>
  );
}
export default EditShift;
