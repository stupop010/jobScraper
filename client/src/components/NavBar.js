import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="main-nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {auth()}
      </ul>
    </div>
  );
};

const auth = isAuth => {
  return (
    <li>
      {isAuth ? (
        <Link to="/logout">LogOut</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </li>
  );
};

export default NavBar;
