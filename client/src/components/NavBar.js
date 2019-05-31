import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../action/auth";

const NavBar = ({ isAuthenticated, logout }) => {
  console.log(isAuthenticated);

  return (
    <div className="main-nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
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
        <Link to="/login">Login</Link>
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
