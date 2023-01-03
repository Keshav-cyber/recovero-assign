import React from "react";
import "./UserCard.css";
const UserCard = (props) => {
  let { fullName, email, password } = props.user;
  return (
    <div className="user-card">
      <div className="user-details"> Name : {fullName}</div>
      <div className="user-details"> Email : {email}</div>
      <div className="user-details"> Password : {password}</div>
      <div>
        <button
          onClick={() => props.clickHander(props.user._id)}
          className="delete-btn"
        >
          {" "}
          delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
