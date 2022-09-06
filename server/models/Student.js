const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  Name: String,
  IMG: String,
  Gender: String,
  Courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  NumOfHours: Number,
  Email: String,
  Password: String,
  Wallet: Number,
});
const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
