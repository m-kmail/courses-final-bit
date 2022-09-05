import React, { Component } from "react";
import Course from "./Course";
import axios from "axios";
import "../styles/student.css";
import SearchedCourse from "./SearchedCourse";

class StudentHome extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      search: "",
      filter: "",
      custom: {},
      searchedCourses: { courses: [], display: "" },
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
  deleteCourse = (courseId) => {};
  showAddToCourse = () => {
    let searchedCopy = { ...this.state.searchedCourses };
    let customCopy = { ...this.state.custom };
    if (customCopy.display !== "block") {
      customCopy.display = "block";
    } else {
      customCopy.display = "none";
    }
    if (searchedCopy.display !== "block") {
      searchedCopy.display = "block";
    } else {
      searchedCopy.display = "none";
    }
    this.setState({
      custom: customCopy,
      searchedCourses: searchedCopy,
    });
  };

  async addCourse(courseid) {
    console.log(courseid);
    await axios.put("http://localhost:5000/course", { courseId: courseid });
    console.log("added");
  }
  render() {
    return (
      <div className="student-home">
        <div className="backGround"></div>
        <div className="content">
          <div className="nav">
            <button className="myProfile Btn">My Profile</button>
            <button className="myTable Btn">Office hour</button>
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
                    <Course key={t._id} data={t} />
                  ))}
                </div>
              )}
            </div>

            <div className="addToCourseContainer" style={this.state.custom}>
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
          </div>
        </div>
      </div>
    );
  }
}

export default StudentHome;
