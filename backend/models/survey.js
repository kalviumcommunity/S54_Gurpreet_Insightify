const mongoose = require('mongoose');
const User = require('./user.js');

const surveySchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {  
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    questions: [{
        questionText: {
            type: String,
            required: true
        },
        answerType: {
            type: String,
            enum: ['MCQ', 'TextBox', 'Rating', 'Date', 'PhoneNumber', 'File','Email','Name'],
            required: true
        },
        options: [{
            type: [String] // Used for MCQs
        }],
        maxRating: {
            type: Number, // Used for Rating type questions
            default: 10 
        },
        fileTypes: {
            type: [String], 
            default: ['image/jpeg', 'image/png'] 
        },
        fileUrl: {
            type: String // URL to the uploaded image
        }
    }]
});

const surveyModel = mongoose.model('Survey', surveySchema);

module.exports = surveyModel;