import React, { Component } from "react";
import "../styles/course.css";

class Course extends Component {
  deleteCourse = () => {
    this.props.deleteCourse(this.props.data._id);
  };
  render() {
    return (
      <div className="data">
        <h2>{this.props.data.Name}</h2>
        <h2>{this.props.data.Time}</h2>
        <h2>{this.props.data.Days}</h2>
        <h2>{this.props.data.noOfStudent}</h2>
        <h2 className="hidden">{this.props.data._id}</h2>
        <button className="deleteButton" onClick={this.deleteCourse}>
          <i className="fa fa-trash"></i>
        </button>
      </div>
    );
  }
}

export default Course;
