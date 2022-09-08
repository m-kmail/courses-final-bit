import React, { Component } from "react";
import axios from "axios";
import "../styles/studentMoodle.css";

class StudentMoodle extends Component {
  constructor() {
    super();

    this.state = {
      searchStuts: "",
      courses: [
        { courseName: "css", status: "In progress" },
        { courseName: "html", status: "past" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "past" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "past" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
        { courseName: "java", status: "In progress" },
      ],
      inprogress: [],
      past: [],
    };
  }

  courseFilter = (e) => {
    this.setState({ searchStuts: e.target.value });
    let progress = [];
    let past = [];
    this.state.courses.map((t) => {
      if (t.status === "In progress") {
        progress.push(t);
      } else {
        past.push(t);
      }
    });
    this.setState({ inprogress: progress, past: past });
  };

  async getCourses() {
    let courses = await axios.get();
    return courses;
  }

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
  render() {
    return (
      <div>
        <div className="moodelNav">
          <div className="nameMood"> Welcome In Moodel</div>
        </div>
        <div className="coursesContainer">
          <select
            className="typeCourseInput"
            value={this.state.searchStuts}
            onChange={this.courseFilter}
          >
            <option value="" disabled selected>
              Courses
            </option>
            <option value="in progress">In progress</option>
            <option value="past">past</option>
          </select>
          <div className="courses">
            {this.state.searchStuts === "in progress"
              ? this.state.inprogress.map((t) => (
                  <div className="courseDiv">
                    <h3> {t.courseName}</h3>
                  </div>
                ))
              : this.state.past.map((t) => (
                  <div className="courseDiv">
                    <h3> {t.courseName}</h3>
                  </div>
                ))}
          </div>
        </div>
      </div>
    );
  }
}

export default StudentMoodle;
