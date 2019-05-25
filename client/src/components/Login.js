import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../action/auth";

const Login = ({ loginUser }) => {
  const [emailChange, setEmailChange] = useState("");
  const [passwordChange, setPasswordChange] = useState("");

  const onChangeEmail = e => {
    setEmailChange(e.target.value);
  };

  const onChangePassword = e => {
    setPasswordChange(e.target.value);
  };

  const formSubmit = e => {
    e.preventDefault();
    const data = {
      email: emailChange,
      password: passwordChange
    };
    loginUser(data);
  };

  return (
    <div className="tran">
      <form className="form" onSubmit={formSubmit}>
        <h1>Sign In</h1>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email..."
            onChange={onChangeEmail}
            value={emailChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password..."
            onChange={onChangePassword}
            value={passwordChange}
          />
        </div>
        <div className="form-group mt">
          <button type="submit">Sumbit</button>
          <button type="button" className="form-button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(
  null,
  { loginUser }
)(Login);
