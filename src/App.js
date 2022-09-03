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
import TeacherModel from "./components/TeacherModel";
import StudentModel from "./components/StudentModel";
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

    //if(user.Password!=)

    /*   TO DO......
 if user => check the password => if ok redirect to student or teacher home page
 else => show the error div
 */

    // Navigate({ to: "/studenthome", replace });
    <Navigate to="/studenthome" />;
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
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" exact element={<Login login={this.login} />} />
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
            <Route path="/teachermodel" exact element={<TeacherModel />} />
            <Route path="/Studentmodel" exact element={<StudentModel />} />
          </Routes>
        </Router>
        {/*
        <button onClick={this.checkSession}>OK</button>
        <button onClick={this.active}>active</button>
        */}
      </div>
    );
  }
}

export default App;
