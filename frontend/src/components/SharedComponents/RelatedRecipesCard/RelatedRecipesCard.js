import React from "react";
import Typography from "@material-ui/core/Typography";

const RelatedRecipesCard = (props) => {
  return (
    <>
      <div style={{ display: "flex", paddingTop: "10px" }}>
        <img
          src={props.image}
          style={{
            width: "150px",
            height: "100px",
            borderRadius: "10px",
            marginRight: "20px",
          }}
        />
        <Typography variant={"h6"}>
          {props.title}
          <Typography>{props.by}</Typography>
        </Typography>
      </div>
    </>
  );
};

export default RelatedRecipesCard;
