import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Board } from "./Board";
import { useAtom } from "jotai";
import { Row } from "./data/Atom";

const data = [
  { id: 1, title: "가나다", user: "lbm1212", description: "하늘은왜" },
  { id: 2, title: "라마바", user: "jky2323", description: "아아아아아아" },
  {
    id: 3,
    title: "사아자",
    user: "dlaguswns12",
    description: "ㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜ",
  },
  {
    id: 4,
    title: "차카타",
    user: "qudtlsdlaguswns12",
    description: "??????????????",
  },
  {
    id: 5,
    title: "파하다",
    user: "guswnszns",
    description: "나나나나나나나나ㅏ나",
  },
  {
    id: 6,
    title: "히히히",
    user: "dkflzkxh",
    description: "아니아니아니아니아니아니아니아니아니아니",
  },
];

export const Index = () => {
  useEffect(() => {
    if (!Boolean(localStorage.getItem("row"))) {
      localStorage.setItem("row", JSON.stringify(data));
    }
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", height: "100%", backgroundColor: "#F4F5F7" }}>
        <Header />
        <Board />
        <Footer />
      </Box>
    </>
  );
};
