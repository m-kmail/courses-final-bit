import React, { Component } from "react";
import axios from "axios";
import "../styles/studentMoodle.css";

class StudentMoodle extends Component {
  constructor() {
    super();

    this.state = {
      courses: [],
      searchStuts: "",
      showModel: { display: "block" },
      CourseDetail: { display: "none" },
    };
  }

  changeShowModel = () => {
    let moodleSHow = { ...this.state.showModel };
    let detailShow = { ...this.state.CourseDetail };
    if (moodleSHow.display == "block") {
      moodleSHow.display = "none";
      detailShow.display = "block";
    } else {
      moodleSHow.display = "block";
      detailShow.display = "none";
    }
    this.setState({ showModel: moodleSHow, CourseDetail: detailShow });
  };
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
      <div className="coursesContainer">
        <div style={this.state.showModel}>
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
                <div className="courseDiv" onClick={this.changeShowModel}>
                  <h3> {t.Name}</h3>
                </div>
              ))}
          </div>
        </div>

        <div style={this.state.CourseDetail}>courseDetail</div>
      </div>
    );
  }
}

export default StudentMoodle;
