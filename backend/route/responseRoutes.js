const express = require("express");
const mongoose = require("mongoose");
const Survey = require("../models/survey"); // Import the Survey model
const SurveyResponse = require("../models/surveyResponse");
const multer = require("multer");
const responseRouter = express.Router();
const { storage } = require("./surveyRoutes");
const upload = multer({ dest: "uploads/" });
const authMiddleware = require("./authMiddleware"); // Import the auth middleware

// GET route to retrieve questions for a specific survey
responseRouter.get('/questions/:surveyId', async (req, res) => {
    try {
      const survey = await Survey.findById(req.params.surveyId);
      if (!survey) {
        return res.status(404).send({ message: 'Survey not found' });
      }
      res.status(200).send(survey.questions);
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving questions', error: error.message });
    }
  });
  
  // New route to get all responses for a specific survey
  responseRouter.get('/responses/:surveyId', async (req, res) => {
    try {
        const responses = await SurveyResponse.find({ surveyId: req.params.surveyId })
          .populate('respondent', 'userName email')  // Populate respondent details
          .exec();
        res.status(200).send(responses);
      } catch (error) {
        res.status(500).send({ message: 'Error retrieving responses', error: error.message });
      }
  });
// GET route to retrieve all answers for a specific question from responses
responseRouter.get("/answers/:questionId", async (req, res) => {
    try {
      const questionId = req.params.questionId;
      const responses = await SurveyResponse.find({ "responses.questionId": questionId });
      const answers = responses.map(response => response.responses.find(r => r.questionId === questionId));
      res.status(200).send(answers);
    } catch (error) {
      res.status(500).send({ message: "Error retrieving answers", error: error.message });
    }
  });

// POST route to submit a new survey response
responseRouter.post(
    "/submit",
    authMiddleware,
    upload.single("answerFile"),  // Middleware for file uploads
    async (req, res) => {
      const { surveyId, responses } = req.body;
      const respondent = req.user._id; // Get the respondent's ObjectId from the authenticated user
  
      // Check if the surveyId exists in the Survey collection
      const surveyExists = await Survey.exists({ _id: surveyId });
      if (!surveyExists) {
        return res.status(404).send({ message: "Survey not found" });
      }
  
      let parsedResponses;
      try {
        parsedResponses = JSON.parse(responses);
      } catch (error) {
        console.error("Invalid responses format:", error);
        return res.status(400).send({ message: "Invalid responses format" });
      }
  
      // Log parsed responses to debug
      console.log("Parsed Responses: ", parsedResponses);
  
      // Convert responses object to an array
      const processedResponses = parsedResponses.map((response) => {
        const {
          questionId,
          answerText,
          answerEmail,
          answerFile,
          answerMCQ,
          answerRating,
          answerDate,
          answerPhoneNumber,
          answerType,
        } = response;
  
        // Handle missing or invalid answer types
        if (
          !answerType ||
          ![
            "MCQ",
            "TextBox",
            "Rating",
            "Date",
            "PhoneNumber",
            "File",
            "Email",
            "Name",
          ].includes(answerType)
        ) {
          console.error(`Invalid answerType for question ${questionId}`);
          return {
            questionId,
            answerText: answerText || "",
            answerEmail: answerEmail || "",
            answerFile: answerFile || "",
            answerMCQ: answerMCQ || [],
            answerRating: answerRating || null,
            answerDate: answerDate || null,
            answerPhoneNumber: answerPhoneNumber || "",
            answerType: answerType || "TextBox", // Set a default answerType
          };
        }
  
        // Handle image upload
        let processedAnswerFile = answerFile || "";
        if (answerType === "File" && !answerFile && req.file) {
          processedAnswerFile = req.file.path;  // Assuming you save the file path in the `answerImage` field
        }
  
        // Handle `Email` and `Name` answer types
        const processedAnswerEmail = answerType === "Email" ? answerEmail || "" : "";
        const processedAnswerName = answerType === "Name" ? answerText || "" : "";
  
        return {
          questionId,
          answerText: answerType === "TextBox" || answerType === "Name" ? answerText : "",
          answerEmail: processedAnswerEmail,
          answerFile: processedAnswerFile,
          answerMCQ: answerType === "MCQ" ? answerMCQ : [],
          answerRating: answerType === "Rating" ? answerRating : null,
          answerDate: answerType === "Date" ? answerDate : null,
          answerPhoneNumber: answerType === "PhoneNumber" ? answerPhoneNumber : "",
          answerType: answerType,
        };
      });
  
      try {
        console.log("Processed Responses: ", processedResponses);
  
        const newResponse = new SurveyResponse({
          surveyId,
          respondent,
          responses: processedResponses,
        });
  
        console.log("New Response: ", newResponse);
  
        const savedResponse = await newResponse.save();
        res.status(201).send(savedResponse);
      } catch (error) {
        console.error("Error saving survey response: ", error);
        res.status(500).send({
          message: "Error submitting survey response",
          error: error.message,
        });
      }
    }
  );

// GET route to retrieve responses for a specific survey
responseRouter.get("/survey/:surveyId", async (req, res) => {
  try {
    const responses = await SurveyResponse.find({
      surveyId: req.params.surveyId,
    });
    res.status(200).send(responses);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error retrieving responses", error: error.message });
  }
});

module.exports = { responseRouter };
