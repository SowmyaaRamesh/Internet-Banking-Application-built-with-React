import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { ViewStatement } from "./components/ViewStatement";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/viewstatement" component={ViewStatement} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
