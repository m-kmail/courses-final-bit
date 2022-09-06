const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: String,
  choices: [],
  answer: String,
  isMultiple: Boolean,
  exam: { type: Schema.Types.ObjectId, ref: "Exam" },
});
const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
