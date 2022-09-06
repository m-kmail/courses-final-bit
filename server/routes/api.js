const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Course = require("../models/Course");
let session = require("express-session");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg");
  },
});
var upload = multer({ storage: storage });

router.post("/upload_file", upload.array("myFile"), function (req, res) {
  if (session.roll == "Student") {
    Student.findOne({ Email: session.email }).exec(function (err, student) {
      student.IMG = req.files[0];
      student.save();
    });
  } else {
    Teacher.findOne({ Email: session.email }).exec(function (err, teacher) {
      teacher.IMG = req.files[0];
      teacher.save();
    });
  }
  res.json({ message: "Successfully uploaded files" });
  res.end();
});
router.get("/:roll/:email/:pass", async function (req, res) {
  let user;

  if (req.params.roll == "Student")
    user = await Student.findOne({
      Email: req.params.email,
      Password: req.params.pass,
    });
  else
    user = await Teacher.findOne({
      Email: req.params.email,
      Password: req.params.pass,
    });

  if (!user) res.status(404);
  else {
    req.session.email = user.Email;
    req.session.roll = req.params.roll;
    req.session.Name = user.Name;
    req.session.save();
    session = req.session;
  }

  res.send();
});

router.post("/user", function (req, res) {
  const userInfo = req.body;
  Student.findOne({ Email: userInfo.Email }).exec(function (err, user) {
    if (user == null) {
      const newStudent = new Student({
        Name: userInfo.Name,
        Email: userInfo.Email,
        Password: userInfo.Password,
        IMG: null,
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
  if (session.roll == "Student") {
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

router.get("/searchCourses", function (request, response) {
  let query = request.query;
  if (query.teacherName) {
    Teacher.find({ Name: query.teacherName })
      .populate("Courses")
      .exec(function (err, user) {
        response.send(user[0].Courses);
      });
  } else if (query.courseName) {
    Course.find({ Name: query.courseName })
      .populate("Teacher")
      .exec(function (err, courses) {
        response.send(courses);
      });
  } else {
    Course.find({})
      .populate("Teacher")
      .exec(function (err, courses) {
        response.send(courses);
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

  session = undefined;

  res.end();
});
router.get("/active", function (req, res) {
  if (session.email) console.log("logged in");
  else console.log("not logged in");
  res.end();
});

router.delete("/course/:courseid", function (req, res) {
  let courseToDel = req.params.courseid;
  if (session.email == "Teacher") {
    Course.findOneAndDelete({ _id: courseToDel }).exec(function (
      err,
      course
    ) {});

    Teacher.findOne({ Email: session.email }).exec(function (err, teacher) {
      teacher.Courses.map((c, index) => {
        if (c._id == courseToDel) {
          teacher.Courses.splice(index, 1);
          teacher.save();
        }
      });
    });
  } else {
    Student.findOne({ Email: session.email }).exec(function (err, student) {
      student.Courses.map((c, index) => {
        if (c._id == courseToDel) {
          student.Courses.splice(index, 1);
          student.save();
        }
      });
    });
  }
  res.end();
});

router.put("/course", function (request, response) {
  const courseToAdd = request.body.courseId;
  const StudentEmail = session.email;
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

router.get("/userinfo", function (req, res) {
  let email = session.email;

  if (session.roll == "Student") {
    Student.findOne({ Email: email }).exec(function (err, student) {
      let userInfo = { email: session.email };
      userInfo.roll = "Student";
      userInfo.name = student.Name;
      userInfo.gender = student.Gender;
      userInfo.img = student.IMG;
      res.send(userInfo);
    });
  } else {
    Teacher.findOne({ Email: email }).exec(function (err, teacher) {
      let userInfo = { email: session.email };
      userInfo.roll = "Teacher";
      userInfo.name = teacher.Name;
      userInfo.gender = teacher.Gender;
      userInfo.img = teacher.IMG;
      res.send(userInfo);
    });
  }
});

router.delete("/courseStudent/:courseId", function (request, response) {
  const studentEmail = session.email;
  const courseID = request.params.courseId;
  Student.findOne({ Email: studentEmail }).exec(function (err, student) {
    Course.findOne({ _id: courseID }).exec(function (err, course) {
      course.Students.forEach((s, index) => {
        if (s._id == student._id) {
          course.Students.splice(index, 1);
          course.save();
        }
      });
    });
    student.Courses.forEach((c, index) => {
      if (courseID == c._id) {
        student.Courses.splice(index, 1);
        student.save();
      }
    });
    response.send(student.Courses);
  });
});

router.get("/sessionInfo", function (req, res) {
  let info = undefined;
  if (session != undefined) info = { email: session.email, roll: session.roll };
  res.send(info);
});
module.exports = router;
