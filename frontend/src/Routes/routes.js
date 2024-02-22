import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../Pages/Profile";
import AuthPage from "../Pages/AuthPage";
import HomePage from "../Pages/HomePage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
      <Route path = "/profile" element={<Profile/>}></Route>
    </Routes>
  );
};

export default Router;
