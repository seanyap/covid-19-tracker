import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

// after you write the core of a component, make sure to test it first by rending it in your page.
// if you dont have your data or a specific feature yet, come up with your own data to test it out. DO NOT GO AND CODE THE REQUIRED FEATURE BEFORE TESTING
// takes in props which we destructured into 3 variables
function InfoBox({ title, cases, isRed, active, total, ...props }) {
  return (
    // make sure to assign each element a CSS BEM class names to style
    // always keep in mind the UI of the app. use library like material-UI for pre-written styling to ensure you don't spend too much time tinkering with design

    // Card className uses string interpolation to check if we want to include a specific css style; try to understand the concept
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        {/* Title */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {/* +/-120k Number of cases */}
        <h2 className={`infobox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>

        {/* 1.2M Total */}
        <Typography className="infobox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
