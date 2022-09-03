const { json } = require("body-parser");

const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

router.get("/:roll/:email", async function (req, res) {
  let user;

  if (req.params.roll == "Student")
    user = await Student.findOne({ Email: req.params.email });
  else user = await Teacher.findOne({ Email: req.params.email });

  if (!user) res.status(404);
  else {
    req.session.email = user.Email;
    req.session.roll = req.params.roll;
  }
  res.send(user);
});

router.post("/user", function (req, res) {
  const userInfo = req.body;
  console.log(userInfo);
  Student.findOne({ Email: userInfo.Email }).exec(function (err, user) {
    console.log(user);
    if (user == null) {
      const newStudent = new Student({
        Name: userInfo.Name,
        Email: userInfo.Email,
        Password: userInfo.Password,
        courses: [],
        NumOfHours: 0,
        IMG: "",
        Gender: userInfo.Gender,
      });
      newStudent.save();
      req.session.email = newStudent.Email;
      req.session.roll = "Student";
      res.send();
    } else {
      res.status(409).send({
        Error: "The email address you entered is already existed",
      });
    }
  });
});

router.get("/logout", function (req, res) {
  req.session.destroy();
  res.end();
});

module.exports = router;
