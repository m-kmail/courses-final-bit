import React, { Component } from "react";

class SearchedCourse extends Component {
  add = () => {
    this.props.addCourse(this.props.info._id);
  };
  render() {
    return (
      <div className="data ">
        <h2>{this.props.info.Name}</h2>
        <h2>{this.props.info.Time}</h2>
        <h2>{this.props.info.Days}</h2>

        <h2>{this.props.info.Teacher.Name}</h2>
        <h2>{this.props.info.CreditHours}</h2>
        <h2>{this.props.info.Teacher.name}</h2>
        {this.props.existed == false ? (
          <button onClick={this.add} className="notexisted">
            Join
          </button>
        ) : (
          <i class="fa fa-ban" aria-hidden="true"></i>
        )}
      </div>
    );
  }
}

export default SearchedCourse;
