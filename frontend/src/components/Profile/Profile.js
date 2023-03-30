import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    height: "80vh",
    backgroundColor: "#e8e3d3",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

function UserProfile() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Paper className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar
            alt={`${user.fName} ${user.lName}`}
            src={user.image}
            className={classes.avatar}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item>
              <Typography gutterBottom variant="h5" component="h2">
                {user.fName} {user.lName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="textSecondary">
                {user.email}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {user.phoneNumber}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textSecondary">
              {user.designation}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.salary}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Typography variant="body1" color="textSecondary">
          {`${user.address.house}, ${user.address.street}`}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {`${user.address.city}, ${user.address.state} ${user.address.postalCode}`}
        </Typography>
      </Box>
    </Paper>
  );
}

export default UserProfile;
