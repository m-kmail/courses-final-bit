import React, { Component } from "react";

class SearchedCourse extends Component {
  add = () => {
    this.props.addCourse(this.props.info._id);
  };
  render() {
    return (
      <div className="serched">
        <p>{this.props.info.Name}</p>
        <p>{this.props.info.Days}</p>
        <p>{this.props.info.Time}</p>
        <p>{this.props.info.CreditHours}</p>
        <p>{this.props.info.Teacher.name}</p>
        {this.props.existed == false ? (
          <button onClick={this.add} className="notexisted">
            mybutton
          </button>
        ) : (
          <button className="existed">mybutton</button>
        )}
      </div>
    );
  }
}

export default SearchedCourse;
