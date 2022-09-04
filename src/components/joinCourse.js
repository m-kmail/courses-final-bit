import React, { Component } from "react";

class JoinCourse extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      filter: "",
    };
  }
  changeSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };
  changeFilter = (e) => {
    this.setState({
      filter: e.target.value,
    });
  };
  searchCourses = () => {
    this.props.searchCourses(this.state);
  };

  render() {
    return (
      <div>
        <input
          type="search"
          value={this.state.search}
          onChange={this.changeSearch}
        />
        <input
          type="radio"
          id="course-name"
          name="filter"
          value="courseName"
          onChange={this.changeFilter}
        />
        <label htmlFor="course-name">course name</label> {" "}
        <input
          type="radio"
          id="teacher-name"
          name="filter"
          value="teacherName"
          onChange={this.changeFilter}
        />
         <label htmlFor="teacher-name">teacher name</label> 
        <input
          type="radio"
          id="all"
          name="filter"
          value="all"
          onChange={this.changeFilter}
        />
         <label htmlFor="all">all</label>
        <button onClick={this.searchCourses}>search</button>
      </div>
    );
  }
}

export default JoinCourse;
