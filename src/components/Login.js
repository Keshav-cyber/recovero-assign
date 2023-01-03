import React from "react";
import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../auth/AuthServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (email === "" || password === "") {
        alert("all fields are mandatory");
        return;
      }
      await AuthService.login(email, password).then(
        (val) => {
          navigate("/dashboard");
          window.location.reload();
        },
        (error) => {
          console.log(error);
          alert("email or password is wrong");
          navigate("/login");
          window.location.reload();
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Login</h1>
      <form onSubmit={handleLogin} class="login-form form">
        <div>  user email  - abhishek@gmail.com   password abhi333</div>
        <div>  admin email    - keshav@gmail.com   password keshav123</div>
        <div className="input error-input">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="send-btn btn"> Submit </button>
      </form>
    </div>
  );
};

export default Login;
