//路由模块
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./components/login/login";
import Home from "./components/home/home";
import Detail from "./components/main/detail";
import Cal from "./components/main/cal";
import Map from "./components/main/map";
// import Chatwindow from "./components/chat/chatwindow";


class RouterCom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/detail" component={Detail} />
          <Route exact path="/cal" component={Cal} />
          <Route exact path="/map" component={Map} />
          {/* <Route exact path="/chatwindow" component={Chatwindow} /> */}
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
}

export default RouterCom;
