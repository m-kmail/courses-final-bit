import React, { Component } from "react";
import axios from "axios";

class StudentMoodle extends Component {
  async componentDidMount() {
    let userInfo = await axios.get("http://localhost:5000/sessionInfo");
    userInfo = userInfo.data;

    if (userInfo.email == undefined) {
      window.location = "/";
    } else {
      if (userInfo.roll == "Teacher") window.location = "/teacherhome";
      else {
        let courses = await this.getCourses();
        this.setState({
          courses: courses.data,
        });
      }
    }
  }
  render() {
    return <div>moodle student</div>;
  }
}

export default StudentMoodle;
