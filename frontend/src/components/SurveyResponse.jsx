import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SurveyResponses = () => {
  const { surveyId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:6969/response/questions/${surveyId}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [surveyId]);

  const handleChange = (questionId, value, answerType) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: { answerType, answer: value },
    }));
  };

  const handleFileChange = (questionId, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [questionId]: { answerType: "File", answer: reader.result },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleMCQChange = (questionId, option) => {
    setResponses((prevResponses) => {
      const currentAnswers = prevResponses[questionId]?.answer || [];
      const updatedAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter((answer) => answer !== option)
        : [...currentAnswers, option];

      return {
        ...prevResponses,
        [questionId]: { answerType: "MCQ", answer: updatedAnswers.flat() }, // Ensure flat array
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("surveyId", surveyId);
      formData.append("respondent", sessionStorage.getItem("userId"));

      // Log the current responses state
      console.log("Current Responses State:", responses);

      const responsesArray = Object.entries(responses).map(
        ([questionId, { answerType, answer }]) => {
          return {
            questionId,
            answerText: answerType === "TextBox" || answerType === "Name" ? answer : "",
            answerEmail: answerType === "Email" ? answer : "",
            answerFile: answerType === "File" ? answer : "",
            answerMCQ: answerType === "MCQ" ? answer : [],
            answerRating: answerType === "Rating" ? answer : null,
            answerDate: answerType === "Date" ? answer : null,
            answerPhoneNumber: answerType === "PhoneNumber" ? answer : "",
            answerType: answerType,
          };
        }
      );

      // Log the constructed responsesArray
      console.log("Constructed Responses Array:", responsesArray);

      const jsonString = JSON.stringify(responsesArray);
      // Log the JSON string of responsesArray
      console.log("JSON String of Responses Array:", jsonString);

      formData.append("responses", jsonString);

      // Log formData content
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      await axios.post(`http://localhost:6969/response/submit`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Response submitted successfully!");
    } catch (error) {
      console.error("Error submitting response:", error);
    }
  };

  return (
    <div>
      <h1>Survey</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question._id}>
            <p>{question.questionText}</p>
            {question.answerType === "TextBox" && (
              <input
                type="text"
                onChange={(e) =>
                  handleChange(question._id, e.target.value, "TextBox")
                }
              />
            )}
            {question.answerType === "File" && (
              <input
                type="file"
                onChange={(e) =>
                  handleFileChange(question._id, e.target.files[0])
                }
              />
            )}
            {question.answerType === "MCQ" && (
              <div>
                {question.options.map((option, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      value={option}
                      onChange={() => handleMCQChange(question._id, option)}
                    />
                    {option}
                  </div>
                ))}
              </div>
            )}
            {question.answerType === "Rating" && (
              <input
                type="number"
                min="1"
                max="5"
                onChange={(e) =>
                  handleChange(question._id, e.target.value, "Rating")
                }
              />
            )}
            {question.answerType === "Date" && (
              <input
                type="date"
                onChange={(e) =>
                  handleChange(question._id, e.target.value, "Date")
                }
              />
            )}
            {question.answerType === "PhoneNumber" && (
              <input
                type="text"
                value={responses[question._id]?.answer || ""}
                pattern="\d*"
                maxLength="10"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                  handleChange(question._id, value, "PhoneNumber");
                }}
                placeholder="Enter 10-digit phone number"
              />
            )}
            {question.answerType === "Email" && (
              <input
                type="email"
                onChange={(e) =>
                  handleChange(question._id, e.target.value, "Email")
                }
                placeholder="Enter your email"
              />
            )}
            {question.answerType === "Name" && (
              <input
                type="text"
                maxLength={"40"}
                onChange={(e) =>
                  handleChange(question._id, e.target.value, "Name")
                }
                placeholder="Enter your name"
              />
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SurveyResponses;
