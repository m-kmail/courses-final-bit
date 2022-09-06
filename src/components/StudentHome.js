import React, { Component } from "react";
import Course from "./Course";
import axios from "axios";
import "../styles/student.css";
import SearchedCourse from "./SearchedCourse";
import { Link } from "react-router-dom";

class StudentHome extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      search: "",
      filter: "",
      custom: {},
      searchedCourses: { courses: [], display: "" },
      sortedCourse: {},
      tables: { display: "none" },
    };
  }
  changeSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };
  changeFilter = (e) => {
    this.setState({
      filter: e.target.value,
    });
  };

  async componentDidMount() {
    let userInfo = await axios.get("http://localhost:5000/sessionInfo");

    if (userInfo == undefined || userInfo.data.email == undefined) {
      window.location = "/";
    } else {
      if (userInfo.data.roll == "Teacher") window.location = "/teacherhome";
      else {
        let courses = await this.getCourses();
        this.setState({
          courses: courses.data,
        });
      }
    }
  }
  async getSearchCourses(searchCourse) {
    let x = await axios.get(
      `http://localhost:5000/searchCourses?${searchCourse.filter}=${searchCourse.search}`
    );
    return x;
  }
  searchCourses = () => {
    let x = this.getSearchCourses(this.state);

    x.then((x) => {
      let copy = { ...this.state.searchedCourses };
      copy.courses = x.data;
      this.setState({ searchedCourses: copy });
    });
  };
  componentDidUpdate() {
    this.componentDidMount();
  }
  async getCourses() {
    return await axios.get("http://localhost:5000/courses");
  }

  async logout() {
    await axios.get("http://localhost:5000/logout");

    window.location = "/";
  }
  async deleteCourse(courseId) {
    return await axios.delete(`http://localhost:5000/course/${courseId}`);
  }

  async addCourse(courseid) {
    await axios.put("http://localhost:5000/course", { courseId: courseid });
    console.log("added");
  }

  sortCourses = () => {
    let allCoursrs = this.state.courses;

    let mappedCourses = {
      Saturday: [],
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
    };
    for (let c of allCoursrs) {
      let days = c.Days;
      days = days.split("/");

      mappedCourses[days[0]].push({ name: c.Name, time: c.Time });
      mappedCourses[days[1]].push({ name: c.Name, time: c.Time });
    }

    Object.keys(mappedCourses).forEach((day) => {
      mappedCourses[day].sort((a, b) => {
        let x = a.time[0] + a.time[1];
        let y = b.time[0] + b.time[1];
        return x - y;
      });
    });

    this.setState({ sortedCourse: mappedCourses });
  };

  render() {
    return (
      <div className="student-home">
        <div className="backGround"></div>
        <div className="content">
          <div className="nav">
            <button className="myProfile Btn">My Profile</button>
            <button className="myTable Btn" onClick={this.sortCourses}>
              Office hour
            </button>

            <button onClick={this.showAddToCourse} className="joinCourse Btn">
              join course
            </button>
            <button className="moodle Btn">moodle</button>
            <button onClick={this.logout} className="logout Btn">
              log out
            </button>
          </div>

          <div className="contentView">
            <div className="coursesView">
              {this.state.custom.display != "none" ? (
                this.state.searchedCourses.courses.map((el) => {
                  let existed = false;
                  this.state.courses.map((c) => {
                    if (c.Time == el.Time && c.Days == el.Days) {
                      existed = true;
                    }
                  });
                  return (
                    <SearchedCourse
                      existed={existed}
                      info={el}
                      addCourse={this.addCourse}
                    />
                  );
                })
              ) : (
                <div>
                  {this.state.courses.map((t) => (
                    <Course
                      key={t._id}
                      data={t}
                      deleteCourse={this.deleteCourse}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="addToCourseContainer">
              <h1>Join Course</h1>
              <div className="inputsDiv">
                <input
                  placeholder="type your search"
                  type="search"
                  value={this.state.search}
                  onChange={this.changeSearch}
                />
                <div className="courseNameDiv">
                  <input
                    type="radio"
                    id="course-name"
                    name="filter"
                    value="courseName"
                    onChange={this.changeFilter}
                  />
                  <label htmlFor="course-name">course name</label> 
                </div>
                <div className="teacherNameDiv">
                  <input
                    type="radio"
                    id="teacher-name"
                    name="filter"
                    value="teacherName"
                    onChange={this.changeFilter}
                  />
                   <label htmlFor="teacher-name">teacher name</label> 
                </div>
                <div className="allDiv">
                  <input
                    type="radio"
                    id="all"
                    name="filter"
                    value="all"
                    onChange={this.changeFilter}
                  />
                   <label htmlFor="all">all</label>
                </div>
                <button onClick={this.searchCourses} className="searchBtn">
                  search
                </button>
              </div>
            </div>

            <div className="schedul" style={{ display: "none" }}>
              <table>
                <thead>
                  <tr>
                    <td id="sub1"> </td>
                    <td id="sub">8:00-9:30</td>
                    <td id="sub">9:30-11:00</td>
                    <td id="sub">11:00-12:30</td>
                    <td id="sub">12:30-2:00</td>
                    <td id="sub">2:00-3:30</td>
                    <td id="sub">3:30-4:00</td>
                    <td id="sub">4:00-5:30</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td id="sub">Sunday</td>
                    <td id="box1"></td>
                    <td id="box2"></td>
                    <td id="box3"></td>
                    <td id="blank"></td>
                    <td id="box2"></td>
                    <td id="box2"></td>
                    <td id="sub2"></td>
                  </tr>
                  <tr>
                    <td id="sub">Monday</td>
                    <td id="box1"></td>
                    <td id="box2"></td>
                    <td id="box3"></td>
                    <td id="blank"></td>
                    <td id="box2"></td>
                    <td id="box2"></td>
                    <td id="sub2"></td>
                  </tr>
                  <tr>
                    <td id="sub">Tuseday</td>
                    <td id="box1"></td>
                    <td id="box2"></td>
                    <td id="box3"></td>
                    <td id="blank"></td>
                    <td id="box2"></td>
                    <td id="box2"></td>
                    <td id="sub2"></td>
                  </tr>
                  <tr>
                    <td id="sub">Wednesday</td>
                    <td id="box1"></td>
                    <td id="box2"></td>
                    <td id="box3"></td>
                    <td id="blank"></td>
                    <td id="box2"></td>
                    <td id="box2"></td>
                    <td id="sub2"></td>
                  </tr>
                  <tr>
                    <td id="sub">Thursday</td>
                    <td id="box1"></td>
                    <td id="box2"></td>
                    <td id="box3"></td>
                    <td id="blank"></td>
                    <td id="box2"></td>
                    <td id="box2"></td>
                    <td id="sub2"></td>
                  </tr>
                  <tr>
                    <td id="sub">Friday</td>
                    <td id="box1"></td>
                    <td id="box2"></td>
                    <td id="box3"></td>
                    <td id="blank"></td>
                    <td id="box2"></td>
                    <td id="box2"></td>
                    <td id="sub2"></td>
                  </tr>
                  <tr>
                    <td id="sub">Saturday</td>
                    <td id="box1"></td>
                    <td id="box2"></td>
                    <td id="box3"></td>
                    <td id="blank"></td>
                    <td id="box2"></td>
                    <td id="box2"></td>
                    <td id="sub2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentHome;
