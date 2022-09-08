import React, { Component } from "react";
import "../styles/TeacherMoodle.css";
import axios from "axios";
class TeacherMoodle extends Component {
  constructor() {
    super();

    this.state = {
      examName: "",
      showTF: { display: "none" },
      showMultiple: { display: "none" },
      courseSelected: "",
      courses: [],
      searchStuts: "",
      showModel: { display: "block" },
      CourseDetail: { display: "none" },
      file: {},
      showFormQuiz: { display: "none" },
      questions: [],
      newQuestion: {
        question: null,
        answer: null,
        choices: {},
        isMultiple: null,
      },
      showBuildQuiz: { display: "block" },
      showClearQuiz: { display: "none" },
      showSaveQuiz: { display: "none" },
      emptyName: { display: "none" },
    };
  }
  changeExamName = (e) => {
    this.setState({
      examName: e.target.value,
    });
  };
  insertNewQuestion = () => {
    let copyQuestions = [...this.state.questions];
    copyQuestions.push(this.state.newQuestion);
    let copyNewQuestion = { ...this.state.newQuestion };
    copyNewQuestion.courseId = this.state.courseSelected;
    this.setState(
      {
        questions: copyQuestions,
        newQuestion: copyNewQuestion,
      },
      function () {
        axios.post("http://localhost:5000/question", this.state.newQuestion);
      }
    );
  };
  empty = () => {
    return this.state.examName == "";
  };
  buildQuiz = () => {
    if (!this.empty()) {
      let empty = this.state.emptyName;
      empty = { display: "none" };
      this.setState({ emptyName: empty });

      let showFormQuizCopy = { ...this.state.showFormQuiz };
      showFormQuizCopy.display = "block";
      this.setState({ showFormQuiz: showFormQuizCopy });
      this.changeShowBuildQuiz();
      let bodyExam = {
        Name: this.state.examName,
        courseId: this.state.courseSelected,
      };
      axios.post("http://localhost:5000/exam", bodyExam);
    } else {
      let empty = this.state.emptyName;
      empty = { display: "block" };
      this.setState({ emptyName: empty });
    }
  };
  goBack = () => {
    let showFormQuizCopy = { ...this.state.showFormQuiz };
    showFormQuizCopy.display = "none";
    this.setState({ showFormQuiz: showFormQuizCopy });
    this.changeShowBuildQuiz();
  };
  cancelBuildQuiz = () => {
    let showFormQuizCopy = { ...this.state.showFormQuiz };
    showFormQuizCopy.display = "none";
    this.setState({ showFormQuiz: showFormQuizCopy });
    this.changeShowBuildQuiz();

    axios.delete(`http://localhost:5000/exam/${this.state.courseSelected}`);
  };
  changeShowBuildQuiz = () => {
    let showSaveQuizCopy = { ...this.state.showSaveQuiz };
    let showClearQuizCopy = { ...this.state.showClearQuiz };
    let showBuildQuizCopy = { ...this.state.showBuildQuiz };
    if (showBuildQuizCopy.display == "none") {
      showBuildQuizCopy.display = "block";
      showClearQuizCopy.display = "none";
      showSaveQuizCopy.display = "none";
    } else {
      showBuildQuizCopy.display = "none";
      showClearQuizCopy.display = "block";
      showSaveQuizCopy.display = "block";
    }
    this.setState({
      showBuildQuiz: showBuildQuizCopy,
      showClearQuiz: showClearQuizCopy,
      showSaveQuiz: showSaveQuizCopy,
    });
  };
  handleTF = (e) => {
    let inputClass = e.target.className;
    let input = e.target.value;
    let inputs = { ...this.state.newQuestion };
    if (input == "False") input = "B";
    else if (input == "True") input = "A";
    inputs[inputClass] = input;
    inputs["isMultiple"] = false;
    inputs["choices"] = { A: "True", B: "False" };
    this.setState({
      newQuestion: inputs,
    });
  };
  handleMultiple = (e) => {
    let inputClass = e.target.className;
    let input = e.target.value;
    let inputs = { ...this.state.newQuestion };
    if (inputClass.includes("choices")) {
      let choice = inputClass.split("-")[1];
      inputs["choices"][choice] = input;
    } else {
      inputs[inputClass] = input;
    }
    inputs["isMultiple"] = true;
    this.setState({
      newQuestion: inputs,
    });
  };

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
  showMultiple = () => {
    let showMultiple = { ...this.state.showMultiple };
    let showTf = { ...this.state.showTF };
    showMultiple.display = "block";
    showTf.display = "none";
    this.setState({
      showMultiple: showMultiple,
      showTF: showTf,
    });
  };
  showTF = () => {
    let showMultiple = { ...this.state.showMultiple };
    let showTf = { ...this.state.showTF };
    showMultiple.display = "none";
    showTf.display = "block";
    this.setState({
      showMultiple: showMultiple,
      showTF: showTf,
    });
  };

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
  openExam = (e) => {
    let examStatus = {
      status: e.target.checked,
      courseId: this.state.courseSelected,
    };
    axios.put("http://localhost:5000/openExam", examStatus);
  };
  render() {
    return (
      <div>
        {" "}
        <div className="moodelNav">
          <div className="nameMood"> Welcome In Moodel</div>
        </div>
        <div className="coursesContainerT">
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
            <div className="coursesT">
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
            </div>

            <div className="quizForm">
              <div className="createQuiz" style={this.state.showFormQuiz}>
                <button
                  className="clearCourse"
                  onClick={this.cancelBuildQuiz}
                  style={this.state.showClearQuiz}
                >
                  Clear Quiz
                </button>

                <button onClick={this.goBack}>cancle</button>

                {this.state.questions.map((element) => {
                  return (
                    <div className="choicesBorder">
                      <p>{element.question}</p>
                      {Object.keys(element.choices).map((choice) => (
                        <div>
                          <span>
                            {choice}:{element.choices[choice]}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })}
                <div className="NewTF" style={this.state.showTF}>
                  <input
                    className="question"
                    value={this.state.newQuestion.question}
                    onChange={this.handleTF}
                    type="text"
                    placeholder="Write the question here"
                  />
                  <div>
                    <label htmlFor="choices">Choose the right solution</label>
                    <select
                      className="answer"
                      name="choices"
                      id="cars"
                      onChange={this.handleTF}
                    >
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </select>
                  </div>
                  <button className="saveQ" onClick={this.insertNewQuestion}>
                    Save question
                  </button>
                </div>
                <div className="newMultiple" style={this.state.showMultiple}>
                  <input
                    className="question"
                    value={this.state.newQuestion.question}
                    type="text"
                    onChange={this.handleMultiple}
                    placeholder="Write the question here"
                  />
                  <input
                    className="choices-A"
                    value={this.state.newQuestion.choices["A"]}
                    type="text"
                    onChange={this.handleMultiple}
                    placeholder="Write the first choice here"
                  />
                  <input
                    className="choices-B"
                    value={this.state.newQuestion.choices["B"]}
                    type="text"
                    onChange={this.handleMultiple}
                    placeholder="Write the second choice here"
                  />
                  <input
                    className="choices-C"
                    value={this.state.newQuestion.choices["C"]}
                    type="text"
                    onChange={this.handleMultiple}
                    placeholder="Write the third choice here"
                  />
                  <input
                    className="choices-D"
                    value={this.state.newQuestion.choices["D"]}
                    type="text"
                    onChange={this.handleMultiple}
                    placeholder="Write the fourth choice here"
                  />
                  <div>
                    <label htmlFor="choices">Choose the right solution</label>
                    <select
                      className="answer"
                      name="choices"
                      id="cars"
                      onChange={this.handleMultiple}
                    >
                      <option value="a">A</option>
                      <option value="b">B</option>
                      <option value="c">C</option>
                      <option value="d">D</option>
                    </select>
                  </div>
                  <button onClick={this.insertNewQuestion}>
                    Save question
                  </button>
                </div>
                <div onClick={this.showTF}>
                  <input type="radio" id="T/F" name="type" value="T/F" />
                  <label for="T/F">T/F</label>
                </div>
                <div onClick={this.showMultiple}>
                  <input
                    type="radio"
                    id="MULTIPLE"
                    name="type"
                    value="Multiple"
                  />
                  <label for="MULTIPLE">Multiple</label>
                </div>
              </div>

              <div className="displayBtn">
                <h1 className="emptyERR" style={this.state.emptyName}>
                  Please Enter The Name Of This Exam
                </h1>
                <input
                  className="quzeName"
                  type="text"
                  placeholder="Quze Name"
                  value={this.state.examName}
                  onChange={this.changeExamName}
                />

                <button
                  className="createQuzeButton"
                  onClick={this.buildQuiz}
                  style={this.state.showBuildQuiz}
                >
                  Build Quiz
                </button>
                <input type="checkbox" onChange={this.openExam} />
                <label> Open Exam</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherMoodle;
