import React, { Component } from "react";
import axios from "axios";
class TeacherMoodle extends Component {
  async componentDidMount() {
    let userInfo = await axios.get("http://localhost:5000/sessionInfo");
    userInfo = userInfo.data;

    if (userInfo.email == undefined) {
      window.location = "/";
    } else {
      if (userInfo.roll == "Student") window.location = "/studenthome";
      else {
        //work here
      }
    }
  }
  render() {
    return <div>teacher moodle</div>;
  }
}

export default TeacherMoodle;
