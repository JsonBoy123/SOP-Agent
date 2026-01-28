import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css"; // Import CSS

 const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <title>Home</title>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <a
          className="navbar-brand fw-bold text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Sop Agent
        </a>
        <ul className="navbar-nav ms-auto gap-3">
          {/* <li className="nav-item" style={{ cursor: "pointer" }}>Jobs</li> */}
          {/* <li className="nav-item" style={{ cursor: "pointer" }}>Companies</li> */}
          <li
            className="nav-item text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </li>
          <li
            className="nav-item text-success"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Register
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
