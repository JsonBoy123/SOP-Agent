import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
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
          <li
            className="nav-item"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="nav-item text-danger"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </nav>

      {/* Dashboard Hero */}
      <div className="container mt-5">
        <h2 className="fw-bold mb-4">Welcome to Your Dashboard</h2>
        <div className="sidebar">
          <h2>🏢Enterprise SOP Agent</h2>
          <p className="section-title">Suggested Questions</p>
          <button>Vendor onboarding process</button>
          <button>Incident response SOP</button>2
          <button>Password reset policy</button>
          <div className="bottom-links">
            <p>📁 Document Library</p>
            <p>⚙️ Settings</p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;
