import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const DetailCard = (props) => {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      borderRadius: "20px",
      boxShadow: "border-box",
      background: `${props.bgColor}`,
      color: `${props.fontColor}`,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 10,
      marginTop: 10,
    },
  });
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.pos}>
          Total {props.title}
          <span style={{ paddingLeft: "100px" }}>{props.count}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
