import React, { Component } from "react";
import Course from "./Course";
import "../styles/teacher.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axios from "axios";

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

  async createCourse(newCourse) {
    console.log("t");
    let a = await this.props.createCourse(newCourse);
    console.log(a);
  }

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
      <>
        <div className="teacher">
          <div className="nav">
            <button className="myProfile">My Profile</button>
            <button className="myTable">My Table</button>
            <Link to="createCourse">
              <button className="addCourse">add course</button>
            </Link>
          </div>
          <div>
            {this.state.courses.map((t) => (
              <Course key={t._id} data={t} deleteCourse={this.deleteCourse} />
            ))}
          </div>
        </div>
        <Outlet />
      </>
    );
  }
}
export default TeacherHome;
