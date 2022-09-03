import React, { Component } from "react";
import "../styles/addcourse.css";

class Addcourse extends Component {
  constructor() {
    super();

    this.state = {
      inputname: "",
      inputtime: "",
      inputday: "",
      inputCreditHour: "",
    };
  }
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
  createCourse = (e) => {
    if (e.currentTarget.className === "addButton") {
      let y = {
        name: this.state.inputname,
        time: this.state.inputtime,
        days: this.state.inputday,
        creditHours: this.state.inputCreditHour,
      };

      this.props.createCourse(y);
    }
  };

  render() {
    return (
      <div className="addCourse">
        <div>
          <h1>Add courses</h1>
          <div className="inputsDiv">
            <input
              placeholder="credit hour "
              onChange={this.creditHourChanged}
              value={this.state.inputCreditHour}
            ></input>
            <input
              placeholder="Course Name"
              onChange={this.nameChanged}
              value={this.state.inputname}
            ></input>

            <select
              className="drop"
              onChange={this.timeChanged}
              value={this.state.inputtime}
            >
              <option>9:00-10:30</option>
              <option>12:30-2:00</option>
            </select>

            <select
              className="drop"
              onChange={this.dayChanged}
              value={this.state.inputday}
            >
              <option>Sunday/Tuesday</option>
              <option>Monday/Wednesday</option>
            </select>
          </div>

          <div>
            <button className="addButton" onClick={this.createCourse}>
              add course
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Addcourse;
