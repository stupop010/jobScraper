import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUser } from "./action/auth";
import Navbar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Resgister";
import Results from "./components/Results";
import setAuthHeader from "./utils/setAuthHeader";
import { isAuthenticated } from "./selectors/authSelector";

import "./App.css";

if (localStorage.token) {
  setAuthHeader(localStorage.token);
}

const App = ({ fetchUser, isAuthenticated }) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Results} />
            <Route
              exact
              path="/login"
              component={Login}
              isAuthenticated={isAuthenticated}
            />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
};

const mapStateToProps = state => {
  return { isAuthenticated: isAuthenticated(state) };
};
export default connect(
  mapStateToProps,
  { fetchUser }
)(App);
