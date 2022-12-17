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
  { id: 1, title: "가나다", user: "lbm1212", description: "하늘은왜" },
  { id: 2, title: "라마바", user: "jky2323", description: "아아아아아아" },
  {
    id: 3,
    title: "사아자",
    user: "dlaguswns12",
    description: "ㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜ"
  },
  {
    id: 4,
    title: "차카타",
    user: "qudtlsdlaguswns12",
    description: "??????????????"
  },
  {
    id: 5,
    title: "파하다",
    user: "guswnszns",
    description: "나나나나나나나나ㅏ나"
  },
  {
    id: 6,
    title: "히히히",
    user: "dkflzkxh",
    description: "아니아니아니아니아니아니아니아니아니아니"
  }
]);
