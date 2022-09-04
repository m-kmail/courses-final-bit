import React, { Component } from "react";
import axios from "axios";

class StudentMoodle extends Component {
  async componentDidMount() {
    let isloggedin = await axios.get("http://localhost:5000/sessionInfo");
    if (isloggedin.data != "ok") {
      window.location = "/";
    } else {
      //work on the page
    }
  }
  render() {
    return <div>moodle student</div>;
  }
}

export default StudentMoodle;
