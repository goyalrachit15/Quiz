const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: String,
      correct_answer: String,
      incorrect_answers: [String],
    },
  ],
});

module.exports = mongoose.model('Quiz', QuizSchema);
