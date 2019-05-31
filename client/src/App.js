import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./action/auth";
import Navbar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Resgister";
import Results from "./components/Results";
import "./App.css";
import setAuthHeader from "./utils/setAuthHeader";
import history from "./history";

if (localStorage.token) {
  setAuthHeader(localStorage.token);
}

const App = ({ fetchUser, isAuthenticated }) => {
  console.log(isAuthenticated);
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router history={history}>
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
  return { isAuthenticated: state.auth.isAuthenticated };
};
export default connect(
  mapStateToProps,
  { fetchUser }
)(App);
