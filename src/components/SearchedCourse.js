import React, { Component } from "react";

class SearchedCourse extends Component {
  add = () => {
    const hourPrice = 38;
    const coast = hourPrice * this.props.info.CreditHours;
    this.props.addCourse(this.props.info._id, coast);
  };
  render() {
    return (
      <div className="data ">
        <h2>{this.props.info.Name}</h2>
        <h2>{this.props.info.Time}</h2>
        <h2>{this.props.info.Days}</h2>
        <h2>{this.props.info.CreditHours}</h2>
        <h2>{this.props.info.Teacher.name}</h2>
        {this.props.existed == false ? (
          <button onClick={this.add} className="notexisted">
            Join
          </button>
        ) : (
          <button className="existed">UnAvailable</button>
        )}
      </div>
    );
  }
}

export default SearchedCourse;
