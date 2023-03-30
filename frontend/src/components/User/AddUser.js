import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Formik } from "formik";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import SnackbarPop from "../SharedComponents/SnackbarPop/SnackbarPop";
import axios from "axios";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import validationSchema from "./validation";

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

const STATES = [
  "Baden-Württemberg",
  " Bavaria",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hesse",
  "Mecklenburg-Vorpommern",
  "Lower Saxony",
  "North Rhine-Westphalia",
  "Rhineland-Palatinate",
  "Saarland",
  "Saxony-Anhalt",
  "Saxony",
  "Schleswig-Holstein",
  "Thuringia",
];
const ROLES = [
  "Cooks",
  "Dishwasher",
  "Kitchen Helper",
  "waiter",
  "cleaning person",
  "manager",
  "others",
];

function AddUser({ type = "worker" }) {
  const classes = useStyles();
  const [renderSnack, setRenderSnack] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [imgFlag, setImgFlag] = useState(false);
  const [phoneFlag, setPhoneFlag] = useState(false);
  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }
  const initialValues = {
    fName: "",
    lName: "",
    email: "",
    contractType: "",
    designation: "",
    salary: "",
    password: "",
    phoneNumber: phoneNumber,
    house: "",
    street: "",
    postalCode: "",
    state: "",
    city: "",
    image: null,
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (!phoneNumber) return setPhoneFlag(true);
          if (!values.image) return setImgFlag(true);
          setImgFlag(false);
          setPhoneFlag(false);
          const formData = new FormData();
          formData.append("fName", values.fName);
          formData.append("lName", values.lName);
          formData.append("email", values.email);
          formData.append("contractType", values.contractType);
          formData.append("designation", values.designation);
          formData.append("salary", values.salary);
          formData.append("password", values.password);
          formData.append("phoneNumber", phoneNumber);
          formData.append("house", values.house);
          formData.append("street", values.street);
          formData.append("postalCode", values.postalCode);
          formData.append("state", values.state);
          formData.append("city", values.city);
          formData.append("image", values.image);
          formData.append("type", type);

          axios({
            method: "POST",
            url: "/users/register",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: formData,
          })
            .then((res) => {
              setRenderSnack(
                <SnackbarPop
                  isOpen={true}
                  message={res.data}
                  target={"/workersList"}
                  severity={"success"}
                />
              );
            })
            .catch((error) => {
              setRenderSnack(
                <SnackbarPop
                  isOpen={true}
                  message={JSON.stringify(error?.response?.data?.message)}
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
              <div className={classes.formHeader}>Personal Information</div>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    required={true}
                    helperText={touched.fName ? errors.fName : ""}
                    error={touched.fName && errors.fName}
                    onBlur={handleBlur}
                    name="fName"
                    id="fName"
                    label="First Name"
                    type="text"
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                  />
                  <TextField
                    required={true}
                    helperText={touched.lName ? errors.lName : ""}
                    error={touched.lName && errors.lName}
                    onBlur={handleBlur}
                    name="lName"
                    id="lName"
                    label="Last Name"
                    type="text"
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                  />
                  <MaterialUiPhoneNumber
                    defaultCountry={"de"}
                    // onBlur={handleBlur}
                    id="phoneNumber"
                    label="Phone Number"
                    onChange={(e) => {
                      setPhoneNumber(e);
                      if (phoneNumber) setPhoneFlag(false);
                      else setPhoneFlag(true);
                    }}
                    className={classes.textField}
                    variant="outlined"
                    name="phoneNumber"
                  />
                  {phoneFlag && (
                    <div style={{ color: "red" }}>Phone Number is Required</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    required={true}
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && errors.email}
                    onBlur={handleBlur}
                    name="email"
                    id="email"
                    label="Email"
                    type="text"
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                  />
                  {/*    <TextField
                    required={true}
                    helperText={touched.username ? errors.username : ""}
                    error={touched.username && errors.username}
                    onBlur={handleBlur}
                    name="username"
                    id="username"
                    label="Username"
                    type="text"
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                  />*/}

                  <TextField
                    required={true}
                    name="image"
                    id="image"
                    type="file"
                    className={classes.textField}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">Picture</InputAdornment>
                      ),
                    }}
                    onChange={(e) => {
                      setFieldValue("image", e.currentTarget.files[0]);
                      setImgFlag(false);
                    }}
                  />
                  {imgFlag && <div style={{ color: "red" }}>upload image</div>}
                </Grid>
              </Grid>
              <div className={classes.formHeader}>Address</div>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    required={true}
                    helperText={touched.house ? errors.house : ""}
                    error={touched.house && errors.house}
                    onBlur={handleBlur}
                    name="house"
                    id="house"
                    label="House"
                    type="text"
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                  />
                  <TextField
                    required={true}
                    helperText={touched.street ? errors.street : ""}
                    error={touched.street && errors.street}
                    onBlur={handleBlur}
                    name="street"
                    id="street"
                    label="Street"
                    type="text"
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                  />
                  <TextField
                    required={true}
                    helperText={touched.postalCode ? errors.postalCode : ""}
                    error={touched.postalCode && errors.postalCode}
                    onBlur={handleBlur}
                    name="postalCode"
                    id="postalCode"
                    label="Postal Code"
                    type="text"
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    required={true}
                    helperText={touched.state ? errors.state : ""}
                    error={touched.state && errors.state}
                    onBlur={handleBlur}
                    name="state"
                    id="state"
                    label="State"
                    type="text"
                    select
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                  >
                    {STATES.map((s) => (
                      <MenuItem value={s}>{s}</MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    required={true}
                    helperText={touched.city ? errors.city : ""}
                    error={touched.city && errors.city}
                    onBlur={handleBlur}
                    name="city"
                    id="city"
                    label="City"
                    type="text"
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <div className={classes.formHeader}>Job Description</div>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    required={true}
                    helperText={touched.contractType ? errors.contractType : ""}
                    error={touched.contractType && errors.contractType}
                    onBlur={handleBlur}
                    name="contractType"
                    id="contractType"
                    label="Contract Type"
                    type="text"
                    select
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                  >
                    <MenuItem value="internship">Internship</MenuItem>
                    <MenuItem value="permanent">Permanent</MenuItem>
                  </TextField>

                  <TextField
                    required={true}
                    helperText={touched.designation ? errors.designation : ""}
                    error={touched.designation && errors.designation}
                    onBlur={handleBlur}
                    name="designation"
                    id="designation"
                    label="Designation"
                    type="text"
                    select
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                  >
                    {ROLES.map((role) => (
                      <MenuItem value={role}>{role}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    required={true}
                    helperText={touched.salary ? errors.salary : ""}
                    error={touched.salary && errors.salary}
                    onBlur={handleBlur}
                    name="salary"
                    id="salary"
                    label="Salary ex:10"
                    type="text"
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                  />
                  <TextField
                    required={true}
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && errors.password}
                    onBlur={handleBlur}
                    name="password"
                    id="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    className={classes.textField}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
                    marginLeft: "38%",
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
export default AddUser;
