import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import AuthServices from "../auth/AuthServices";

const Header = () => {
  let userLoggedIn = AuthServices.getCurrentUser();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    AuthServices.logout();
    navigate("/");
  };
  return (
    <div>
      <header>
        <h1>recovero</h1>
        <nav>
          <ul className="ui-list">
            {userLoggedIn && userLoggedIn.isAdmin && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
            {userLoggedIn && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
            {userLoggedIn && (
              <li>
                <Link to="/billings">Billings</Link>
              </li>
            )}
            {!userLoggedIn && (
              <li>
                <Link to="/">login</Link>
              </li>
            )}
            {userLoggedIn && (
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  {" "}
                  logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
