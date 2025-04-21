import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader";

import { Header } from "../../component/Header";
import Home from "../Home";
import About from "../About";
import Maps from "../../../ui/Maps"

import "normalize.css";

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/maps" component={Maps} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default hot(module)(App);