import React, { Component } from "react";
import Course from "./Course";
import "../styles/teacher.css";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
class TeacherHome extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      inputname: "",
      inputtime: "",
      inputday: "",
      inputCreditHour: "",
      showCreateCourse: { display: "none" },
    };
  }
  changeShowCreateCourse = () => {
    let newDisplay = { ...this.state.showCreateCourse };
    if (this.state.showCreateCourse.display !== "block") {
      newDisplay = { display: "block" };
    } else {
      newDisplay = { display: "none" };
    }
    this.setState({
      showCreateCourse: newDisplay,
    });
  };

  nameChanged = (e) => {
    this.setState({ inputname: e.target.value });
  };
  timeChanged = (e) => {
    this.setState({ inputtime: e.target.value });
  };
  dayChanged = (e) => {
    this.setState({ inputday: e.target.value });
  };
  creditHourChanged = (e) => {
    this.setState({ inputCreditHour: e.target.value });
  };

  createCourse = () => {
    let newCourse = {
      name: this.state.inputname,
      creditHours: this.state.inputCreditHour,
      days: this.state.inputday,
      time: this.state.inputtime,
    };
    this.createNewCourse(newCourse);
  };
  async createNewCourse(course) {
    let x;
    try {
      x = await axios.post("http://localhost:5000/courses", course);
    } catch (err) {
      alert("this time is already taken");
    }
  }
  async logout() {
    await axios.get("http://localhost:5000/logout");

    window.location = "/";
  }

  async componentDidMount() {
    let userInfo = await axios.get("http://localhost:5000/sessionInfo");

    if (userInfo == undefined || userInfo.data.email == undefined) {
      window.location = "/";
    } else {
      if (userInfo.data.roll == "Student") window.location = "/studenthome";
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

  async deleteCourse(id) {
    return await axios.delete(`http://localhost:5000/course/${id}`);
  }

  render() {
    return (
      <div className="teacher">
        <div className="backGround"></div>
        <div className="content">
          <div className="nav">
            <button className="myProfile Btn">My Profile</button>
            <button className="myTable Btn">Office hour</button>
            <button
              onClick={this.changeShowCreateCourse}
              className="addCourse Btn"
            >
              New Course
            </button>
            <button className="moodle Btn">Moodle</button>
            <button onClick={this.logout} className="logout Btn">
              Log out
            </button>
          </div>
          <div className="contentView">
            <div className="coursesView">
              {this.state.courses.map((t) => (
                <Course key={t._id} data={t} deleteCourse={this.deleteCourse} />
              ))}
            </div>
            <div className="addNewCourse" style={this.state.showCreateCourse}>
              <h1>New courses</h1>
              <div className="inputsDiv">
                <input
                  placeholder="Course Name"
                  onChange={this.nameChanged}
                  value={this.state.inputname}
                ></input>
                <input
                  placeholder="credit hour "
                  onChange={this.creditHourChanged}
                  value={this.state.inputCreditHour}
                ></input>

                <select
                  className="drop"
                  onChange={this.timeChanged}
                  value={this.state.inputtime}
                >
                  <option>08:00-09:30</option>
                  <option>09:30-11:00</option>
                  <option>11:00-12:30</option>
                  <option>12:30-2:00</option>
                </select>

                <select
                  className="drop"
                  onChange={this.dayChanged}
                  value={this.state.inputday}
                >
                  <option>Saturday/Tuesday</option>
                  <option>Sunday/Wednesday</option>
                  <option>Monday/Thursday</option>
                </select>
                <Link to="/teacherhome">
                  <button className="addButton" onClick={this.createCourse}>
                    add course
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherHome;
