import React, { useEffect, useState } from "react";
import http from "../../services/httpService";
import Typography from "@material-ui/core/Typography";
import { Delete, Edit, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Box, Button, useTheme, alpha } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { tokens } from "../Themes";

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

const Shifts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const history = useHistory();
  const classes = useStyles();
  const [Shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    http.get("/shift").then((res) => {
      setShifts(res.data);
    });
  }, [loading]);

  const handleDelete = (e, id) => {
    http
      .delete(`/shift/${id}`)
      .then((res) => {
        alert("Shift deleted");
      })
      .catch((err) => console.log(err));
    http.get("/shift").then((res) => {
      setShifts(res.data);
    });
    setLoading(!loading);
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1.5,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "left",
      headerClass: classes.headerCell,
    },
    {
      field: "day",
      headerName: "Day",
      flex: 1.5,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "left",
      headerClass: classes.headerCell,
    },
    {
      field: "from",
      headerName: "From",
      flex: 1,
      headerAlign: "center",
      align: "left",
      headerClass: classes.headerCell,
    },
    {
      field: "to",
      headerName: "To",
      flex: 1,
      headerAlign: "center",
      align: "left",
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      headerAlign: "center",
      align: "right",
      renderCell: (p) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Link to={`/shift/${p.id}`}>
            <Button>
              <RemoveRedEyeOutlined color="success" />
            </Button>
          </Link>
          <Link to={`/shift/edit/${p.id}`}>
            <Button>
              <Edit color="warning" />
            </Button>
          </Link>
          <Button onClick={(e) => handleDelete(e, p.id)}>
            <Delete color="error" />
          </Button>
        </div>
      ),
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
        Shifts
      </Typography>
      <div style={{ padding: "2px", marginBottom: "1.5rem" }}>
        <Link to={"/shift/form"}>
          <Button variant="contained" color="primary" data-testid="Add-btn">
            + Create Shift
          </Button>
        </Link>
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
        {Shifts?.length > 0 && (
          <DataGrid
            rows={Shifts}
            columns={columns}
            showCellRightBorder={true}
            hideFooterSelectedRowCount
            getRowId={(row) => row.id}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        )}
      </Box>
    </>
  );
};

export default Shifts;
