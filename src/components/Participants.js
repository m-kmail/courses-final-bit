import React, { Component } from "react";

class Participants extends Component {
  render() {
    return (
      <div>
        {this.props.all.map((student) => {
          <div className="singleStudent">
            <img
              className="studentImage"
              src={`http://localhost:5000/uploads/${student.img}`}
            />
            <h2 className="studentName">{student.name}</h2>
            <h2 className="studentEmail">{student.email}</h2>
          </div>;
        })}
      </div>
    );
  }
}

export default Participants;
