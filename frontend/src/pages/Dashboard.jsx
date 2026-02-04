import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <title>Dashboard</title>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <a className="navbar-brand fw-bold text-primary">Sop Agent</a>
        <ul className="navbar-nav ms-auto gap-3">
          <li className="nav-item" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Home</li>
          <li className="nav-item text-danger" style={{ cursor: "pointer" }} onClick={handleLogout}>Logout</li>
        </ul>
      </nav>

      {/* Dashboard Hero */}
      <div className="container mt-5">
        <h2 className="fw-bold mb-4">Welcome to Your Dashboard</h2>
      </div>
    </div>
  );
};

export default AdminDashboard;