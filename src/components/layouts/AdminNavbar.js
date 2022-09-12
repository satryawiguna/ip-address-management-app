import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateAuth } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import AxiosJwt from "../../utils/AxiosJwt";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { nickName, email } = useSelector((state) => state.auth);

  const actionLogout = async () => {
    try {
      const logout = await AxiosJwt.post(`/auth/logout`, { email: email });

      if (logout.data.type === "SUCCESS") {
        dispatch(
          updateAuth({
            logged: false,
            fullName: null,
            nickName: null,
            email: null,
          })
        );
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://www.satryawigua.me">
            <strong>
              <h2>IP ADDRESS MANAGEMENT</h2>
            </strong>
          </a>

          <a
            href="/"
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/admin/dashboard" className="navbar-item">
              Dashboard
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">Hello, {nickName}</div>
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={actionLogout} className="button is-light">
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
