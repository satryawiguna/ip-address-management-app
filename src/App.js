import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
