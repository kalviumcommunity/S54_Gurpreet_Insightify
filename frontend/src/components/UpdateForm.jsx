import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Modal.css";

const UpdateForm = ({ isOpen, onClose, surveyId, handleUpdateSurvey }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ questionText: "", answerType: "TextBox", options: [] });

  useEffect(() => {
    if (isOpen && surveyId) {
      // Fetch the survey data when the modal opens
      axios.get(`http://localhost:6969/survey/${surveyId}`)
        .then(response => {
          const { title, questions } = response.data;
          setTitle(title);
          setQuestions(questions);
        })
        .catch(error => console.error('Error fetching survey:', error));
    }
  }, [isOpen, surveyId]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options = [...newQuestions[index].options, ""];
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleRemoveLastOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.pop();
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    if (newQuestion.answerType === "MCQ" && newQuestion.options.length === 0) {
      alert("MCQ questions must have at least one option.");
      return;
    }

    setQuestions([...questions, newQuestion]);
    setNewQuestion({ questionText: "", answerType: "TextBox", options: [] });
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateSurvey(surveyId, { title, questions });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {questions.map((question, index) => (
            <div key={index}>
              <label>Question {index + 1}:</label>
              <input
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(index, "questionText", e.target.value)}
              />
              <label>Type:</label>
              <select
                value={question.answerType}
                onChange={(e) => handleQuestionChange(index, "answerType", e.target.value)}
              >
                <option value="TextBox">TextBox</option>
                <option value="MCQ">Multiple Choice</option>
                <option value="Rating">Rating</option>
                <option value="Date">Date</option>
                <option value="PhoneNumber">Phone Number</option>
                <option value="File">File</option>
                <option value="Email">Email</option>
                <option value="Name">Name</option>
              </select>
              {question.answerType === "MCQ" && (
                <div>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex}>
                      <label>Option {oIndex + 1}:</label>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                      />
                    </div>
                  ))}
                  <button type="button" onClick={() => handleAddOption(index)}>Add Option</button>
                  <button type="button" onClick={() => handleRemoveLastOption(index)}>Remove Last Option</button>
                </div>
              )}
              <button type="button" onClick={() => handleDeleteQuestion(index)}>Delete Question</button>
            </div>
          ))}
          <div>
            <label>New Question:</label>
            <input
              type="text"
              value={newQuestion.questionText}
              onChange={(e) => setNewQuestion({ ...newQuestion, questionText: e.target.value })}
            />
            <label>Type:</label>
            <select
              value={newQuestion.answerType}
              onChange={(e) => setNewQuestion({ ...newQuestion, answerType: e.target.value })}
            >
              <option value="TextBox">TextBox</option>
              <option value="MCQ">Multiple Choice</option>
              <option value="Rating">Rating</option>
              <option value="Date">Date</option>
              <option value="PhoneNumber">Phone Number</option>
              <option value="File">File</option>
              <option value="Email">Email</option>
              <option value="Name">Name</option>
            </select>
            {newQuestion.answerType === "MCQ" && (
              <div>
                {newQuestion.options.map((option, oIndex) => (
                  <div key={oIndex}>
                    <label>Option {oIndex + 1}:</label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(questions.length, oIndex, e.target.value)}
                    />
                  </div>
                ))}
                <button type="button" onClick={() => handleAddOption(questions.length)}>Add Option</button>
                <button type="button" onClick={() => handleRemoveLastOption(questions.length)}>Remove Last Option</button>
              </div>
            )}
            <button type="button" onClick={handleAddQuestion}>Add Question</button>
          </div>
          <button type="submit">Update Survey</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
