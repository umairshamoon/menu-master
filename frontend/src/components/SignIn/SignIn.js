import React, { useState } from "react";
import "./SignIn.scss";
import { Grid, AppBar, Tabs, Tab } from "@material-ui/core";
import SignInForm from "./SignInForm/SignInForm";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const history = useHistory();
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <>
      <div className={"signup-container"}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div></div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "100vh" }}
            >
              <div style={{ alignItem: "left" }}>
                <div className={"signIn-title"}>Sign In</div>
                <Grid>
                  <AppBar position="static" color="default">
                    <Tabs
                      value={tabValue}
                      onChange={handleChange}
                      TabIndicatorProps={{
                        style: { background: "blue" },
                      }}
                      aria-label="tabs"
                      style={{ backgroundColor: "unset" }}
                    >
                      <Tab
                        label="Chef"
                        onClick={() => history.push("/loginChef")}
                      />
                      <Tab
                        label="Worker"
                        onClick={() => history.push("/loginWorker")}
                      />
                    </Tabs>
                  </AppBar>
                  <SignInForm type={"chef"} />
                  <div style={{ paddingTop: "10px" }}>
                    Don't have an account?
                    <button
                      onClick={() => {
                        history.push("/signupChef");
                      }}
                      style={{
                        textDecoration: "none",
                        background: "none",
                        border: "none",
                        fontSize: "18px",
                        color: "blue",
                        cursor: "pointer",
                      }}
                    >
                      Sign Up
                    </button>
                  </div>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default SignIn;
