import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";
import IPAddress from "./components/admin/IPAddress";
import AddIPAddress from "./components/admin/IPAddress/AddIPAddress";
import EditIPAddress from "./components/admin/IPAddress/EditIPAddress";
import LogIPAddress from "./components/admin/IPAddress/LogIPAddress";
import LabelComment from "./components/admin/LabelComment";
import AddLabelComment from "./components/admin/LabelComment/AddLabelComment";
import EditLabelComment from "./components/admin/LabelComment/EditLabelComment";
import Log from "./components/admin/Log";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />

      <Route path="/admin/ip-address" element={<IPAddress />} />
      <Route path="/admin/ip-address/add" element={<AddIPAddress />} />
      <Route path="/admin/ip-address/:id" element={<EditIPAddress />} />
      <Route path="/admin/ip-address/:id/logs" element={<LogIPAddress />} />

      <Route path="/admin/label" element={<LabelComment />} />
      <Route path="/admin/label/add" element={<AddLabelComment />} />
      <Route path="/admin/label/:id" element={<EditLabelComment />} />

      <Route path="/admin/log" element={<Log />} />
    </Routes>
  );
}

export default App;
