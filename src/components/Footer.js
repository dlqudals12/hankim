import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const Footer = () => {
  return (
    <>
      <Divider />
      <Box
        sx={{ backgroundColor: "#DAD9FF", width: "100%", height: "150px" }}
        boxShadow="3"
      ></Box>
    </>
  );
};
