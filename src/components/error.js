import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/error.css";

class Error extends Component {
  render() {
    return (
      <div className="errorPage">
        <div className="errorText">ERROR 404 </div>
        <br></br>
        <div className="errorText">NOT FOUND</div>
        <Link to="/">
          <button className="btn">Back to Home</button>
        </Link>
      </div>
    );
  }
}

export default Error;
