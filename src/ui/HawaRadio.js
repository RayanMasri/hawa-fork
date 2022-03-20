import { Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import { Box } from "../layout";
import { ThemeProvider } from "../themes/HawaProvider";

export const HawaRadio = (props) => {
  const [value, setValue] = useState(props.defaultValue);

  const { hawaTheme, themeName } = useContext(ThemeProvider);
  const currentTheme = Object.keys(hawaTheme.radioSelector).find(
    (tName) => tName.toLowerCase() === themeName?.toLowerCase()
  );
  let radioSelectorStyle = {};

  if (currentTheme) {
    radioSelectorStyle = {
      ...hawaTheme.radioSelector[currentTheme],
      "-moz-user-select": "-moz-none",
      "-khtml-user-select": "none",
      "-webkit-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none"
    };
  } else {
    radioSelectorStyle = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#F5F5F5",
      margin: 0,

      backgroundColor: "lightGrey",
      color: "black",
      padding: 10
    };
  }

  return (
    <Box horizontal maxWidth={"fit-content"}>
      {props.options.map((singleOption) => {
        return (
          <div
            key={singleOption.label}
            onClick={() => {
              setValue(singleOption.label);
              if (props.handleChange) {
                props.handleChange();
              }
            }}
            style={{
              ...radioSelectorStyle,
              backgroundColor:
                value.toLowerCase() === singleOption.label.toLowerCase()
                  ? currentTheme
                    ? hawaTheme.actionButton[currentTheme]?.backgroundColor
                    : "black"
                  : hawaTheme.layout[currentTheme]?.backgroundColor,
              color:
                value.toLowerCase() === singleOption.label.toLowerCase()
                  ? hawaTheme.actionButton[currentTheme]?.color
                  : currentTheme
                  ? hawaTheme.layout[currentTheme]?.color
                  : "black"
            }}
          >
            <Typography>{singleOption.text}</Typography>
          </div>
        );
      })}
    </Box>
  );
};
