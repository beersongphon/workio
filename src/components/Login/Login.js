import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Swal from 'sweetalert2'
import ApiService from "./../../service/ApiService";
// Creating Login Activity.
class Login extends Component {
  constructor(props) {
    super(props);
    // const token = localStorage.getItem("token");
    const token = localStorage.getItem("access_token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }

    this.state = {
      email: "",
      password: "",
      loggedIn,
    };

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    let body = {
      email: this.state.email,
      password: this.state.password
    }
    ApiService.login(body).then((res) => {
      console.log(res);
      if (res.data.status === "ok") {
        Swal.fire({
          icon: 'success',
          title: (res.data.message),
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          if (result.isDismissed) {
            console.log(res.data.message);
            localStorage.setItem('access_token', res.data.token.access_token)
            localStorage.setItem('refresh_token', res.data.token.refresh_token)
            // localStorage.setItem('token', JSON.stringify(res.data.token));
            window.location.href = "/home";
          }
        });
      } else {
        console.log(res.data.message);
        Swal.fire({
          icon: "error",
          title: (res.message),
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
          if (result.isDismissed) {
            window.history.back();
          }
        });
      }
    });

    // const { email, password } = this.state

    // if(email === "admin@123" && password === "admin")
    // {
    //     localStorage.setItem("token", "loggedIn")
    //     this.setState({
    //         loggedIn: true
    //     })
    //     console.log("Logged In!")
    // }
    // else
    // {
    //     alert("Invalid email or password!");
    //     console.log("Invalid email or password!")
    // }

    // $.post("http://localhost/api_react/login.php", function (data) {
    //   if (data === "1") {
    //     localStorage.setItem("token", "loggedIn");
    //     console.log("success!");
    //   } else if (data === "0") {
    //     console.log("sorry!");
    //   }
    // });
  }

  logout() {
    ApiService.logout();
    // this.isLogin = false;
    window.location.href = "/home";
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="hero is-fullheight">
        <div className="hero-body is-justify-content-center is-align-items-center">
          <form onSubmit={this.submitForm} className="columns is-flex is-flex-direction-column box">
            <div className="column">
              <label htmlFor="email">Email</label>
              <input className="input is-primary" type="text" placeholder="Email address" name="email" value={this.state.email} onChange={this.onChange} />
            </div>
            <div className="column">
              <label htmlFor="Name">Password</label>
              <input className="input is-primary" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
              <a href="forget.html" className="is-size-7 has-text-primary">forget password?</a>
            </div>
            <div className="column">
              <button className="button is-primary is-fullwidth" type="submit">Login</button>
            </div>
            {/* <div class="has-text-centered">
              <p class="is-size-7"> Don't have an account? <a href="#" class="has-text-primary">Sign up</a>
              </p>
            </div> */}
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
