import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./App.css"

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/");
  };
  return (
    <div className="navbar">
      <Link to="/help">Other Logs!</Link>
      <Link to="/c">Create New Document!</Link>
      <Link to="/a">All Document!</Link>
      {!cookies.access_token ? (
        <Link to="/">Login/Register!</Link>
      ) : (
        <button onClick={logout}> Logout </button>
      )}
    </div>
  );
};