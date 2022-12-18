import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Board } from "./Board";
import { useAtom } from "jotai";
import { Row } from "./data/Atom";

const data = [
  { id: 1, title: "배송 관련 문의", user: "wogud3", description: "상품 주문이 5일 지났는데 배송은 얼마나 걸리나요?" },
  { id: 2, title: "상품교환 문의", user: "ssswss", description: "옷 사이즈가 작아서 한치수 크게 교환하려합니다" },
  {
    id: 3,
    title: "교환",
    user: "fhdkroRnfwoa",
    description: "배송되면서 옷이 찢어졌습니다 교환부탁드려요",
  },
  {
    id: 4,
    title: "환불문의",
    user: "dwadwad",
    description: "배송이 너무 늦어 환불요청드립니다",
  },
  {
    id: 5,
    title: "재입고 문의",
    user: "qudtn2321",
    description: "라이트 그레이 105 재입고는 언제쯤 되나요?",
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
