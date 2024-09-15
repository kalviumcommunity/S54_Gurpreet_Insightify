import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./Modal.css";

const Modal = ({ isOpen, onClose, handleCreateSurvey, newSurvey, setNewSurvey }) => {
  const [newQuestion, setNewQuestion] = useState({ questionText: "", answerType: "TextBox", options: [] });

  useEffect(() => {
    if (!newSurvey) {
      setNewSurvey({ title: "", creator: "", status: "Active", questions: [] });
    }
  }, [newSurvey, setNewSurvey]);

  const handleAddQuestion = () => {
    if (newQuestion.answerType === "MCQ" && newQuestion.options.length === 0) {
      alert("MCQ questions must have at least one option.");
      return;
    }

    setNewSurvey({
      ...newSurvey,
      questions: [...newSurvey.questions, newQuestion],
    });
    setNewQuestion({ questionText: "", answerType: "TextBox", options: [] });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = newSurvey.questions.map((question, i) =>
      i === index ? { ...question, [field]: value } : question
    );
    setNewSurvey({ ...newSurvey, questions: updatedQuestions });
  };

  const handleAddOption = (index) => {
    const updatedQuestions = newSurvey.questions.map((question, i) => {
      if (i === index) {
        return { ...question, options: [...question.options, ""] };
      }
      return question;
    });
    setNewSurvey({ ...newSurvey, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = newSurvey.questions.map((question, i) => {
      if (i === qIndex) {
        const updatedOptions = question.options.map((option, j) => (j === oIndex ? value : option));
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setNewSurvey({ ...newSurvey, questions: updatedQuestions });
  };

  const handleRemoveLastOption = (index) => {
    const updatedQuestions = newSurvey.questions.map((question, i) => {
      if (i === index && question.options.length > 0) {
        return { ...question, options: question.options.slice(0, -1) };
      }
      return question;
    });
    setNewSurvey({ ...newSurvey, questions: updatedQuestions });
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = newSurvey.questions.filter((_, i) => i !== index);
    setNewSurvey({ ...newSurvey, questions: updatedQuestions });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Creating survey with data:", newSurvey); // Add this line to log the payload
    await handleCreateSurvey(newSurvey);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-parent">
          <div className="create-survey-text">Create Survey</div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={newSurvey.title}
                onChange={(e) => setNewSurvey({ ...newSurvey, title: e.target.value })}
              />
            </div>
            {newSurvey.questions.map((question, index) => (
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
                  <option value="Email">Email</option>
                  <option value="Name">Name</option>
                  <option value="File">File</option>
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
                <option value="Email">Email</option>
                <option value="Name">Name</option>
                <option value="File">File</option>
              </select>
              {newQuestion.answerType === "MCQ" && (
                <div>
                  {newQuestion.options.map((option, oIndex) => (
                    <div key={oIndex}>
                      <label>Option {oIndex + 1}:</label>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(newSurvey.questions.length, oIndex, e.target.value)}
                      />
                    </div>
                  ))}
                  <button type="button" onClick={() => handleAddOption(newSurvey.questions.length)}>Add Option</button>
                  <button type="button" onClick={() => handleRemoveLastOption(newSurvey.questions.length)}>Remove Last Option</button>
                </div>
              )}
              <button type="button" onClick={handleAddQuestion}>Add Question</button>
            </div>
            <div>
              <button type="submit">Create Survey</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleCreateSurvey: PropTypes.func.isRequired,
  newSurvey: PropTypes.object,
  setNewSurvey: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  newSurvey: { title: "", creator: "", status: "Active", questions: [] },
};

export default Modal;
