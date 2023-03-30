import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import DetailCard from "../SharedComponents/DetialsCard/DetailCard";
import "./Dashboard.scss";
import Typography from "@material-ui/core/Typography";
// import StatusCard from "../SharedComponents/StatusCard/StatusCard";
import { useHistory } from "react-router-dom";
import http from "../../services/httpService";

const Dashboard = () => {
  const history = useHistory();
  const [recipes, setRecipes] = useState();
  const [workers, setWorkers] = useState();
  const [chefs, setChefs] = useState();
  const [restaurants, setResrestaurants] = useState();

  const userName = JSON.parse(localStorage.getItem("user")).fName;
  const userType = JSON.parse(localStorage.getItem("user")).type;

  useEffect(() => {
    http.post("/users/getWorkers", { type: "worker" }).then((response) => {
      const workers = response.data;
      setWorkers(workers.user);

      http.post("/users/getChefs", { type: "chef" }).then((response) => {
        const chefs = response.data;
        setChefs(chefs.user);
      });
    });

    http.get("/recipes/").then((response) => {
      setRecipes(response.data);
    });

    http.get("/restaurant/").then((response) => {
      setResrestaurants(response.data);
    });
  }, []);

  return (
    <div className={"dashboard-container"}>
      <Typography
        variant="h4"
        component="h2"
        data-testid="dashboard"
        id="welcome"
      >
        Welcome back, {userName}
      </Typography>
      <div style={{ paddingTop: "20px" }}>
        {userType === "chef" ? (
          <Button
            variant="contained"
            color="primary"
            data-testid="Add-btn"
            onClick={() => {
              history.push("/createRecipe");
            }}
          >
            + Create Dish
          </Button>
        ) : (
          ""
        )}
      </div>
      <div style={{ paddingTop: "40px" }}>
        {userType === "chef" && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DetailCard
                title={"Dishes"}
                bgColor={"#FCB801"}
                fontColor={"white"}
                count={recipes?.length}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailCard
                title={"Chefs"}
                bgColor={"#0F5EF7"}
                fontColor={"white"}
                count={chefs?.length}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailCard
                title={"Workers"}
                bgColor={"#0F5EF7"}
                fontColor={"white"}
                count={workers?.length}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailCard
                title={"Restaurants"}
                bgColor={"#FCB801"}
                fontColor={"white"}
                count={restaurants?.length}
              />
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
