import React, { Component } from "react";
import Course from "./Course";
import "../styles/teacher.css";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

class StudentHome extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
    };
  }

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

  componentDidUpdate() {
    this.componentDidMount();
  }
  async getCourses() {
    return await axios.get("http://localhost:5000/courses");
  }
  searchCourses = (stateSearch) => {
    this.props.searchCourses(stateSearch);
  };
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
          <Link to="joinCourse">
            <button className="joinCourse">join course</button>
          </Link>
          <button className="moodle">moodle</button>
          <button className="moodle">log out</button>
        </div>
        <div>
          {this.state.courses.map((t) => (
            <Course key={t._id} data={t} />
          ))}
          <Outlet />

          <div>
            {this.props.searchedCourses ? (
              this.props.searchedCourses.map((el) => (
                <div>
                  <p>{el.Name}</p>
                  <p>{el.Days}</p>
                  <p>{el.Time}</p>
                  <p>{el.CreditHours}</p>
                </div>
              ))
            ) : (
              <div>no searched</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default StudentHome;
