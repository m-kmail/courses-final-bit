const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  CourseName: String, //to be changed
  Grade: Number,
  Type: String,
  Questions: String, // => must be changed
  Status: String,
});
const Exam = mongoose.model("Exam", ExamSchema);
module.exports = Exam;
