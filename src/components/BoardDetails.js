import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
  Card,
  Divider,
  Button
} from "@mui/material";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useAtom } from "jotai";
import { Row } from "./data/Atom";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { useLocation } from "react-router-dom";

export const BoardDetails = () => {
  const location = useLocation();
  const [row, setRow] = useAtom(Row);
  const [rowDetail, setRowDetail] = useState();
  const [arrow, setArrow] = useState(true);
  const [comment, setComment] = useState([]);
  const [commentAdd, setCommentAdd] = useState({
    id: location.state ? location.state.id : 0,
    user: localStorage.getItem("isLogin")
      ? JSON.parse(localStorage.getItem("isLogin")).userName
      : "Guest",
    comment: ""
  });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRowDetail(row.find(i => i.id === location.state.id));
  }, []);

  const commentsRow = localStorage.getItem("comment")
    ? JSON.parse(localStorage.getItem("comment"))
    : [];

  useEffect(() => {
    if (commentsRow[0]) {
      setComment(commentsRow.filter(e => e.id === location.state.id));
    }
  }, [refresh]);

  return (
    <>
      <Box sx={{ width: "100%", height: "100%", backgroundColor: "#F4F5F7" }}>
        <Header />
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
            상세정보
          </Typography>
          <Card sx={{ width: "60%", marginLeft: "20%" }}>
            <Box sx={{ padding: "30px" }}>
              <Card sx={{ padding: "20px", border: "1px solid #D8D8D8" }}>
                <InputLabel>Title</InputLabel>
                <OutlinedInput
                  sx={{ marginTop: "10px", width: "100%", height: "50px" }}
                  value={rowDetail ? rowDetail.title : ""}
                  readOnly
                />
                <InputLabel sx={{ marginTop: "15px" }}>User</InputLabel>
                <OutlinedInput
                  sx={{ marginTop: "10px", width: "100%", height: "50px" }}
                  value={rowDetail ? rowDetail.user : ""}
                  readOnly
                />
                <Typography sx={{ width: "50px", marginTop: "15px" }}>
                  Description
                </Typography>
                <Card sx={{ marginTop: "10px" }}>
                  <IconButton>
                    {arrow ? (
                      <KeyboardDoubleArrowUpIcon
                        onClick={() => {
                          setArrow(false);
                        }}
                      />
                    ) : (
                      <KeyboardDoubleArrowDownIcon
                        onClick={() => {
                          setArrow(true);
                        }}
                      />
                    )}
                  </IconButton>
                  <Divider />
                  {arrow && (
                    <Box sx={{ padding: "5%" }}>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: rowDetail ? rowDetail.description : ""
                        }}
                      ></p>
                    </Box>
                  )}
                </Card>
              </Card>
            </Box>
            <Divider />
            <Box sx={{ padding: "10px 30px 10px 30px" }}>
              {comment[0] &&
                comment.map(item => (
                  <Card sx={{ marginTop: "10px" }}>
                    <Typography sx={{ padding: "10px 20px 10px 20px" }}>
                      {item.user}
                    </Typography>
                    <Divider />
                    <Typography sx={{ padding: "20px" }}>
                      {item.comment}
                    </Typography>
                  </Card>
                ))}
            </Box>
            <Box sx={{ padding: "30px" }}>
              <Card sx={{ border: "1px solid #D8D8D8" }}>
                <Typography sx={{ padding: "15px 20px 15px 20px" }}>
                  댓글
                </Typography>
                <Divider />
                <Box sx={{ padding: "20px" }}>
                  <OutlinedInput
                    sx={{ width: "100%" }}
                    value={commentAdd.comment}
                    onChange={e => {
                      setCommentAdd({ ...commentAdd, comment: e.target.value });
                    }}
                    multiline
                    rows={2}
                  />
                  <Box
                    sx={{
                      float: "right",
                      marginTop: "10px",
                      marginBottom: "20px",
                      fontSize: "14px"
                    }}
                  >
                    <Button
                      onClick={() => {
                        let addComment = localStorage.getItem("comment")
                          ? JSON.parse(localStorage.getItem("comment"))
                          : [];
                        addComment.push(commentAdd);
                        localStorage.removeItem("comment");
                        localStorage.setItem(
                          "comment",
                          JSON.stringify(addComment)
                        );
                        setRefresh(!refresh);
                      }}
                      sx={{
                        color: "white",
                        backgroundColor: "#284ad5",
                        marginLeft: "5px",

                        fontSize: "14px",
                        height: "35px",
                        ":hover": {
                          backgroundColor: "#284ad5"
                        }
                      }}
                    >
                      등록
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Card>
        </Box>
        <Footer />
      </Box>
    </>
  );
};
