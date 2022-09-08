const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  Name: String,
  Students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  Teacher: { type: Schema.Types.ObjectId, ref: "Teacher" },
  CreditHours: Number,
  Time: String,
  Days: String,
  Status: String,
  Exams: { type: Schema.Types.ObjectId, ref: "Exam" },
  numOfStudents: Number,
  File: Object,
  FinalGrade: String,
});
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
