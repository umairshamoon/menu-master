import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "../components/SharedComponents/Sidebar/Sidebar";
import Signup from "../components/Signup/Signup";
import SignupWorker from "../components/Signup/SignupWorker";
import SignIn from "../components/SignIn/SignIn";
import SignInWorker from "../components/SignIn/SignInWorker";
import Recipe from "../components/Recipe/Recipe";
import Dashboard from "../components/Dashboard/Dashboard";
import RecipesList from "../components/RecipesList/RecipesList";
import RecipeView from "../components/RecipeView/RecipeView";
import ChefsList from "../components/ChefsList/ChefsList";
import WorkersList from "../components/WorkersList/WorkersList";
import PrivateRoute from "../components/ProtectedRoutes/ProtectedRoute";
import RecipeEditForm from "../components/Recipe/RecipeEditForm/RecipeEditForm";
import EditChef from "../components/EditChef/EditChef";
import Ingredients from "../components/Ingredients/Ingredients";
import IngredientView from "../components/Ingredients/IngredientView/IngredientView";
import AddIngredient from "../components/Ingredients/AddIngredient/AddIngredient";
import EditIngredient from "../components/Ingredients/EditIngredient/EditIngredient";
import AddUser from "../components/User/AddUser";
import ViewUser from "../components/User/ViewUser";
import EditUser from "../components/User/EditUser";
import AddOrder from "../components/Orders/AddOrder";
import EditOrder from "../components/Orders/EditOrder";
import ViewOrder from "../components/Orders/ViewOrder";
import Order from "../components/Orders/Order";
import Shifts from "../components/Shifts/Shifts";
import AddShift from "../components/Shifts/AddShift";
import ViewShift from "../components/Shifts/ViewShift";
import EditShift from "../components/Shifts/EditShift";
import RestaurantsList from "../components/Restaurants/List";
import RestaurantsForm from "../components/Restaurants/Create";
import Profile from "../components/Profile/Profile";

//
//Add new routes below
const Routing = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/signupChef" component={Signup} />
          <Route path="/signupWorker" component={SignupWorker} />
          <Route path="/loginChef" component={SignIn} />
          <Route path="/loginWorker" component={SignInWorker} />
          <Route exact path="/" component={SignIn} />
          <Fragment>
            <Sidebar>
              <PrivateRoute path="/createRecipe" component={Recipe} />
              <PrivateRoute path="/editRecipe:id" component={RecipeEditForm} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/recipesList" component={RecipesList} />
              <PrivateRoute path="/recipeView:id" component={RecipeView} />
              <PrivateRoute path="/chefsList" component={ChefsList} />
              <PrivateRoute path="/editChefs" component={ChefsList} />
              <PrivateRoute path="/workersList" component={WorkersList} />
              <PrivateRoute path="/edit/:type/:id" component={EditChef} />
              <PrivateRoute path="/user/form" component={AddUser} />
              <PrivateRoute path="/userView/:id" component={ViewUser} />
              <PrivateRoute path="/userEdit/:id" component={EditUser} />
              <PrivateRoute path="/ingredients" component={Ingredients} />
              <PrivateRoute
                path="/ingredientView:id"
                component={IngredientView}
              />
              <PrivateRoute path="/addIngredient" component={AddIngredient} />
              <PrivateRoute
                path="/editIngredient:id"
                component={EditIngredient}
              />
              <PrivateRoute path="/orders" component={Order} />
              <PrivateRoute path="/viewOrder/:id" component={ViewOrder} />
              <PrivateRoute path="/addOrder" component={AddOrder} />
              <PrivateRoute path="/editOrder:id" component={EditOrder} />
              <PrivateRoute path="/shifts" component={Shifts} />
              <PrivateRoute path="/shift/form" component={AddShift} />
              <PrivateRoute path="/shift/:id" component={ViewShift} />
              <PrivateRoute path="/shift/edit/:id" component={EditShift} />
              <PrivateRoute path="/profile" component={Profile} />
              {/* Restaurants*/}
              <PrivateRoute path="/restaurants" component={RestaurantsList} />
              <PrivateRoute path="/addRestaurant" component={RestaurantsForm} />
            </Sidebar>
          </Fragment>
        </Switch>
      </div>
    </Router>
  );
};

export default Routing;
