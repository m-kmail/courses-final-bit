import React, { Component } from "react";
import axios from "axios";
class TeacherMoodle extends Component {
  constructor() {
    super();

    this.state = {
      courses: [],
      searchStuts: "",
    };
  }

  courseFilter = (e) => {
    this.setState({ searchStuts: e.target.value });
  };

  async getCourses() {
    let courses = await axios.get("http://localhost:5000/courses");
    return courses;
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
  render() {
    return (
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
          {this.state.courses
            .filter((course) => course.Status == this.state.searchStuts)
            .map((t) => (
              <div className="courseDiv">
                <h3> {t.Name}</h3>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default TeacherMoodle;
