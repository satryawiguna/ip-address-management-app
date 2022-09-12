import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../features/authSlice";
import Message from "./Message";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { logged } = useSelector((state) => state.auth);

  useEffect(() => {
    if (logged) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);

  const actionLogin = async (e) => {
    e.preventDefault();

    try {
      const login = await axios.post("/auth/login", {
        email: email,
        password: password,
      });

      if (login.data.type == "SUCCESS") {
        dispatch(
          updateAuth({
            logged: true,
            fullName: login.data.fullName,
            nickName: login.data.nickName,
            email: login.data.email,
          })
        );

        localStorage.setItem("access_token", login.data.token.access_token);
        localStorage.setItem("refresh_token", login.data.token.refresh_token);

        navigate("/admin/dashboard", { replace: true });
      }
    } catch (error) {
      if (error.response) {
        setMessages(error.response.data.messages);
      }
    }
  };

  const closeMessage = () => {
    setMessages([]);
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <Message messages={messages} closeMessage={closeMessage} />
              <form onSubmit={actionLogin} className="box">
                <div className="field mt-3">
                  <label className="label">Email</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-3">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-3">
                  <button className="button is-success is-fullwidth">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
