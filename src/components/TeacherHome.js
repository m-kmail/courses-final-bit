import React, { Component } from "react";
import Course from "./Course";
import "../styles/teacher.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Routes,
} from "react-router-dom";
class TeacherHome extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
    };
  }

  async componentDidMount() {
    let courses = await this.getCourses();
    this.setState({
      courses: courses.data,
    });
  }

  componentDidUpdate() {
    this.componentDidMount();
  }

  createCourse = (e) => {
    let newCourse = {
      name: e.name,
      creditHours: e.creditHours,
      days: e.days,
      time: e.time,
    };
    axios.post("http://localhost:5000/courses", newCourse);
  };

  async getCourses() {
    return await axios.get("http://localhost:5000/courses");
  }

  async deleteCourse(id) {
    return await axios.delete(`http://localhost:5000/course/${id}`);
  }

  render() {
    /*
    const { match } = this.props;
    console.log(match.url);
    */
    return (
      <div className="teacher">
        <div className="nav">
          <button className="myProfile">My Profile</button>
          <button className="myTable">My Table</button>
          <Link to="/teacherhome/createCourse">
            <button className="addCourse">add course</button>
          </Link>
        </div>
        <div>
          {this.state.courses.map((t) => (
            <Course key={t._id} data={t} deleteCourse={this.deleteCourse} />
          ))}
          <Addcourse createCourse={this.createCourse} />
        </div>
      </div>
    );
  }
}
export default TeacherHome;
