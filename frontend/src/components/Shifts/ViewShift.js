import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  alpha,
  useTheme,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { Delete, RemoveRedEyeOutlined } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import http from "../../services/httpService";
import { tokens } from "../Themes";
const useStyles = makeStyles((themes) => ({
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: themes.palette.primary.main,
  },

  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#def2ff",
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  },
  textField: {
    width: "100%",
    margin: "10px 0",
  },
}));

const ViewShift = (props) => {
  const id = props.match.params.id;
  const history = useHistory();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [shift, setShift] = useState();
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState();
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const classes = useStyles();
  useEffect(() => {
    http
      .get(`/shift/${id}`)
      .then((res) => {
        setShift(res.data);
      })
      .catch((err) => console.log(err));
    http
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, [loading]);

  const handleView = (event, { id }) => {
    history.push(`/userView/${id}`);
  };

  const handleRemove = (event, employeeId) => {
    http.patch(`/shift/remove/employee/${employeeId}/${id}`).then((res) => {
      setLoading(!loading);
      alert("User Removed");
    });
  };
  const handleAdd = () => {
    if (!employeeId) {
      return alert("Select an Employee First");
    }
    http
      .patch(`/shift/add/employee/${employeeId}/${id}`)
      .then((res) => {
        alert(res.data.message);
        setLoading(!loading);
      })
      .catch((err) => console.log(err));
  };
  const handleMenuChange = (e) => {
    setEmployeeId(e.target.value);
  };
  const columns = [
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "left",
      headerClass: classes.headerCell,

      renderCell: (p) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar src={p?.row?.image} />
            <span style={{ marginLeft: "5px" }}>{p.row.email}</span>
          </div>
        );
      },
    },

    {
      field: "fName",
      headerName: "First Name",
      flex: 1,
      headerAlign: "center",
      align: "left",
      headerClass: classes.headerCell,
    },
    {
      field: "lName",
      headerName: "Last Name",
      flex: 1,
      headerAlign: "center",
      align: "left",
      headerClass: classes.headerCell,
    },
    {
      field: "actions",
      headerName: "Actions",
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
              handleView(e, p.id);
            }}
          >
            <RemoveRedEyeOutlined color="success" />
          </Button>
          <Button onClick={(e) => handleRemove(e, p.id)}>
            <Delete color="error" />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className={"View-container"}>
      {shift && (
        <>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                {shift.title}
              </Typography>
              <Typography variant="h6" id="tableTitle" component="div">
                {` From: ${shift.from}`}
              </Typography>
              <Typography variant="h6" id="tableTitle" component="div">
                {` To: ${shift.to}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                required={true}
                className={classes.textField}
                name="employee"
                id="employee"
                label="Add Employee"
                type="text"
                select
                onChange={handleMenuChange}
                variant="outlined"
              >
                {users.length > 0 &&
                  users.map((u) => {
                    if (u.id != userId)
                      return <MenuItem value={u.id}>{u.fName}</MenuItem>;
                  })}
              </TextField>
              <div
                style={{
                  padding: "2px",
                  marginBottom: "1.5rem",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  data-testid="Add-btn"
                  onClick={handleAdd}
                >
                  Add Employee
                </Button>
              </div>
            </Grid>
          </Grid>
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
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography
                  className={classes.title}
                  variant="h6"
                  id="tableTitle"
                  component="div"
                >
                  Assigned Employees
                </Typography>
              </Grid>
            </Grid>
            {shift.employees.length > 0 && (
              <DataGrid
                rows={shift.employees}
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
      )}
    </div>
  );
};

export default ViewShift;
