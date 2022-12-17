import { Button, Typography, Box, Dialog, Card } from "@mui/material";
import { useAtom } from "jotai";
import React from "react";
import { AlertPopupData } from "./data/Atom";

export const AlertPopup = () => {
  const [alertPopupData, setAlertPopupData] = useAtom(AlertPopupData);

  return (
    <Dialog open={alertPopupData.open}>
      <Card sx={{ width: "500px" }}>
        <Box sx={{ padding: "25px" }}>
          <Typography sx={{ fontFamily: "NotoSansKRMedium" }}>
            {alertPopupData.msg}
          </Typography>
          <Box
            sx={{
              float: "right",
              marginBottom: "25px",
              marginTop: "20px",
              fontSize: "14px"
            }}
          >
            {alertPopupData.rightCallback === (() => {}) && (
              <Button
                onClick={alertPopupData.leftCallback}
                sx={{
                  color: "#6B66FF",
                  border: "1px solid #6B66FF",
                  fontSize: "14px",
                  height: "35px",
                  ":hover": {
                    backgroundColor: "transparent"
                  }
                }}
              >
                {alertPopupData.leftMsg ? alertPopupData.leftMsg : "취소"}
              </Button>
            )}
            <Button
              onClick={alertPopupData.rightCallback}
              sx={{
                color: "#000000",
                backgroundColor: "#ECEBFF",
                marginLeft: "5px",

                fontSize: "14px",
                height: "35px",
                ":hover": {
                  backgroundColor: "#ECEBFF"
                }
              }}
            >
              {alertPopupData.rightMsg ? alertPopupData.rightMsg : "확인"}
            </Button>
          </Box>
        </Box>
      </Card>
    </Dialog>
  );
};
