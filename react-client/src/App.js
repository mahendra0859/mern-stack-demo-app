import React from "react";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

import { PageNotFound, Register, Signin, Dashboard } from "./pages";
import { Toaster } from "./componets";

const mapStateToProps = (state) => ({ ...state["authReducer"] });

function App({ loading }) {
  if (loading) {
    return (
      <div className="container main-container">
        <Loader type="Grid" color="#000000" height={100} width={100} />
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/signin" component={Signin} />
        <Route exact path="/" component={Dashboard} />
        <Route component={PageNotFound} />
      </Switch>
      <Toaster />
    </Router>
  );
}

export default connect(mapStateToProps)(App);
