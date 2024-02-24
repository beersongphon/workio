import React, { Component } from "react";
// import logo from "./logo.svg";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import Header from "./components/Header/Header";
//Bootstrap libraries
import './../node_modules/bulma/css/bulma.css';
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "popper.js/dist/umd/popper.js"
//jquery for bootstrap modal
import "jquery/dist/jquery.min.js";
// import $ from "jquery";
import "@fortawesome/fontawesome-free/css/all.css";

class App extends Component {
  constructor(props) {
    super(props);
    // const token = localStorage.getItem("token");
    const token = localStorage.getItem("access_token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      appName: "ReactJS Feed Example",
      home: false,
      loggedIn
    };
  }
  render() {
    if (this.state.loggedIn === true) {
      return (
        <Router basename={'/workio'}>
          <Header name={this.state.appName} />
          <Routes name={this.state.appName} />
          {/* <hr /> */}
          {/* <Footer /> */}
        </Router>
      );
    } else {
      return (
        <Router basename={'/workio'}>
          <Routes name={this.state.appName} />
          {/* <hr /> */}
          {/* <Footer /> */}
        </Router>
      );
    }
  }
}

export default App;
