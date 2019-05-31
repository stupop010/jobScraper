import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../action/auth";

const Login = ({ loginUser, isAuthenticated }) => {
  const [emailChange, setEmailChange] = useState("");
  const [passwordChange, setPasswordChange] = useState("");

  const formSubmit = e => {
    e.preventDefault();
    const data = {
      email: emailChange,
      password: passwordChange
    };
    loginUser(data);
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="tran">
      <form className="form" onSubmit={formSubmit}>
        <h1>Sign In</h1>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email..."
            onChange={e => setEmailChange(e.target.value)}
            value={emailChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password..."
            onChange={e => setPasswordChange(e.target.value)}
            value={passwordChange}
          />
        </div>
        <div className="form-group break">
          <button type="submit" className="form-button">
            Sumbit
          </button>
        </div>
        <div className="register-section">
          Don't have account?
          <Link to="register" className="register-link">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
