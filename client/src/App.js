import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/Landing";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await fetch("/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.getItem("token") },
      });
      let parseRes = await response.json();
      console.log("Authorization is " + parseRes);
      parseRes === true ? setAuth(true) : setAuth(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isAuth();
  });

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              !isAuthenticated ? (
                <Landing setAuth={setAuth} />
              ) : (
                <Navigate to="/dashboard" replace={true} />
              )
            }
          />
          <Route
            exact
            path="/login"
            element={
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate to="/dashboard" replace={true} />
              )
            }
          />
          <Route
            exact
            path="/register"
            element={
              !isAuthenticated ? (
                <Register setAuth={setAuth} />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard setAuth={setAuth} />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
