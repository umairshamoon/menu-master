import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles, alpha, useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import http from "../../services/httpService";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { tokens } from "../Themes";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const useStyles = makeStyles((themes) => ({
  table: {
    minWidth: 650,
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    padding: "10px",
    color: themes.palette.primary.main,
  },

  headerCell: {
    fontWeight: "bold",
    color: "blue",
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#def2ff",
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  },
}));
const ViewOrder = (props) => {
  const id = props.match.params.id;
  const history = useHistory();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const classes = useStyles();
  const [order, setOrder] = useState();
  const [recpies, setRecpies] = useState([]);
  const handleView = (event, id) => {
    history.push(`/recipeView${id}`);
  };
  const columns = [
    {
      field: "recpieId",
      headerName: "Recpie ID",
      flex: 1,
      headerAlign: "center",
      align: "left",
      headerClass: classes.headerCell,
      renderCell: (p) => {
        return <div>{p?.row?.recpieId?.id}</div>;
      },
    },
    {
      field: "recpie",
      headerName: "Dishes",
      flex: 1,
      headerAlign: "center",
      align: "left",
      headerClass: classes.headerCell,
      renderCell: (p) => {
        return <div>{p?.row?.recpieId?.recipeName}</div>;
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (p) => {
        return <div>{p.row.quantity}</div>;
      },
    },
    {
      field: "additionalDetails",
      headerName: "Addtion",
      flex: 1,
      headerAlign: "center",
      align: "left",
      renderCell: (p) => {
        return <div>{p.row.additionalDetails}</div>;
      },
    },
    {
      field: "actions",
      headerName: "View Recpie",
      flex: 1,
      headerAlign: "center",
      align: "right",
      renderCell: (p) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            onClick={(e) => {
              handleView(e, p.row.recpieId.id);
            }}
          >
            view details
            <RemoveRedEyeOutlined
              color="success"
              style={{ margin: "0 0.5rem" }}
            />
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    http.get(`/order/${id}`).then((response) => {
      setRecpies(response.data.details);
      setOrder(response.data);
    });
  }, []);

  return (
    <>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Order Id:{" "}
        <span style={{ color: "#000", fontSize: "1.3rem" }}>{order?.id}</span>
      </Typography>

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
        {order && recpies.length > 0 && recpies[0].recpieId ? (
          <DataGrid
            rows={recpies}
            columns={columns}
            showCellRightBorder={true}
            hideFooter
            getRowId={(row) => row._id}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        ) : (
          <h3>You might have deleted some dishes</h3>
        )}
      </Box>
    </>
  );
};

export default ViewOrder;
