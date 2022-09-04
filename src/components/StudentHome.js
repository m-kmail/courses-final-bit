import React, { Component } from "react";
import Course from "./Course";
import "../styles/teacher.css";
import axios from "axios";

class StudentHome extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      search: "",
      filter: "",
      custom: {},
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
  async getSearchCourses(searchCourse) {
    console.log(searchCourse.search);
    let x = await axios.get(
      `http://localhost:5000/searchCourses?${searchCourse.filter}=${searchCourse.search}`
    );
    return x;
  }
  searchCourses = () => {
    let x = this.getSearchCourses(this.state);
    x.then((x) => this.setState({ searchedCourses: x.data }));
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
  showAddToCourse = () => {
    let customCopy = { ...this.state.custom };
    if (customCopy.display !== "block") {
      customCopy = {
        display: "block",
      };
    } else {
      customCopy = {
        display: "none",
      };
    }

    this.setState({
      custom: customCopy,
    });
  };
  render() {
    return (
      <div className="student-home">
        <div className="nav">
          <button className="myProfile">My Profile</button>
          <button className="myTable">Office hour</button>

          <button onClick={this.showAddToCourse} className="joinCourse">
            join course
          </button>

          <button className="moodle">moodle</button>
          <button onClick={this.logout} className="logout">
            log out
          </button>
        </div>
        <div>
          {this.state.courses.map((t) => (
            <Course key={t._id} data={t} />
          ))}
          <div className="addToCourseContainer" style={this.state.custom}>
            <input
              type="search"
              value={this.state.search}
              onChange={this.changeSearch}
            />
            <input
              type="radio"
              id="course-name"
              name="filter"
              value="courseName"
              onChange={this.changeFilter}
            />
            <label htmlFor="course-name">course name</label> {" "}
            <input
              type="radio"
              id="teacher-name"
              name="filter"
              value="teacherName"
              onChange={this.changeFilter}
            />
             <label htmlFor="teacher-name">teacher name</label> 
            <input
              type="radio"
              id="all"
              name="filter"
              value="all"
              onChange={this.changeFilter}
            />
             <label htmlFor="all">all</label>
            <button onClick={this.searchCourses}>search</button>
            {this.state.searchedCourses ? (
              this.state.searchedCourses.map((el) => (
                <div>
                  <p>{el.Name}</p>
                  <p>{el.Days}</p>
                  <p>{el.Time}</p>
                  <p>{el.CreditHours}</p>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default StudentHome;
