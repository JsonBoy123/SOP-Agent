import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';

const SignupPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URI;

  const handleSignup = async (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) return alert("Passwords do not match");
    // if (!agreeTerms) return alert("You must agree to terms");
    // localStorage.setItem("token", "dummy-signup-token");
    // navigate("/dashboard");
    if (password !== confirmPassword) return toast.error("Passwords does not match");
    if (!agreeTerms) return toast.error("You must agree the terms & conditions");

    let data ={
      fullname,
      email,
      password
    }
    try {
       await axios.post(`${API_URL}/signup`,data)
      toast.success("Signup Successfully!")
      setTimeout(()=>{
      navigate("/login");
      },1000)
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
    <title>SignUp</title>
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

    <div className="container d-flex align-items-center justify-content-center min-vh-100 mt-5">
      <div className="card shadow-sm p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <h3 className="fw-bold text-center mb-3">Sign Up</h3>
        <form onSubmit={handleSignup}>

          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

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
              placeholder="Enter password"
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

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              id="termsCheck"
            />
            <label className="form-check-label" htmlFor="termsCheck">
              I agree to the <span className="text-primary">Terms & Conditions</span>
            </label>
          </div>
          <button type="submit" className="btn btn-success w-100 mb-3">Sign Up</button>
          <div className="text-center">
            <span className="text-muted">Already have an account? </span>
            <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignupPage;
