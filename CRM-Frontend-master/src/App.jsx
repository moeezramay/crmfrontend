import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ReplitDashboard from "./ReplitDashboard";
import Register from "./Register";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<ReplitDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
