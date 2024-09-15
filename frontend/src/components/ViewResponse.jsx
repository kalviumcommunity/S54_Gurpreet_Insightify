import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewResponse = () => {
  const { surveyId } = useParams();
  const [responses, setResponses] = useState([]);
  const [surveyTitle, setSurveyTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all responses for the survey
        const response = await axios.get(`http://localhost:6969/response/responses/${surveyId}`);
        setResponses(response.data);

        // Fetch the survey title
        const surveyResponse = await axios.get(`http://localhost:6969/survey/${surveyId}`);
        setSurveyTitle(surveyResponse.data.title);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [surveyId]);

  return (
    <div style={{display:"flex",flexDirection:'column'}}>
      <h1>Responses for Survey: {surveyTitle}</h1>
      {responses.length === 0 ? (
        <p>No responses available for this survey.</p>
      ) : (
        responses.map((response) => (
          <div key={response._id}>
            <h2>Respondent: {response.respondent?.userName || 'User not found'} (Email: {response.respondent?.email || 'Email not available'})</h2>
            {response.responses.map((responseDetail) => (
              <div key={responseDetail.questionId}>
                <QuestionText questionId={responseDetail.questionId} />
                <p>Answer Type: {responseDetail.answerType}</p>
                {/* Display answer based on type */}
                {responseDetail.answerText && responseDetail.answerType === 'TextBox' && <p>Answer Text: {responseDetail.answerText}</p>}
                {responseDetail.answerEmail && responseDetail.answerType === 'Email' && <p>Answer Email: {responseDetail.answerEmail}</p>}
                {responseDetail.answerFile && responseDetail.answerType === 'File' && <p>Answer File: <a href={responseDetail.answerFile} target="_blank" rel="noopener noreferrer">View File</a></p>}
                {responseDetail.answerMCQ && responseDetail.answerType === 'MCQ' && <p>Answer MCQ: {responseDetail.answerMCQ.join(', ')}</p>}
                {responseDetail.answerRating && responseDetail.answerType === 'Rating' && <p>Answer Rating: {responseDetail.answerRating}</p>}
                {responseDetail.answerDate && responseDetail.answerType === 'Date' && <p>Answer Date: {new Date(responseDetail.answerDate).toLocaleDateString()}</p>}
                {responseDetail.answerPhoneNumber && responseDetail.answerType === 'PhoneNumber' && <p>Answer Phone Number: {responseDetail.answerPhoneNumber}</p>}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

// Component to fetch and display question text
const QuestionText = ({ questionId }) => {
  const [questionText, setQuestionText] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:6969/survey/question/${questionId}`);
        setQuestionText(response.data.questionText);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, [questionId]);

  return <p>Question Text: {questionText}</p>;
};

export default ViewResponse;
