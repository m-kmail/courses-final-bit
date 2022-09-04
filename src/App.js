import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Addcourse from "./components/Addcourse";
import axios from "axios";
import StudentHome from "./components/StudentHome";
import TeacherHome from "./components/TeacherHome";
import TeacherMoodle from "./components/TeacherMoodle";
import StudentMoodle from "./components/StudentMoodle";
import Login from "./components/Login";
import Register from "./components/Register";
import { Navigate } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  async checkSession() {
    await axios.get("http://localhost:5000/logout", {
      credentials: "include",
    });
  }
  async active() {
    await axios.get("http://localhost:5000/active", {
      credentials: "include",
    });
  }

  async register(userinfo) {
    let user = null;
    try {
      user = await axios.post("http://localhost:5000/user", userinfo);
    } catch (err) {
      return null;
    }
  }

  async login(email, pass, roll) {
    let user = null;
    try {
      user = await axios.get(`http://localhost:5000/${roll}/${email}`, {
        credentials: "include",
      });
    } catch (err) {
      //show the error div
      return null;
    }

    /*   TO DO......
 if user => check the password => if ok redirect to student or teacher home page
 else => show the error div
 */

    // Navigate({ to: "/studenthome", replace });
    // <Navigate to="/studenthome" />;
    window.location = "/studenthome";
  }

  async logout() {
    await axios.get("`http://localhost:5000/logout");

    //=>redirect to login page
  }

  async checkSession() {
    await axios.get("http://localhost:5000/testSession", {
      credentials: "include",
    });
  }

  async createCourse(course) {
    let x;
    try {
      x = await axios.post("http://localhost:5000/courses", course);
    } catch (err) {
      alert("this time is already taken");
    }
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<></>} />

          <Route
            path="/register"
            exact
            element={<Register register={this.register} />}
          />
          <Route
            path="/studenthome"
            exact
            element={
              <StudentHome
                checkSession={this.checkSession}
                logout={this.logout}
              />
            }
          />
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

          <Route path="/" element={<Login login={this.login} />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
