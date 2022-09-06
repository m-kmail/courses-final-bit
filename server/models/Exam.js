const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  isClosed: Boolean,
  Name: String,
  Course: { type: Schema.Types.ObjectId, ref: "Course" },
  Questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  isFree: Boolean,
});
const Exam = mongoose.model("Exam", ExamSchema);
module.exports = Exam;
