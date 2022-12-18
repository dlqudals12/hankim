import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from "@mui/material";
import { useAtom } from "jotai";
import { AlertPopupData, MyRow, Row, SearchStatus } from "./data/Atom";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { AlertPopup } from "./AlertPopup";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [alertPopupData, setAlertPopupData] = useAtom(AlertPopupData);
  const [myRow, setMyRow] = useAtom(MyRow);
  const [loginMenu, setLoginMenu] = useState(false);
  const [row, setRow] = useAtom(Row);

  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxHeight: "80px",
          backgroundColor: "#DAD9FF",
          opacity: "1",
          justifyContent: "space-between",
          fontFamily: "NotoSansMedium"
        }}
        boxShadow="2"
      >
        <AlertPopup />
        <Drawer
          open={openDrawer}
          anchor="top"
          onClose={() => {
            setOpenDrawer(false);
          }}
        >
          <List sx={{ marginLeft: "30px", width: "300px" }}>
            <ListItem
              onClick={() => {
                setOpenDrawer(false);
                setMyRow(false);
                setRow(JSON.parse(localStorage.getItem("row")));
                navigate("/");
              }}
              sx={{ cursor: "pointer" }}
            >
              글목록
            </ListItem>
            {localStorage.getItem("isLogin") && (
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                  setMyRow(true);
                  setOpenDrawer(false);
                }}
                sx={{ cursor: "pointer" }}
              >
                내가 쓴 글
              </ListItem>
            )}
            <ListItem
              onClick={() => {
                navigate("/");
                setMyRow(false);
              }}
              sx={{ cursor: "pointer" }}
            >
              공지사항
            </ListItem>
            {isLogin ? (
              <ListItem
                onClick={() => {
                  setAlertPopupData({
                    ...alertPopupData,
                    open: true,
                    msg: "로그아웃 되었습니다.",
                    rightCallback: () => {
                      localStorage.removeItem("isLogin");
                      setIsLogin(false);
                      setAlertPopupData({ ...alertPopupData, open: false });
                    }
                  });
                }}
                sx={{ cursor: "pointer" }}
              >
                로그아웃
              </ListItem>
            ) : (
              <>
                <ListItem
                  onClick={() => {
                    navigate("/signup");
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  회원가입
                </ListItem>
                <ListItem
                  onClick={() => {
                    navigate("/login");
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  로그인
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
        <IconButton
          sx={{
            height: "80px",
            marginLeft: "50px",
            ":hover": { backgroundColor: "transparent" }
          }}
        >
          <MenuIcon
            onClick={() => {
              setOpenDrawer(true);
            }}
            sx={{ width: "40px", height: "30px", margin: "10px" }}
          />
        </IconButton>

        <Button
          sx={{
            marignLeft: "5px",
            color: "#000000",
            fontSize: "14px",
            fontFamily: "NotoSansKRBold"
          }}
          onClick={() => {
            setMyRow(false);
            setRow(JSON.parse(localStorage.getItem("row")));
            navigate("/");
          }}
        >
          HOME
        </Button>
        <IconButton
          sx={{
            marginLeft: "70%",
            color: "#000000",
            justifyContent: "flex-end"
          }}
          onClick={() => {
            setLoginMenu(true);
          }}
        >
          <PersonOutlineIcon />
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          open={loginMenu}
          sx={{
            marginLeft: "78%",
            color: "#000000",
            justifyContent: "flex-end",
            marginTop: "40px"
          }}
          onClose={() => {
            setLoginMenu(false);
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >
          {!isLogin ? (
            <>
              <MenuItem
                sx={{ fontSize: "12px" }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                회원가입
              </MenuItem>
              <MenuItem
                sx={{ fontSize: "12px" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인
              </MenuItem>
            </>
          ) : (
            <MenuItem
              sx={{ fontSize: "12px" }}
              onClick={() => {
                setAlertPopupData({
                  ...alertPopupData,
                  open: true,
                  msg: "로그아웃 되었습니다.",
                  rightCallback: () => {
                    localStorage.removeItem("isLogin");
                    setIsLogin(false);
                    setAlertPopupData({ ...alertPopupData, open: false });
                    setLoginMenu(false);
                  }
                });
              }}
            >
              로그아웃
            </MenuItem>
          )}
        </Menu>
      </Box>
    </>
  );
};
