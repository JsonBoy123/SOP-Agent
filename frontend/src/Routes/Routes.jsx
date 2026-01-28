import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import AdminDashboard from "../pages/Dashboard";

// Protected route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// const PublicRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

const LoginSignUp = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={
        <LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default LoginSignUp;
