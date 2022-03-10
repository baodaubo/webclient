import React from "react";
import PropTypes from "prop-types";
import "./Register.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


class Register extends React.Component {
  constructor() {
    super();
    this.state = { username: "", password: "" };
  }

  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="divlogin">
        <form id="form-register">
          <div id="formlogin-header">
            <h2>SIGN UP</h2>
          </div>
          <hr width="119%" color="white"></hr>
          <div class="form-group row">
            {/* <label class="col-sm-3 col-form-label">USERNAME</label> */}
            <div class="col-sm-10">
              <input
                class="form-control"
                type="text"
                placeholder="USERNAME"
                onChange={this.handleChangeUsername}
              />
            </div>
          </div>
          <div class="form-group row">
            {/* <label class="col-sm-3 col-form-label">PASSWORD</label> */}
            <div class="col-sm-10">
              <input
                class="form-control"
                type="password"
                placeholder="PASSWORD"
                onChange={this.handleChangePassword}
              />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-10">
              <button type="submit" class="btn btn-primary btn-lg btn-block">
                SIGN UP
              </button>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-10">
              <Link to="/Login">Sign In</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
