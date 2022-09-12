import React, { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { logged } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!logged) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <>
      <AdminNavbar />
      <main>{children}</main>
    </>
  );
};

export default AdminLayout;
