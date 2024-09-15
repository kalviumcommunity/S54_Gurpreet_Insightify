const mongoose = require('mongoose');

const surveyResponseSchema = new mongoose.Schema({
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey',
    required: true,
  },
  respondent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model for respondents
    required: true,
  },
  responses: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    answerText: {
      type: String,
      required: function() {
        return this.answerType === 'TextBox' || this.answerType === 'Name';
      },
    },
    answerEmail: {
      type: String,
      required: function() {
        return this.answerType === 'Email';
      },
    },
    answerFile: {
      type: String, // URL to the uploaded image
      required: function() { return this.answerType === 'File'; },
    },
    answerMCQ: {
      type: [String],
      required: function() { return this.answerType === 'MCQ'; },
    },
    answerRating: {
      type: Number,
      required: function() { return this.answerType === 'Rating'; },
    },
    answerDate: {
      type: Date,
      required: function() { return this.answerType === 'Date'; },
    },
    answerPhoneNumber: {
      type: String,
      required: function() { return this.answerType === 'PhoneNumber'; },
    },
    answerType: {
      type: String,
      enum: ['MCQ', 'TextBox', 'Rating', 'Date', 'PhoneNumber', 'File', 'Email', 'Name'],
      required: true,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SurveyResponse = mongoose.model('SurveyResponse', surveyResponseSchema);

module.exports = SurveyResponse;
