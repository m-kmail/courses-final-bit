import React, { Component } from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      pass: "",
      gender: "",
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
      this.state.email == "" ||
      this.state.pass == "" ||
      this.state.name == "" ||
      this.state.gender == ""
    );
  };

  isValidEmail = () => {
    let email = this.state.email;
    let indx;
    if (email.includes("@gmail.com")) indx = email.indexOf("@gmail.com") + 10;
    else return false;

    if (indx < email.length) return false;
    email = email.slice(0, indx - 10);
    return !(email.includes(".") || email.includes("@") || email.includes("$"));
  };

  register = () => {
    if (!this.empty()) {
      if (this.isValidEmail()) {
        const userInfo = {
          Name: this.state.name,
          Email: this.state.email,
          Gender: this.state.gender,
          Password: this.state.pass,
        };
        let attempt = this.props.register(userInfo);
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
      } else {
        this.setState({
          errorStyle: { display: "block" },
          blankStyle: { display: "none" },
        });
      }
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
          <h1>Register</h1>
          <span>
            <i className="fa fa-user"></i>
            <input
              type="text"
              placeholder="Name"
              className="name"
              required
              value={this.state.name}
              onChange={this.valuechanged}
            ></input>
          </span>
          <br></br>
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
              value={this.state.password}
              onChange={this.valuechanged}
            ></input>
          </span>
          <br></br>
          <div className="gender" id="radios" onChange={this.valuechanged}>
            <input type="radio" className="gender" value="Male" name="gender" />
            <p className="radiotext">Male</p>
            <input
              type="radio"
              className="gender"
              value="Female"
              name="gender"
            />
            <p className="radiotext">Female</p>
          </div>
          <button className="regbtn" onClick={this.register}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
