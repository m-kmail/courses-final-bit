import React, { Component } from "react";
import "../styles/course.css";

class Course extends Component {
  delete = () => {
    this.props.delete(this.props.data.Name);
  };
  render() {
    return (
      <div className="data">
        <h2>{this.props.data.Name}</h2>
        <h2>{this.props.data.Time}</h2>
        <h2>{this.props.data.Day}</h2>
        <h2>{this.props.data.noOfStudent}</h2>
        <button className="deleteButton" onClick={this.delete}>
          <i class="fa fa-trash"></i>
        </button>
      </div>
    );
  }
}

export default Course;
