import React, { Component } from "react";
import Course from "./Course";
import "../styles/teacher.css";
import Addcourse from "./Addcourse";
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
  add = (e) => {
    let x = [...this.state.courses];
    x.push(e);
    this.setState({ courses: x });
  };
  delete = (Name) => {
    let x = [...this.state.courses];
    let y = 0;
    for (let i in x) {
      if (x[i].Name === Name) {
        y = i;
        break;
      }
    }
    x.splice(y, 1);
    this.setState({ courses: x });
  };
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
            <Link to="add">
              <button className="addCourse">add course</button>
            </Link>
          </div>

          <div>
            {this.state.courses.map((t) => (
              <Course data={t} delete={this.delete} />
            ))}
          </div>
        </div>
        <Outlet />
      </>
    );
  }
}
export default TeacherHome;
