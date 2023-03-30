import React, { useEffect, useState } from "react";
import { makeStyles, alpha } from "@material-ui/core/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom";
import { tokens } from "../Themes";
import { Delete, Edit, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Button, useTheme } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
import http from "../../services/httpService";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    padding: "10px",
    color: theme.palette.primary.main,
  },
}));

const List = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const history = useHistory();
  const classes = useStyles();
  const [restaurants, setRestaurants] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionId, setActionId] = useState(null);
  const userType = JSON.parse(localStorage.getItem("user")).type;
  useEffect(() => {
    http.get("/restaurant").then((res) => {
      setRestaurants(res.data);
    });
  }, []);
  const handleEdit = (event, id) => {
    history.push(`/editRecipe${id}`);
  };
  const handleView = (event, id) => {
    history.push(`/recipeView${id}`);
  };
  const handleDelete = (event, id) => {
    http.delete(`/restaurants/${id}`).then((res) => {
      alert("Recipe deleted");
      http.get("/restaurants/").then((res) => {
        setRestaurants(res.data);
        setAnchorEl(null);
      });
    });
  };
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "left",
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 1,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Restaurants
      </Typography>
      <div style={{ padding: "2px", marginBottom: "1.5rem" }}>
        <Button
          variant="contained"
          color="primary"
          data-testid="Add-btn"
          onClick={() => {
            history.push("/addRestaurant");
          }}
        >
          + Add Restaurant
        </Button>
      </div>
      <Box
        m="4px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[400],
            color: "white",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.blueAccent[400],
            color: "white",
            fontWeight: "bold",
          },
          [`& .${gridClasses.row}.even`]: {
            backgroundColor: theme.palette.grey[200],
            "&:hover, &.Mui-hovered": {
              backgroundColor: alpha(theme.palette.primary.main, 0.4),
              "@media (hover: none)": {
                backgroundColor: "transparent",
              },
            },
            "&.Mui-selected": {
              backgroundColor: alpha(
                theme.palette.primary.main,
                0.4 + theme.palette.action.selectedOpacity
              ),
              "&:hover, &.Mui-hovered": {
                backgroundColor: alpha(
                  theme.palette.primary.main,
                  0.4 +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity
                ),
                "@media (hover: none)": {
                  backgroundColor: alpha(
                    theme.palette.primary.main,
                    10 + theme.palette.action.selectedOpacity
                  ),
                },
              },
            },
          },
        }}
      >
        <DataGrid
          rows={restaurants}
          columns={columns}
          showCellRightBorder={true}
          hideFooterSelectedRowCount
          getRowId={(row) => row._id}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />
      </Box>
    </>
  );
};

export default List;
