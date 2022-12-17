import {
  Box,
  Button,
  Divider,
  Typography,
  TableCell,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow
} from "@mui/material";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertPopupData,
  ChangeMod,
  MyRow,
  RefreshRow,
  Row,
  RowChangeData
} from "./data/Atom";
import { EditBoard } from "./EditBoard";

export const Board = () => {
  const [row, setRow] = useAtom(Row);
  const [alertPopupData, setAlertPopupData] = useAtom(AlertPopupData);
  const [, setRowChangeData] = useAtom(RowChangeData);
  const [type, setType] = useState("ADD");
  const navigate = useNavigate();
  const [myRow, setMyRow] = useAtom(MyRow);
  const [refreshRow, setRefreshRow] = useAtom(RefreshRow);

  useEffect(() => {
    if (localStorage.getItem("row")) {
      if (myRow) {
        setRow(
          JSON.parse(localStorage.getItem("row")).filter(
            e => e.user === JSON.parse(localStorage.getItem("isLogin")).userName
          )
        );
      } else {
        setRow(JSON.parse(localStorage.getItem("row")));
      }
    }
  }, [refreshRow, myRow]);

  const onClickCell = row => {
    if (row.field !== "button") {
      navigate("/details", { state: { id: row.id } });
    }
  };

  const checkId = row => {
    if (JSON.parse(localStorage.getItem("isLogin")).id === row.user) {
      navigate("editBoard", {
        state: { changeMod: "UPD", id: row.id }
      });
    } else {
      setAlertPopupData({
        ...alertPopupData,
        open: true,
        msg: "해당 유저가 아닙니다. 유저 이름을 확인해 주세요.",
        rightCallback: () => {
          setAlertPopupData({ ...alertPopupData, open: false });
        }
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#F4F5F7",
        marginTop: "80px",
        marginBottom: "120px"
      }}
    >
      <Typography
        sx={{
          width: "100%",
          textAlign: "center",
          fontSize: "18px",
          marginBottom: "100px",
          fontFamily: "NotoSansKRBold"
        }}
      >
        {myRow ? "내가 쓴 글" : "게시판"}
      </Typography>
      <Box sx={{ width: "80%", marginLeft: "10%" }}>
        <TableContainer
          component={Paper}
          sx={{
            marginTop: "50px",
            borderRadius: "10px"
          }}
        >
          <Table aria-label="simple table">
            <TableHead sx={{ border: "1px solid #8C8C8C" }}>
              <TableCell align="center" sx={{ border: "1px solid #8C8C8C" }}>
                No.
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid #8C8C8C" }}>
                Title
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid #8C8C8C" }}>
                User
              </TableCell>
              <TableCell align="center" sx={{ border: "1px solid #8C8C8C" }}>
                Button
              </TableCell>
            </TableHead>
            <TableBody>
              {row && row[0] !== null
                ? row.map((item, index) => (
                    <TableRow sx={{ border: "1px solid #DDDDDD" }} key={index}>
                      <TableCell
                        sx={{ border: "1px solid #DDDDDD", width: "20%" }}
                        align="center"
                        onClick={() => {
                          onClickCell(item);
                        }}
                      >
                        {item.id}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #DDDDDD" }}
                        align="left"
                        onClick={() => {
                          onClickCell(item);
                        }}
                      >
                        {item.title}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #DDDDDD", width: "20%" }}
                        align="center"
                        onClick={() => {
                          onClickCell(item);
                        }}
                      >
                        {item.user}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #DDDDDD", width: "20%" }}
                        align="center"
                      >
                        {localStorage.getItem("isLogin") && (
                          <Box sx={{ justifyContent: "space-between" }}>
                            <Button
                              sx={{
                                height: "30px",
                                width: "20px",
                                border: "1px solid #6B66FF",
                                color: "#6B66FF"
                              }}
                              onClick={() => {
                                const delRow = row.filter(
                                  e => e.id !== item.id
                                );
                                setAlertPopupData({
                                  ...alertPopupData,
                                  open: true,
                                  msg: "삭제 되었습니다.",
                                  rightCallback: () => {
                                    localStorage.removeItem("row");
                                    localStorage.setItem(
                                      "row",
                                      JSON.stringify(delRow)
                                    );
                                    setRefreshRow(true);
                                    setAlertPopupData({
                                      ...alertPopupData,
                                      open: false
                                    });
                                  }
                                });
                              }}
                            >
                              삭제
                            </Button>
                            <Button
                              sx={{
                                height: "30px",
                                width: "20px",
                                backgroundColor: "#DAD9FF",
                                color: "#000000",
                                float: "right",
                                marginRight: "15%",
                                ":hover": {
                                  backgroundColor: "#ECEBFF"
                                }
                              }}
                              onClick={() => {
                                checkId(item);
                              }}
                            >
                              수정
                            </Button>
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          sx={{
            margin: "50px 43% 50px 43%",
            width: "14%",
            backgroundColor: "#DAD9FF",
            height: "60px",
            color: "#000000",
            ":hover": {
              backgroundColor: "#ECEBFF"
            }
          }}
          onClick={() => {
            navigate("/editBoard", { state: { changeMod: "ADD" } });
          }}
        >
          등록
        </Button>
      </Box>
    </Box>
  );
};
