const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  Name: String,
  Students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  Teacher: String,
  CreditHours: Number,
  Time: Number,
  Days: String,
  Status: String,
  Exams: [{ type: Schema.Types.ObjectId, ref: "Exam" }],
  FinalGrade: Number,
  numOfStudents: Number,
});
const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
