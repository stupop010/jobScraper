import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../action/auth";

const NavBar = ({ isAuthenticated, logout }) => {
  return (
    <div className="main-nav">
      <ul>
        <li>
          <Link className="main-nav-link" to="/">
            Home
          </Link>
        </li>
        {auth(isAuthenticated, logout)}
      </ul>
    </div>
  );
};

const auth = (isAuthenticated, logout) => {
  return (
    <li>
      {isAuthenticated ? (
        <a onClick={logout} href="/login">
          Logout
        </a>
      ) : (
        <Link className="main-nav-link" to="/login">
          Login
        </Link>
      )}
    </li>
  );
};

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
