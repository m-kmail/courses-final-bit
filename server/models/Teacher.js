const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  Name: String,
  IMG: Object,
  Gender: String,
  Courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  Email: String,
  Password: String,
  File: Object,
});
const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;
