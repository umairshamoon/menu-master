import { useEffect, useState } from "react";
import "./SignInForm.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton, InputAdornment } from "@material-ui/core";
import { Formik } from "formik";
import http from "../../../services/httpService";
import { useHistory } from "react-router-dom";
import SnackbarPop from "../../SharedComponents/SnackbarPop/SnackbarPop";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@material-ui/icons";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignInForm = ({ type }) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
        display: "block",
      },
    },
  }));
  const classes = useStyles();
  const handleClose = (event, reason) => {
    setOpen(false);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        enableReinitialize={true}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          values.type = type;
          http
            .post("/users/authenticate", values)
            .then((response) => {
              const user = JSON.stringify(response.data);
              localStorage.setItem("user", user);
              history.push("/dashboard");
            })
            .catch((error) => {
              setErrorResponse(error.response.data.message);
              setOpen(true);
            });
        }}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          resetForm,
          touched,
          handleBlur,
        }) => (
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div>
              <TextField
                required
                helperText={touched.email ? errors.email : ""}
                error={touched.email && errors.email}
                onBlur={handleBlur}
                name="email"
                id="email"
                label="Email"
                type="email"
                onChange={handleChange}
                variant="outlined"
              />
              <TextField
                helperText={touched.password ? errors.password : ""}
                error={touched.password && errors.password}
                onBlur={handleBlur}
                required
                name="password"
                id="password"
                label="Enter Password"
                type={showPassword ? "text" : "password"}
                data-testid="login_password"
                onChange={handleChange}
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
            </div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              data-testid="login-btn"
              style={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={"error"}>
            {errorResponse}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default SignInForm;
