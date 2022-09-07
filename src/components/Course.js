import React, { Component } from "react";
import "../styles/course.css";

class Course extends Component {
  deleteCourse = () => {
    const hourPrice = 38;
    const coast = hourPrice * this.props.data.CreditHours;
    this.props.deleteCourse(this.props.data._id, coast);
  };
  render() {
    return (
      <div className="data">
        <h2>{this.props.data.Name}</h2>
        <h2>{this.props.data.Time}</h2>
        <h2>{this.props.data.Days}</h2>
        <h2>{this.props.data.Teacher.Name}</h2>
        <h2>{this.props.data.CreditHours}</h2>
        <h2>{this.props.data.numOfStudents}</h2>
        <i onClick={this.deleteCourse} className="fa fa-trash deleteButton"></i>
        <h2 className="hidden">{this.props.data._id}</h2>
      </div>
    );
  }
}

export default Course;
