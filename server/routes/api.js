const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Course = require("../models/Course");
let session = require("express-session");

router.get("/:roll/:email", async function (req, res) {
  let user;

  if (req.params.roll == "Student")
    user = await Student.findOne({ Email: req.params.email });
  else user = await Teacher.findOne({ Email: req.params.email });

  if (!user) res.status(404);
  else {
    req.session.email = user.Email;
    req.session.roll = req.params.roll;
    req.session.Name = user.Name;
    req.session.save();
    session = req.session;
  }
  res.send(user);
});

router.post("/user", function (req, res) {
  const userInfo = req.body;
  Teacher.findOne({ Email: userInfo.Email }).exec(function (err, user) {
    if (user == null) {
      const newStudent = new Teacher({
        Name: userInfo.Name,
        Email: userInfo.Email,
        Password: userInfo.Password,
        IMG: "",
        Gender: userInfo.Gender,
      });
      newStudent.save();
      req.session.email = newStudent.Email;
      req.session.roll = "Student";
      req.session.Name = userInfo.Name;
      req.session.save();

      res.send();
    } else {
      res.status(409).send({
        Error: "The email address you entered is already existed",
      });
    }
  });
});

router.get("/courses", function (req, res) {
  if (req.session.roll == "Student") {
    Student.findOne({ Email: session.email })
      .populate("Courses")
      .exec(function (err, user) {
        res.send(user.Courses);
      });
  } else {
    Teacher.findOne({ Email: session.email })
      .populate("Courses")
      .exec(function (err, user) {
        res.send(user.Courses);
      });
  }
});

router.post("/courses", async function (request, response) {
  const teacherEmail = request.session.email;
  const courseBody = request.body;
  Teacher.findOne({ email: teacherEmail }).exec(async function (err, t) {
    let newCourse = new Course({
      Name: courseBody.name,
      Teacher: t._id,
      CreditHours: courseBody.creditHours,
      Time: courseBody.time,
      Days: courseBody.days,
      Status: "in progress",
      FinalGrade: 0,
      numOfStudents: 0,
      Students: [],
    });

    let ok = true;
    await Teacher.findOne({ email: teacherEmail })
      .populate("Courses")
      .exec(function (error, teacher) {
        teacher.Courses.forEach((course) => {
          if (course.Time == newCourse.Time && course.Days == newCourse.Days) {
            ok = false;
          }
        });
        if (ok) {
          teacher.Courses.push(newCourse);
          teacher.save();
          newCourse.save();
          response.send();
        } else {
          response.status(409);
          response.send();
        }
      });
  });
});
router.get("/logout", function (req, res) {
  session = req.session;
  res.end();
});
router.get("/active", function (req, res) {
  if (session.email) console.log("logged in");
  else console.log("not logged in");
  res.end();
});

router.delete("/course/:courseid", function (req, res) {
  let courseToDel = req.params.courseid;
  Course.findOneAndDelete({ _id: courseToDel }).exec(function (err, course) {});
  res.end();
});

/////////
router.put("/courses", function (request, response) {
  const courseToAdd = request.body.courseId;
  const StudentEmail = request.session.email;
  Student.findOne({ Email: StudentEmail }).exec(function (err, student) {
    Course.findOne({ _id: courseToAdd }).exec(function (err, course) {
      course.numOfStudents++;
      student.Courses.push(course);
      course.Students.push(student);
      course.save();
      student.save();
      response.end();
    });
  });
});
module.exports = router;
