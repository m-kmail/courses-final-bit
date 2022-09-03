import React, { Component } from "react";
import "../styles/home.css";
import { Link, Redirect } from "react-router-dom";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      pass: "",
      roll: "",
      errorStyle: {},
      blankStyle: {},
    };
  }

  valuechanged = (e) => {
    let whatToChange = e.target.className;
    this.setState({ [whatToChange]: e.target.value });
  };

  empty = () => {
    return (
      this.state.email == "" || this.state.pass == "" || this.state.roll == ""
    );
  };

  login = () => {
    if (!this.empty()) {
      let attempt = this.props.login(
        this.state.email,
        this.state.pass,
        this.state.roll
      );
      attempt.then((x) =>
        x === null
          ? this.setState({
              errorStyle: { display: "block" },
              blankStyle: { display: "none" },
            })
          : this.setState({
              errorStyle: { display: "none" },
              blankStyle: { display: "none" },
            })
      );
    } else
      this.setState({
        errorStyle: { display: "none" },
        blankStyle: { display: "block" },
      });
  };

  render() {
    return (
      <div className="container">
        <div className="button-box">
          <Link to="/">
            <button type="button" className="toggle-btn" id="lgin">
              Log In
            </button>
          </Link>
          <Link to="/register">
            <button type="button" className="toggle-btn" id="rgs">
              Register
            </button>
          </Link>
        </div>
        <div className="main">
          <div className="Error" style={this.state.errorStyle}>
            Invalid Email or Password
          </div>
          <div className="Error" style={this.state.blankStyle}>
            Please Fill All The Fields
          </div>
          <h1>Login</h1>
          <span>
            <i className="fa fa-envelope"></i>
            <input
              type="text"
              placeholder="email"
              className="email"
              required
              value={this.state.email}
              onChange={this.valuechanged}
            ></input>
          </span>
          <br></br>
          <span>
            <i className="fa fa-lock"></i>
            <input
              type="password"
              placeholder="password"
              className="pass"
              required
              value={this.state.pass}
              onChange={this.valuechanged}
            ></input>
          </span>
          <br></br>

          <div className="roll" id="radios" onChange={this.valuechanged}>
            <input type="radio" className="roll" value="Student" name="roll" />
            <p className="radiotext">Student</p>
            <input type="radio" className="roll" value="Teacher" name="roll" />
            <p className="radiotext">Teacher</p>
          </div>

          <button className="loginbtn" onClick={this.login}>
            login
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
