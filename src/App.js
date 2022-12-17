/* eslint-disable */

import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Index } from "./components/Index";
import { BoardDetails } from "./components/BoardDetails";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { EditBoard } from "./components/EditBoard";

const userAll = [
  { id: "lbm1212", password: "rkskek1!", userName: "이병민" },
  { id: "dlaguawns1", password: "rkskek1!", userName: "임현준" },
  { id: "dlqudals12", password: "rkskek1!", userName: "가나다" },
  { id: "dkfmgps12", password: "rkskek1!", userName: "아르헨" }
];

function App() {
  useEffect(() => {
    if (!Boolean(localStorage.getItem("userAll"))) {
      localStorage.setItem("userAll", JSON.stringify(userAll));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Index />} />
        <Route path={"/details"} element={<BoardDetails />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/editBoard"} element={<EditBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
