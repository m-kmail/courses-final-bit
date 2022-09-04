import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Addcourse from "./components/Addcourse";
import axios from "axios";
import StudentHome from "./components/StudentHome";
import TeacherHome from "./components/TeacherHome";
import TeacherMoodle from "./components/TeacherMoodle";
import StudentMoodle from "./components/StudentMoodle";
import Login from "./components/Login";
import Register from "./components/Register";
import JoinCourse from "./components/joinCourse";
import Error from "./components/error";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async createCourse(course) {
    let x;
    try {
      x = await axios.post("http://localhost:5000/courses", course);
    } catch (err) {
      alert("this time is already taken");
    }
  }
  async getSearchCourses(searchCourse) {
    console.log(searchCourse.search);
    let x = await axios.get(
      `http://localhost:5000/searchCourses?${searchCourse.filter}=${searchCourse.search}`
    );
    return x;
  }
  searchCourses = (searchCourse) => {
    let x = this.getSearchCourses(searchCourse);
    x.then((x) => this.setState({ searchedCourses: x.data }));
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/register" exact element={<Register />} />
            <Route
              path="/studenthome"
              exact
              element={
                <StudentHome
                  checkSession={this.checkSession}
                  logout={this.logout}
                  searchedCourses={this.state.searchedCourses}
                />
              }
            >
              <Route
                path="joinCourse"
                element={<JoinCourse searchCourses={this.searchCourses} />}
              />
            </Route>
            <Route
              path="/teacherhome"
              exact
              element={<TeacherHome checkSession={this.checkSession} />}
            >
              <Route
                path="createCourse"
                element={<Addcourse createCourse={this.createCourse} />}
              />
            </Route>
            <Route path="/teacherMoodle" exact element={<TeacherMoodle />} />
            <Route path="/studentMoodle" exact element={<StudentMoodle />} />
            <Route path="/" exact element={<Login />} />
            <Route path="/*" exact element={<Error />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
