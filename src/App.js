import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import StudentHome from "./components/StudentHome";
import TeacherHome from "./components/TeacherHome";
import TeacherMoodle from "./components/TeacherMoodle";
import StudentMoodle from "./components/StudentMoodle";
import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/error";
import Profile from "./components/Profile";
import Payment from "./components/Payment";
class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/register" exact element={<Register />} />
            <Route path="/studenthome" exact element={<StudentHome />} />
            <Route path="/teacherhome" exact element={<TeacherHome />} />
            <Route path="/teacherMoodle" exact element={<TeacherMoodle />} />
            <Route path="/studentMoodle" exact element={<StudentMoodle />} />
            <Route path="/editProfile" exact element={<Profile />} />
            <Route path="/payment" exact element={<Payment />} />

            <Route path="/" exact element={<Login />} />
            <Route path="/*" exact element={<Error />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
