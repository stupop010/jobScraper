import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { registerUser } from "../action/auth";

const Register = ({ registerUser, isAuthenticated }) => {
  const [emailChange, setEmailChange] = useState("");
  const [passwordChange, setPasswordChange] = useState("");
  const [password2Change, setPassword2Change] = useState("");

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const registerForm = e => {
    e.preventDefault();
    const data = {
      email: emailChange,
      password: passwordChange,
      password2: password2Change
    };

    registerUser(data);
  };

  return (
    <div className="tran">
      <form className="form" onSubmit={registerForm}>
        <h1>Register</h1>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email..."
            value={emailChange}
            onChange={e => setEmailChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password..."
            value={passwordChange}
            onChange={e => setPasswordChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password2"
            placeholder="Match password..."
            value={password2Change}
            onChange={e => setPassword2Change(e.target.value)}
          />
        </div>
        <div className="form-group mt">
          <button type="submit" className="form-button">
            Sumbit
          </button>
          <div className="register-section">
            Have a Account?
            <Link to="/login" className="register-link">
              Login
            </Link>
          </div>
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
  { registerUser }
)(Register);
