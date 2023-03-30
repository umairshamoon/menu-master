import React, { useState } from "react";
import "./Signup.scss";
import { Grid, Tabs, Tab, Paper } from "@material-ui/core";
import AddUser from "../User/AddUser";
import { useHistory } from "react-router-dom";

const Signup = () => {
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
                <div className={"signup-title"}>Sign Up</div>
                <Paper style={{ marginBottom: "10px" }}>
                  <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    TabIndicatorProps={{
                      style: { background: "blue" },
                    }}
                    aria-label="tabs"
                    className={"tabs-styles"}
                  >
                    <Tab
                      label="Chef"
                      onClick={() => history.push("/signupChef")}
                    />
                    <Tab
                      label="Worker"
                      onClick={() => history.push("/signupWorker")}
                    />
                  </Tabs>
                </Paper>
                <AddUser type={"chef"} />
                <div
                  style={{
                    paddingTop: "10px",
                    marginLeft: "20px",
                  }}
                >
                  Already have an account?
                  <button
                    onClick={() => {
                      history.push("/loginChef");
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
                    Sign In
                  </button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Signup;
