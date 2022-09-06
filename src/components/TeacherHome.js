import React, { Component, useInsertionEffect } from "react";
import Course from "./Course";
import "../styles/teacher.css";
import { Link } from "react-router-dom";
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
      newPassword: "",
      confirmPassword: "",
      imageChanged: null,
      user: {},
      customDisplays: {
        contentViewStyle: { display: "flex" },
        addStyle: { display: "none" },
        profileStyle: { display: "none" },
        erroeMessage: { display: "none" },
        floatBox: { display: "none" },
      },
    };
  }

  changePassword = () => {
    if(this.state.newPassword.length>0)
    axios.put("http://localhost:5000/user", { pass: this.state.newPassword });
  };
  async getUserInfo() {
    let x = await axios.get("http://localhost:5000/userinfo");
    return x.data;
  }
  passwordChanged = (e) => {
    this.setState({ newPassword: e.target.value });
  };
  confirmPasswordChanged = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };
  imgChanged = (e) => {
    let userModified = { ...this.state.imageChanged };
    userModified = e.target.files[0];
    this.setState({ imageChanged: userModified });
  };
  removeImg = () => {
    let userModified = { ...this.state.imageChanged };
    userModified = null;
    this.setState({ imageChanged: userModified });
  };
  sendImageToServer(formData) {
    const h = {};
    h.Accept = "application/json";
    axios.post("http://localhost:5000/upload_file", formData, {
      headers: h,
    });
  }
  uploadImg = () => {
    const formData = new FormData();
    formData.append("myFile", this.state.imageChanged);
    this.sendImageToServer(formData);
  };
  add = (e) => {
    if (e.currentTarget.className === "addModify") {
      if (this.state.newPassword != this.state.confirmPassword) {
        let cur = this.state.customDisplays;
        cur.erroeMessage = { display: "block" };
        this.setState({ customDisplays: cur });
      } else {
        let y = {
          password: this.state.newPassword,
        };
        this.setState({ user: y });
        this.hideFloatBox();
        this.changePassword();
      }
    }
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
        let x = this.getUserInfo();
        x.then((e) => this.setState({ user: e }));
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
  toggleAddOptions = () => {
    let current = this.state.customDisplays;
    current.profileStyle = { display: "none" };
    current.addStyle.display == "none"
      ? (current.addStyle = { display: "flex" })
      : (current.addStyle = { display: "none" });

    this.setState({ customDisplays: current });
  };
  showProfile = () => {
    let current = this.state.customDisplays;
    current.addStyle = { display: "none" };
    current.contentViewStyle = { display: "none" };
    current.profileStyle = { display: "block" };
    this.setState({ customDisplays: current });
  };
  closeProfile = () => {
    let current = this.state.customDisplays;
    current.addStyle = { display: "none" };
    current.contentViewStyle = { display: "flex" };
    current.profileStyle = { display: "none" };
    this.setState({ customDisplays: current });
  };
  showFloatBox = () => {
    let current = this.state.customDisplays;
    current.floatBox = { display: "block" };
    this.setState({ customDisplays: current });
  };
  hideFloatBox = () => {
    let current = this.state.customDisplays;
    current.floatBox = { display: "none" };
    this.setState({ customDisplays: current });
  };
  render() {
    return (
      <div className="teacher">
        <div className="backGround"></div>
        <div className="content">
          <div
            className="profile"
            style={this.state.customDisplays.profileStyle}
          >
            <div className="info">
              <div className="userName">
                <h2 className="userdata">{this.state.user.name}</h2>
                {this.state.user.img ? (
                  <img
                    className="profileImg"
                    src={`http://localhost:5000/uploads/${this.state.user.img.path.substring(
                      8
                    )}`}
                  />
                ) : null}
              </div>
              <div className="userInfo">
                <h3 className="userdata">Informations</h3>
                <div className="myData">
                  <h4 className="userdata">Email :</h4>
                  <p className="userdata">{this.state.user.email}</p>
                  <h4 className="userdata">gender :</h4>
                  <p className="userdata">{this.state.user.gender}</p>
                </div>

                <button className="modify" onClick={this.showFloatBox}>
                  Modify Data
                </button>
                <button className="back" onClick={this.closeProfile}>
                  cancel
                </button>
     

                <div id="blackout" style={this.state.customDisplays.floatBox}>
                  <div id="box" style={this.state.customDisplays.floatBox}>
                    <div className="modifyData">
                      <p
                        className="far fa-times-circle"
                        onClick={this.hideFloatBox}
                      ></p>

                      <div className="newData">
                        <div
                          className="errorMassege"
                          style={this.state.customDisplays.erroeMessage}
                        >
                          password did not match
                        </div>
                        <input
                          value={this.state.newPassword}
                          onChange={this.passwordChanged}
                          className="newDataInput passDataInput"
                          type="password"
                          placeholder="New Password"
                        ></input>
                        <input
                          value={this.state.confirmPassword}
                          onChange={this.confirmPasswordChanged}
                          className="newDataInput passDataInput"
                          type="password"
                          placeholder="Confirm password"
                        ></input>
                        <div className="imagechange">
                          <input
                            type="file"
                            name="myImage"
                            onChange={this.imgChanged}
                          />
                          <button
                            className="removeImg"
                            onClick={this.removeImg}
                          >
                            Remove Image
                          </button>
                          <button
                            className="uploadImg"
                            onClick={this.uploadImg}
                          >
                            upload Image
                          </button>
                        </div>
                      </div>

                      <button onClick={this.add} className="addModify">
                        Modify
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nav">
            <button className="myProfile Btn" onClick={this.showProfile}>
              Edit Profile
            </button>

            <button className="myTable Btn">Office hour</button>
            <button className="addCourse Btn" onClick={this.toggleAddOptions}>
              New Course
            </button>
            <Link to="/teachermoodle">
            <button className="moodle Btn">Moodle</button>
            </Link>
            <button onClick={this.logout} className="logout Btn">
              Log out
            </button>
          </div>
          <div
            className="contentView"
            style={this.state.customDisplays.contentViewStyle}
          >
            <div className="coursesView">
              {this.state.courses.map((t) => (
                <Course key={t._id} data={t} deleteCourse={this.deleteCourse} />
              ))}
            </div>
            <div
              className="addNewCourse"
              style={this.state.customDisplays.addStyle}
            >
              <h1 className="newCourseHeader">New courses</h1>
              <div className="inputsDiv ">
                <input
                  className="courseNamein"
                  placeholder="Course Name"
                  onChange={this.nameChanged}
                  value={this.state.inputname}
                ></input>
                <input
                  className="courseCriditin"
                  placeholder="credit hour "
                  onChange={this.creditHourChanged}
                  value={this.state.inputCreditHour}
                ></input>

                <select
                  className="drop"
                  onChange={this.timeChanged}
                  value={this.state.inputtime}
                >
                  <option value="" disabled selected>
                    Course Time
                  </option>
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
                  <option value="" disabled selected>
                    Course Day
                  </option>
                  <option>Saturday/Tuesday</option>
                  <option>Sunday/Wednesday</option>
                  <option>Monday/Thursday</option>
                </select>
                <Link to="/teacherhome">
                  <button
                    className="addButton zeft"
                    onClick={this.createCourse}
                  >
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
