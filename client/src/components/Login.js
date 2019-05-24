import React from "react";

const Login = () => {
  return (
    <div>
      <form>
        <h1>Sign In</h1>
        <div>
          <label>Email:</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label>Password:</label>
          <div>
            <input type="password" name="password" />
          </div>
        </div>
        <button type="submit">Sumbit</button>
        <button type="button" className="form-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
