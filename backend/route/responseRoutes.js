const express = require('express');
const mongoose = require('mongoose');
const Survey = require('../models/survey'); // Import the Survey model
const SurveyResponse = require('../models/surveyResponse');
const multer = require('multer');
const responseRouter = express.Router();
const { storage } = require('./surveyRoutes');
const upload = multer({ storage: storage });

// POST route to submit a new survey response
responseRouter.post('/submit', upload.single('answerImage'), async (req, res) => {
    const { surveyId, respondent, responses } = req.body;

    // Check if the surveyId exists in the Survey collection
    const surveyExists = await Survey.exists({ _id: surveyId });
    if (!surveyExists) {
        return res.status(404).send({ message: 'Survey not found' });
    }

    // Process responses to include image URL if applicable
    const processedResponses = responses.map(response => {
        if (response.answerType === 'ImageUpload' && req.file) {
            response.answerImage = `/uploads/responses/${req.file.filename}`;
        }
        return response;
    });

    try {
        const newResponse = new SurveyResponse({
            surveyId,
            respondent,
            responses: processedResponses
        });
        const savedResponse = await newResponse.save();
        res.status(201).send(savedResponse);
    } catch (error) {
        res.status(500).send({ message: 'Error submitting survey response', error: error.message });
    }
});

// GET route to retrieve responses for a specific survey
responseRouter.get('/survey/:surveyId', async (req, res) => {
    try {
        const responses = await SurveyResponse.find({ surveyId: req.params.surveyId });
        res.status(200).send(responses);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving responses', error: error.message });
    }
});

module.exports = {responseRouter};