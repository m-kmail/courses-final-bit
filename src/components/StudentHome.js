import React, { Component } from "react";
import Course from "./Course";
import "../styles/teacher.css";
import { Outlet } from "react-router-dom";
import axios from "axios";
class StudentHome extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
    };
  }

  async componentDidMount() {
    let isloggedin = await axios.get("http://localhost:5000/sessionInfo");
    if (isloggedin.data != "ok") {
      //todo ===> change the returned type from get => to response with status
      window.location = "/";
    } else {
      let courses = await this.getCourses();
      this.setState({
        courses: courses.data,
      });
    }
  }

  componentDidUpdate() {
    this.componentDidMount();
  }
  async getCourses() {
    return await axios.get("http://localhost:5000/courses");
  }
  async logout() {
    await axios.get("`http://localhost:5000/logout");

    window.location = "/";
  }
  render() {
    return (
      <div className="student-home">
        <div className="nav">
          <button className="myProfile">My Profile</button>
          <button className="myTable">Office hour</button>
          <button className="joinCourse">join course</button>
          <button className="moodle">moodle</button>
        </div>
        <div>
          {this.state.courses.map((t) => (
            <Course key={t._id} data={t} />
          ))}
          <Outlet />
        </div>
      </div>
    );
  }
}

export default StudentHome;
