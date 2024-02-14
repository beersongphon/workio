import React, { Component } from "react";
import {
  Link,
  NavLink,
} from "react-router-dom";
import ApiService from "./../../service/ApiService";
import Swal from 'sweetalert2';
import "popper.js/dist/umd/popper.js";
import "jquery/dist/jquery.min.js";
import $ from "jquery";

class Header extends Component {
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
      profile: "",
      loggedIn
    };
  }

  logout() {
    ApiService.logout();
    // this.isLogin = false;
    window.location.href = "/";
  }

  // getProfile() {
  //   ApiService.getProfile().then((res) => {
  //     console.log("Data: ", res);
  //     if (res.data.status === "ok") {
  //       this.state.profile = res.decoded;
  //     } else {
  //       console.log(res.data.message);
  //       Swal.fire({
  //         icon: "error",
  //         title: (res.data.message),
  //         showConfirmButton: false,
  //         timer: 2000
  //       }).then((result) => {
  //         if (result.isDismissed) {
  //           window.history.back();
  //         }
  //       });
  //     }
  //   })
  // }
  
  componentDidMount() {
      ApiService.getProfile().then((res) => {
      if (res.data.status === "ok") {
        this.setState({ profile: res.data.decoded.fullname });
      } else {
        Swal.fire({
          icon: "error",
          title: (res.data.message),
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
          if (result.isDismissed) {
            localStorage.clear()
            window.location.href = "/";
          }
        });
      }
    });
  }

  click(){
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  }

  render() {
   
      return (
        <nav className="navbar is-warning" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> */}
              {this.props.name}
            </a>

            <button role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={this.click}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <NavLink exact className="navbar-item" activeClassName="active" to="/home">
                Home
              </NavLink>

              <NavLink className="navbar-item" activeClassName="active" to="/documentation">
                Documentation
              </NavLink>

              <div className="navbar-item has-dropdown is-hoverable">
                <Link className="navbar-link" to="">
                  More
                </Link>

                <div className="navbar-dropdown">
                  <NavLink className="navbar-item" activeClassName="active" to="/documentation">
                    About
                  </NavLink>
                  <NavLink className="navbar-item" activeClassName="active" to="/documentation">
                    Jobs
                  </NavLink>
                  <NavLink className="navbar-item" activeClassName="active" to="/documentation">
                    Contact
                  </NavLink>
                  {/* <hr className="navbar-divider"> */}
                  <NavLink className="navbar-item" activeClassName="active" to="/documentation">
                    Report an issue
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                {this.state.profile}
              </div>
              <div className="navbar-item">
                <div className="buttons">
                  <button className="button is-danger" onClick={this.logout}>
                    <strong>Logout</strong>
                  </button>
                  {/* <a className="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a className="button is-light">
                    Log in
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </nav>
      );
  
  }
}
export default Header;
