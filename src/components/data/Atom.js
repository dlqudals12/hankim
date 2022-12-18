import React from "react";
import { atom } from "jotai";
import { Box, Button } from "@mui/material";

export const SearchStatus = atom({
  select: 1,
  input: ""
});

export const AlertPopupData = atom({
  open: false,
  msg: "",
  rightMsg: "",
  leftMsg: "",
  rightCallback: () => {},
  leftCallback: () => {}
});

export const RefreshRow = atom(false);

export const Refresh = atom(false);

export const MyRow = atom(false);

export const RowChangeData = atom({
  id: 0,
  title: "",
  user: "",
  description: ""
});

export const Row = atom([
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

]);
