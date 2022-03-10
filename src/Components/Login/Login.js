import React from "react";
import PropTypes from "prop-types";
import "./Login.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import Register from "../Register/Register";
import User from "../User/User";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { submitted: false, username: "", password: "" };
  }

  handleChange = (e) => {
    this.setState({ submitted: false });
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (this.state.username !== "") {
      document
        .getElementById("inputusername")
        .setAttribute("placeholder", "USERNAME");
      document.getElementById("inputusername").classList.remove("red");
      document.getElementById("inputusername").style.border = "";
    }

    if (this.state.password !== "") {
      document
        .getElementById("inputpassword")
        .setAttribute("placeholder", "PASSWORD");
      document.getElementById("inputpassword").classList.remove("red");
      document.getElementById("inputpassword").style.border = "";
    }
  };

  submitLogin = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    if (this.state.username === "thanh" && this.state.password === "thanh") {
      localStorage.setItem("isLogined", true);
    } else if (this.state.username === "" && this.state.password === "") {
      document
        .getElementById("inputusername")
        .setAttribute("placeholder", "Username is required");
      document.getElementById("inputusername").classList.add("red");
      document.getElementById("inputusername").style.border = "1px red solid";

      document
        .getElementById("inputpassword")
        .setAttribute("placeholder", "Password is required");
      document.getElementById("inputpassword").classList.add("red");
      document.getElementById("inputpassword").style.border = "1px red solid";
    } else if (this.state.username === "") {
      document
        .getElementById("inputusername")
        .setAttribute("placeholder", "Username is required");
      document.getElementById("inputusername").classList.add("red");
      document.getElementById("inputusername").style.border = "1px red solid";
    } else if (this.state.password === "") {
      document
        .getElementById("inputpassword")
        .setAttribute("placeholder", "Password is required");
      document.getElementById("inputpassword").classList.add("red");
      document.getElementById("inputpassword").style.border = "1px red solid";
    }
  };

  render() {
    const { username, password, submitted } = this.state;
    const isLogined = localStorage.getItem("isLogined");

    if (isLogined === "true") {
      return (
        <Redirect
          to={{
            pathname: "/",
            //tate: { isLogined:true }
          }}
        />
      );
    }
    return (
      <div className="divlogin">
        <form id="form-login" onSubmit={this.submitLogin}>
          <div id="formlogin-header">
            <h2>SIGN IN</h2>
          </div>
          <hr width="119%" color="white"></hr>
          <div className ="form-group row">
            {/* <label class="col-sm-3 col-form-label">USERNAME</label> */}
            <div className ="col-sm-10 input-container">
              <i id="iconUser" className="fa fa-user icon"></i>
              <input
                className ="form-control"
                type="text"
                placeholder="USERNAME"
                value={username}
                onChange={this.handleChange}
                id="inputusername"
                autoComplete="off"
                name="username"
                autoFocus="on"
              />
              {/* {submitted && !username && (
                <span className="help-block">Username is required</span>
              )} */}
            </div>
          </div>
          <div className ="form-group row">
            {/* <label class="col-sm-3 col-form-label">PASSWORD</label> */}
            <div className ="col-sm-10 input-container">
              <i id="iconkey" className="fa fa-key icon"></i>
              <input
                className ="form-control"
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={this.handleChange}
                id="inputpassword"
                name="password"
              />
              {/* {submitted && !password && (
                <span className="help-block">Password is required</span>
              )} */}
            </div>
          </div>
          <div className ="form-group row">
            <div className ="col-sm-10">
              <button type="submit" className ="btn btn-primary btn-lg btn-block">
                SIGN IN
              </button>
            </div>
          </div>
          <div className ="form-group row">
            <div className ="col-sm-10">
              <Link to="/Register">Create New Account</Link>
              {submitted &&
                password !== "" &&
                password !== "thanh" &&
                username !== "" &&
                username !== "thanh" && (
                  <span className="help-block">
                    Username or Password is wrong
                  </span>
                )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
