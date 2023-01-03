import React from "react";
import { useState, useEffect } from "react";
import "./Admin.css";
import UserCard from "./UserCard";
import axios from "axios";
import authService from "../auth/AuthServices";

const Admin = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (users.length < 1) {
      axios
        .get("https://recovero-assign-production.up.railway.app/users", {
          headers: { Authorization: `${user.accessToken}` },
        })
        .then((response) => {
          setUsers(response.data.users);
        });
    }
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`https://recovero-assign-production.up.railway.app/user/${id}`)
      .then(setUsers(users.filter((user) => user._id !== id)));
  };
  const userList = users.map((user) => {
    return <UserCard user={user} clickHander={deleteUser} key={user._id} />;
  });

  const addUser = () => {
    axios
      .post(
        "https://recovero-assign-production.up.railway.app" + "/addUser",
        {
          fullName,
          email,
          password,
        },

        { headers: { Authorization: `${user.accessToken}` } }
      )
      .then((response) => {
        //
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };

  return (
    <div className="container">
      <div>
        <h1 className="page-title">Add User</h1>
        <form onSubmit={addUser} class="login-form form">
          <div className="input">
            <label> Full Name : </label>
            <input
              type="text"
              name="fullName"
              placeholder="full name"
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
            />
          </div>
          <div className="input">
            <label> Email : </label>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <label>Password : </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="send-btn btn"> Add User </button>
        </form>
      </div>
      <div>{userList}</div>
    </div>
  );
};

export default Admin;
