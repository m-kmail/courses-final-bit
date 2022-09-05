import React, { Component } from "react";
import "../styles/profile.css";
import { Link } from "react-router-dom";
import axios from "axios";
class Profile extends Component {
  getuserInfo() {}
  constructor() {
    super();
    this.state = {
      newPassword: "",
      confirmPassword: "",
      imageChanged: null,
      user: {},
      custom: { display: "none" },
    };
  }

  async getUserInfo() {
    let x = await axios.get("http://localhost:5000/userinfo");
    return x.data;
  }
  componentDidMount() {
    let x = this.getUserInfo();
    x.then((e) => this.setState({ user: e }));
  }

  passwordChanged = (e) => {
    this.setState({ newPassword: e.target.value });
  };
  confirmPasswordChanged = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };
  imgChanged = (e) => {
    let userModified = { ...this.state.imageChanged };
    userModified = e.target.files[0];
    this.setState({ imageChanged: userModified });
  };
  removeImg = () => {
    let userModified = { ...this.state.imageChanged };
    userModified = null;
    this.setState({ imageChanged: userModified });
  };
  sendImageToServer(formData) {
    const h = {};
    h.Accept = "application/json";
    axios.post("http://localhost:5000/upload_file", formData, {
      headers: h,
    });
  }
  uploadImg = () => {
    const formData = new FormData();
    formData.append("myFile", this.state.imageChanged);
    this.sendImageToServer(formData);
  };
  add = (e) => {
    if (e.currentTarget.className === "addModify") {
      if (this.state.newPassword != this.state.confirmPassword) {
        let x = this.state.custom;
        x = { display: "block" };
        this.setState({ custom: x });
      } else {
        let y = {
          password: this.state.newPassword,
        };

        this.setState({ user: y });
        window.location = "#";
      }
    }
  };
  render() {
    return (
      <div className="profile">
        <div className="backGround"></div>
        <div className="nav">
          <Link to="/editProfile">
            <button className="myProfile Btn">Edit Profile</button>
          </Link>
          <button className="myTable Btn">Office hour</button>
          <button
            onClick={this.changeShowCreateCourse}
            className="addCourse Btn"
          >
            New Course
          </button>
          <button className="moodle Btn">Moodle</button>
          <button onClick={this.logout} className="logout Btn">
            Log out
          </button>
        </div>
        <div className="info">
          <div className="userName">
            <h2>{this.state.user.name}</h2>
            {this.state.user.img ? (
              <img
                className="profileImg"
                src={`http://localhost:5000/uploads/${this.state.user.img.path.substring(
                  8
                )}`}
              />
            ) : null}
          </div>
          <div className="userInfo">
            <h3>Informations</h3>
            <div className="myData">
              <h4>Email :</h4>
              <p>{this.state.user.email}</p>
              <h4>gender :</h4>
              <p>{this.state.user.gender}</p>
            </div>

            <a href="#blackout" data-toggle="box" data-target="#blackout">
              <button className="modify">Modify Data</button>
            </a>
            <div id="blackout">
              <div id="box">
                <form className="modifyData">
                  <a href="#" className="close">
                    <i className="far fa-times-circle"></i>
                  </a>
                  <div className="newData">
                    <div className="errorMassege" style={this.state.custom}>
                      password did not match
                    </div>
                    <input
                      value={this.state.newPassword}
                      onChange={this.passwordChanged}
                      className="newDataInput"
                      type="password"
                      placeholder="New Password"
                    ></input>
                    <input
                      value={this.state.confirmPassword}
                      onChange={this.confirmPasswordChanged}
                      className="newDataInput"
                      type="password"
                      placeholder="Confirm password"
                    ></input>
                    <div className="imagechange">
                      <input
                        type="file"
                        name="myImage"
                        onChange={this.imgChanged}
                      />
                      <button onClick={this.removeImg}>Remove Image</button>
                      <button onClick={this.uploadImg}>upload Image</button>
                    </div>
                  </div>
                  <a className="modifyContainer">
                    <div onClick={this.add} className="addModify">
                      Modify
                    </div>
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
