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
      searchedCourses: { courses: [], display: "" },
      sortedCourse: {},
      showItem: false,
      pricehoure: "38",
      fees: "",
      val: "",
      user: {},
      inputname: "",
      inputtime: "",
      inputday: "",
      inputCreditHour: "",
      newPassword: "",
      confirmPassword: "",
      imageChanged: null,
      customDisplay: {
        searchCourses: { display: "none" },
        myCourses: { display: "flex" },
        joinCourse: { display: "none" },
        myTable: { display: "none" },
        profileStyle: { display: "none" },
        erroeMessage: { display: "none" },
        floatBox: { display: "none" },
        wallet: { display: "block" }
      },
      userInfo: {}
    };
  }
  changeSearch = (e) => {
    this.setState({
      search: e.target.value
    });
  };

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
  changePassword = () => {
    if (this.state.newPassword.length > 0)
      axios.put("http://localhost:5000/user", { pass: this.state.newPassword });
  };
  uploadImg = () => {
    const formData = new FormData();
    formData.append("myFile", this.state.imageChanged);
    this.sendImageToServer(formData);
  };
  add = (e) => {
    if (e.currentTarget.className === "addModify") {
      if (this.state.newPassword != this.state.confirmPassword) {
        let cur = this.state.customDisplay;
        cur.erroeMessage = { display: "block" };
        this.setState({ customDisplay: cur });
      } else {
        let y = {
          password: this.state.newPassword
        };

        this.setState({ user: y });
        this.hideFloatBox();
        this.changePassword();
      }
    }
  };
  changeFilter = (e) => {
    this.setState({
      filter: e.target.value
    });
  };
  calculat = () => {
    try {
      this.setState({
        fees: this.state.val * this.state.pricehoure + 40
      });
    } catch (error) {
      this.setState({
        val: "error"
      });
    }
  };
  async getUserInfo() {
    let x = await axios.get("http://localhost:5000/userinfo");
    return x.data;
  }
  sendImageToServer(formData) {
    const h = {};
    h.Accept = "application/json";
    axios.post("http://localhost:5000/upload_file", formData, {
      headers: h
    });
  }
  uploadImg = () => {
    const formData = new FormData();
    formData.append("myFile", this.state.imageChanged);
    this.sendImageToServer(formData);
  };
  async getUserInfo() {
    let x = await axios.get("http://localhost:5000/userinfo");
    return x.data;
  }

  componentDidMount = () => {
    (async () => {
      let userInfo = await axios.get("http://localhost:5000/sessionInfo");
      if (userInfo == undefined || userInfo.data.email == undefined) {
        window.location = "/";
      } else {
        if (userInfo.data.roll == "Teacher") window.location = "/teacherhome";
        else {
          let courses = await this.getCourses();
          let x = this.getUserInfo();
          x.then((e) => this.setState({ user: e }));
          this.setState({
            courses: courses.data,
            userInfo: userInfo.data
          });
          console.log(this.state.userInfo);
        }
      }
    })();
  };
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
      this.showSerched();
      this.setState({ searchedCourses: copy });
    });
  };
  componentDidUpdate() {
    (async () => {
      let courses = await this.getCourses();
      let x = this.getUserInfo();
      x.then((e) => this.setState({ user: e }));
      this.setState({
        courses: courses.data
      });
    })();
  }
  async getCourses() {
    let c = await axios.get("http://localhost:5000/courses");
    return c;
  }

  async logout() {
    await axios.get("http://localhost:5000/logout");

    window.location = "/";
  }

  deleteCourse(courseId) {
    return axios.delete(`http://localhost:5000/course/${courseId}`);
  }

  addCourse(courseid) {
    console.log("adding");
    return axios.put("http://localhost:5000/course", {
      courseId: courseid
    });
  }

  changeBalance = async (amount) => {
    const balance = (
      await axios.put("http://localhost:5000/changeBalance", {
        amount
      })
    ).data.balance;

    this.setState({
      userInfo: { ...this.state.userInfo, wallet: balance }
    });

    return balance;
  };
  drop = (courseid, amount) => {
    let userData = this.state.userInfo;
    this.deleteCourse(courseid);
    this.changeBalance(amount).then((balance) => {
      userData.wallet = balance;
      this.setState({ userInfo: userData });
    });
  };
  inroll = (courseid, amount) => {
    let userData = this.state.userInfo;
    console.log(userData);
    if (userData.wallet < amount) return alert("Your Balance Is Not Enought");

    this.addCourse(courseid);
    this.changeBalance(amount * -1);
  };

  grtbalance = () => {
    let userData = this.state.userInfo;
    this.changeBalance(0).then((balance) => {
      userData.wallet = balance;
      this.setState({ userInfo: userData }, () => {
        return <h1>{this.state.userInfo.wallet}</h1>;
      });
    });
  };

  sortCourses = () => {
    let allCoursrs = this.state.courses;

    let mappedCourses = {
      Saturday: [],
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: []
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

  toggleJoinCourse = () => {
    let curr = this.state.customDisplay;
    curr.joinCourse.display == "flex"
      ? (curr.joinCourse = { display: "none" })
      : (curr.joinCourse = { display: "flex" });
    if (curr.joinCourse.display == "none") {
      curr.searchCourses = { display: "none" };
      curr.myCourses = { display: "block" };
    }
    this.setState({ customDisplay: curr });

    console.log(this.state.userInfo);
  };

  showSerched = () => {
    let curr = this.state.customDisplay;
    curr.searchCourses = { display: "block" };
    curr.myCourses = { display: "none" };
    curr.wallet = { display: "block" };
    this.setState({ customDisplay: curr });
  };
  showProfile = () => {
    let current = this.state.customDisplay;
    current.joinCourse = { display: "none" };
    current.searchCourses = { display: "none" };
    current.myCourses = { display: "none" };

    current.profileStyle = { display: "block" };
    this.setState({ customDisplay: current });
  };
  closeProfile = () => {
    let current = this.state.customDisplay;
    current.joinCourse = { display: "none" };

    current.profileStyle = { display: "none" };
    this.setState({ customDisplay: current });
  };
  showFloatBox = () => {
    let current = this.state.customDisplay;
    current.floatBox = { display: "block" };
    this.setState({ customDisplay: current });
  };
  hideFloatBox = () => {
    let current = this.state.customDisplay;
    current.floatBox = { display: "none" };
    this.setState({ customDisplay: current });
  };

  render() {
    //console.log(this.state.userInfo);
    return (
      <div className="student-home">
        <div className="backGround"></div>
        <div className="content">
          <div className="nav">
            <button className="myProfile Btn" onClick={this.showProfile}>
              My Profile
            </button>
            <button className="Office Btn">Office hour</button>
            <Link to="/payment">
              <button className="Fee Btn">Study Fee Account</button>
            </Link>
            <button onClick={this.toggleJoinCourse} className="joinCourse Btn">
              join course
            </button>
            <Link to="/studentmoodle">
              <button className="moodle Btn">Moodle</button>
            </Link>{" "}
            <button onClick={this.logout} className="logout Btn">
              log out
            </button>
          </div>

          <div className="wallet" style={this.state.customDisplay.wallet}>
            Your Balance Is {this.state.userInfo.wallet}$
          </div>

          <div
            className="profile"
            style={this.state.customDisplay.profileStyle}
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

                <div id="blackout" style={this.state.customDisplay.floatBox}>
                  <div
                    id="box99"
                    className="newZeft"
                    style={this.state.customDisplay.floatBox}
                  >
                    <div className="modifyData">
                      <p
                        className="far fa-times-circle"
                        onClick={this.hideFloatBox}
                      ></p>

                      <div className="newData">
                        <div
                          className="errorMassege"
                          style={this.state.customDisplay.erroeMessage}
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
                          <div className="allButtons">
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
          </div>

          <div className="contentView">
            <div className="coursesView">
              <div
                className="serchedCourses"
                style={this.state.customDisplay.searchCourses}
              >
                {this.state.searchedCourses.courses.map((el) => {
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
                      addCourse={this.inroll}
                      wallet={this.state.userInfo.wallet}
                    />
                  );
                })}
              </div>

              <div
                className="myCourses"
                style={this.state.customDisplay.myCourses}
              >
                {this.state.courses.map((t) => (
                  <Course key={t._id} data={t} deleteCourse={this.drop} />
                ))}
              </div>
            </div>
            <div
              className="addToCourseContainer"
              style={this.state.customDisplay.joinCourse}
            >
              <div className="inputsDiv">
                <h2 className="joinCourse">Join Course</h2>
                <input
                  className="searchCourse"
                  placeholder="type your search"
                  type="search"
                  value={this.state.search}
                  onChange={this.changeSearch}
                />
                <div className="radioButton">
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
                </div>
                <button onClick={this.searchCourses} className="searchBtn">
                  search
                </button>
              </div>
            </div>

            <div className="schedul" style={this.state.customDisplay.myTable}>
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
