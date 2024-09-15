import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SurveyDetails = () => {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`http://localhost:6969/survey/${surveyId}`);
        setSurvey(response.data);
      } catch (error) {
        console.error("Error fetching survey details:", error);
      }
    };

    fetchSurvey();
  }, [surveyId]);

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{survey.title}</h1>
      <ul>
        {survey.questions.map((question, index) => (
          <li key={index}>
            <h3>{question.questionText}</h3>
            <p>Type: {question.answerType}</p>
            {question.options && question.options.length > 0 && (
              <ul>
                {question.options.map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyDetails;