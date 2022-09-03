import { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import StudentHome from "./components/StudentHome";
import TeacherHome from "./components/TeacherHome";
import TeacherModel from "./components/TeacherModel";
import StudentModel from "./components/StudentModel";
import Login from "./components/Login";
import Register from "./components/Register";
import { useNavigate } from "react-router-dom";
import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async register(userinfo) {
    let user = null;
    try {
      user = await axios.post("http://localhost:5000/user", userinfo);
      console.log(user);
    } catch (err) {
      return null;
    }
  }

  async login(email, pass, roll) {
    let user = null;
    try {
      user = await axios.get(`http://localhost:5000/${roll}/${email}`);
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

  logout() {
    axios.get("`http://localhost:5000/logout");
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
              element={<StudentHome logout={this.logout} />}
            />
            <Route path="/teacherhome" exact element={<TeacherHome />} />
            <Route path="/teachermodel" exact element={<TeacherModel />} />
            <Route path="/Studentmodel" exact element={<StudentModel />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
