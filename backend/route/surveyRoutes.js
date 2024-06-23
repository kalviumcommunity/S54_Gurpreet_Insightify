const express = require('express');
const multer = require('multer');
const surveyRouter = express.Router();
const User = require('../models/user');
const Survey = require('../models/survey'); 
const mongoose = require('mongoose');

// Set up storage location and file constraints
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

surveyRouter.post('/create',upload.array('images'), async (req, res) => {
    const { title, creator, questions } = req.body;
    // console.log(title, creator, questions)
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
        return res.status(400).send({ message: 'Questions are required in the request body' });
    }

    const userExists = await User.exists({ _id: creator });
    if (!userExists) {
        return res.status(404).send({ message: 'User not found' });
    }

    const processedQuestions = questions.map((question, index) => {
        if (question.answerType === 'ImageUpload' && req.files && req.files.length > index) {
            question.imageUrl = `/uploads/${req.files[index].filename}`;
        }

        return question;
    });

    if (!mongoose.Types.ObjectId.isValid(creator)) {
        return res.status(400).send({ message: 'Invalid creator ID' });
    }
    try {
        const newSurvey = new Survey({ title, creator, questions: processedQuestions });
        const savedSurvey = await newSurvey.save();
        res.status(201).send(savedSurvey);
    } catch (error) {
        res.status(500).send(error);
    }
});


// GET route to retrieve a single survey by ID
surveyRouter.get('/:id', async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id).populate('creator');
        if (!survey) {
            return res.status(404).send({ message: 'Survey not found' });
        }
        res.status(200).send(survey);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PUT route to update a survey by ID
surveyRouter.put('/update/:id', async (req, res) => {
    const { title, questions } = req.body;
    try {
        const updatedSurvey = await Survey.findByIdAndUpdate(req.params.id, { title, questions }, { new: true }).populate('creator');
        if (!updatedSurvey) {
            return res.status(404).send({ message: 'Survey not found' });
        }
        res.status(200).send(updatedSurvey);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE route to delete a survey by ID
surveyRouter.delete('/delete/:id', async (req, res) => {
    try {
        const deletedSurvey = await Survey.findByIdAndDelete(req.params.id);
        if (!deletedSurvey) {
            return res.status(404).send({ message: 'Survey not found' });
        }
        res.status(200).send({ message: 'Survey deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = {surveyRouter ,storage};