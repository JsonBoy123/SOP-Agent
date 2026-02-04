import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URI;

  const handleLogin = async (e) => {
    e.preventDefault();
    let data = {
      email,
      password
    }
    try {
      const res = await axios.post(`${API_URL}/login`, data)
      localStorage.setItem("token", res?.data?.token);
      toast.success("Login successfully!")
      setTimeout(() => {
        navigate("/dashboard");
        // if(res?.data?.user?.role==="employee"){
        //   navigate("/employeedashboard");
        // }else if(res?.data?.user?.role==="admin"){
        //   navigate("/admindashboard");
        // }
        // else{
        //   navigate("/jobseekerdashboard");
        // }
      }, 1000)

    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Try again!");
      }
    }
  };

  return (
    <>
    <title>Login</title>
      <ToastContainer
        position="top-center" />
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

      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <h3 className="fw-bold text-center mb-3">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 position-relative">
              <label className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                style={{ position: "absolute", right: "10px", top: "46px", cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
            <div className="text-end mb-3">
              <span className="small text-primary" style={{ cursor: "pointer" }}>Forgot Password?</span>
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
            <div className="text-center text-muted mb-3">or continue with</div>
            <div className="d-flex justify-content-center gap-3 mb-3">
              <button type="button" className="btn btn-outline-secondary w-50">Google</button>
              <button type="button" className="btn btn-outline-secondary w-50">Facebook</button>
            </div>
            <div className="text-center">
              <span className="text-muted">Don’t have an account? </span>
              <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/signup")}>
                Sign Up
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
