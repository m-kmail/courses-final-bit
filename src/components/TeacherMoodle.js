import React, { Component } from "react";
import "../styles/TeacherMoodle.css";
import axios from "axios";
class TeacherMoodle extends Component {
  constructor() {
    super();

    this.state = {
      courseSelected: "",
      courses: [],
      searchStuts: "",
      showModel: { display: "block" },
      CourseDetail: { display: "none" },
      file: {},
    };
  }
  sendPDFToServer(formData) {
    const h = {};
    h.Accept = "application/json";
    axios.post(
      `http://localhost:5000/pdf_file/${this.state.courseSelected}`,
      formData,
      {
        headers: h,
      }
    );
  }
  uploadPDF = () => {
    const formData = new FormData();
    formData.append("PDF_FILE", this.state.file);
    this.sendPDFToServer(formData);
  };
  onInputChange = (e) => {
    this.setState({ file: e.target.files[0] });
  };
  changeShowModel = (e) => {
    let moodleSHow = { ...this.state.showModel };
    let detailShow = { ...this.state.CourseDetail };
    if (moodleSHow.display == "block") {
      moodleSHow.display = "none";
      detailShow.display = "block";
    } else {
      moodleSHow.display = "block";
      detailShow.display = "none";
    }
    this.setState({
      showModel: moodleSHow,
      CourseDetail: detailShow,
      courseSelected: e.currentTarget.getAttribute("data"),
    });
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
                <div
                  data={t._id}
                  className="courseDiv"
                  onClick={this.changeShowModel}
                >
                  <h3> {t.Name}</h3>
                </div>
              ))}
          </div>
        </div>
        <div style={this.state.CourseDetail}>
          <div>
            <div className="form-group files">
              <h1>Upload courses tutorial here </h1>
              <input
                type="file"
                onChange={this.onInputChange}
                className="form-control"
                multiple
              />
              <button className="upladFileBtn" onClick={this.uploadPDF}>
                Upload file
              </button>
            </div>
            <button>creat QUIZE</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherMoodle;
