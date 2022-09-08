import React, { Component } from "react";
import axios from "axios";
import "../styles/studentMoodle.css";
class StudentMoodle extends Component {
  constructor() {
    super();

    this.state = {
      examCourse: null,
      filePath: null,
      courseSelected: "",
      courses: [],
      searchStuts: "",
      radioAnswers: {},
      showModel: { display: "block" },
      CourseDetail: { display: "none" },
      customDisplay: { courses: { display: "block" } },
    };
  }

  changeShowModel = (e) => {
    this.state.courses.map((course) => {
      if (course._id == e.currentTarget.getAttribute("data") && course.File)
        this.setState({ filePath: course.File.path.substring(8) });
    });
    let moodleSHow = { ...this.state.showModel };
    let detailShow = { ...this.state.CourseDetail };
    if (moodleSHow.display == "block") {
      moodleSHow.display = "none";
      detailShow.display = "flex";
    } else {
      moodleSHow.display = "block";
      detailShow.display = "none";
    }
    this.setState(
      {
        showModel: moodleSHow,
        CourseDetail: detailShow,
        courseSelected: e.currentTarget.getAttribute("data"),
      },
      function () {
        this.getQuiz();
      }
    );
  };
  courseFilter = (e) => {
    this.setState({ searchStuts: e.target.value });
  };

  async getCourses() {
    let courses = await axios.get("http://localhost:5000/courses");
    return courses;
  }
  async getQuiz() {
    let courses = await axios.get(
      `http://localhost:5000/exam/${this.state.courseSelected}`
    );
    this.setState({ examCourse: courses.data });
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
  FinalsubmitQuiz = () => {
    let finalGrade = "";
    let grade = 100;
    let successGrade = grade * 0.6;
    let length = this.state.examCourse.Questions.length;
    let weight = grade / length;
    this.state.examCourse.Questions.map((question, index) => {
      if (question.answer == this.state.radioAnswers[index]) {
      } else grade -= weight;
    });
    if (successGrade <= grade) finalGrade = "sucess";
    else {
      finalGrade = "failed";
    }
    let gradeStatus = {
      courseId: this.state.courseSelected,
      status: finalGrade,
    };
    axios.put("http://localhost:5000/grade", gradeStatus);
  };

  changeRadioAnswer = (e) => {
    let questionNumber = e.currentTarget.getAttribute("data")[1];
    let userAnswer = e.currentTarget.getAttribute("data")[0];
    let asnwersCopy = { ...this.state.radioAnswers };
    asnwersCopy[questionNumber] = userAnswer;
    this.setState({
      radioAnswers: asnwersCopy,
    });
  };
  render() {
    return (
      <div className="studentMoodleContainer">
        <div className="moodelNav">
          <div className="nameMood"> Welcome In Moodel</div>
        </div>
        <div className="coursesContainer" style={this.state.showModel}>
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
        <div className="courseDetailContainer" style={this.state.CourseDetail}>
          {/* <div className="fileContainer">
            <div className="courseChapters">
              <h2 className="titleCourse">CHAPTER 1</h2>
              {this.state.filePath ? (
                <a
                  className="pdfFile"
                  href={`http://localhost:5000/uploads/${this.state.filePath}`}
                >
                  <i class="fa fa-file-pdf-o" aria-hidden="true">
                    PDF file
                  </i>
                </a>
              ) : (
                <div>No files to display</div>
              )}
            </div>
            <div className="courseChapters">
              <h2 className="titleCourse">CHAPTER 2</h2>

              <div className="pdfFile">No files to display</div>
            </div>
            <div className="courseChapters">
              <h2 className="titleCourse">CHAPTER 3</h2>

              <div className="pdfFile">No files to display</div>
            </div>
          </div> */}
          <div className="quizField">
            <div className="quizTitle">Exam</div>
            {this.state.examCourse ? (
              <div className="examContent">
                <h4 className="examName">{this.state.examCourse.Name}</h4>
                <div className="examQuestions">
                  {this.state.examCourse.Questions.map((element, index1) => {
                    return (
                      <div className="examQuestion">
                        <div className="questionTitle">{element.question}</div>
                        <div className="questionChoice">
                          {Object.keys(element.choices[0]).map((choice) => {
                            return (
                              <div className="choicesContent">
                                <input
                                  onChange={this.changeRadioAnswer}
                                  type="radio"
                                  name={index1}
                                  data={choice + index1}
                                />
                                <span className="header">{choice}:</span>
                                <span className="toAnswer">
                                  {element.choices[0][choice]}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  <button className="submitExam" onClick={this.FinalsubmitQuiz}>
                    submit Exam
                  </button>
                </div>
              </div>
            ) : (
              <div>no exam</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default StudentMoodle;
