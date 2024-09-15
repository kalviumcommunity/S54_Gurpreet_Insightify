import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "./UserContext";
import "./Dashboard.css";
import Logo from "../assets/Insightify.png";
import Clerk from "./Clerk";
import Modal from "./Modal";
import UpdateForm from "./UpdateForm";
import { Link } from "react-router-dom";
import ViewResponse from "./ViewResponse";

const Dashboard = () => {
  const { user } = useUserContext();
  const [surveys, setSurveys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newSurvey, setNewSurvey] = useState({
    title: "",
    creator: "",
    status: "Active",
    questions: [],
  });
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);

  useEffect(() => {
    if (user && user.userId) {
      sessionStorage.setItem("userId", user.userId);
      setNewSurvey((prevSurvey) => ({ ...prevSurvey, creator: user.userId }));
    }

    const userId = sessionStorage.getItem("userId");
    if (userId) {
      fetchSurveys(userId);
    }
  }, [user]);

  const fetchSurveys = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:6969/survey/creator/${userId}`
      );
      setSurveys(response.data);
    } catch (error) {
      console.error("Error fetching surveys:", error);
    }
  };

  const handleCreateSurvey = async (survey) => {
    try {
      await axios.post("http://localhost:6969/survey/create", survey);
      setIsModalOpen(false);
      const userId = sessionStorage.getItem("userId");
      fetchSurveys(userId);
    } catch (error) {
      console.error("Error creating survey:", error);
    }
  };

  const handleDeleteSurvey = async (surveyId) => {
    try {
      await axios.delete(`http://localhost:6969/survey/delete/${surveyId}`);
      setSurveys(surveys.filter((survey) => survey._id !== surveyId));
    } catch (error) {
      console.error("Error deleting survey:", error);
    }
  };

  const handleToggleStatus = async (surveyId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await axios.put(`http://localhost:6969/survey/updateStatus/${surveyId}`, {
        status: newStatus,
      });
      setSurveys(
        surveys.map((survey) =>
          survey._id === surveyId ? { ...survey, status: newStatus } : survey
        )
      );
    } catch (error) {
      console.error("Error updating survey status:", error);
    }
  };

  const handleUpdateSurvey = async (surveyId, updatedSurvey) => {
    try {
      await axios.put(
        `http://localhost:6969/survey/update/${surveyId}`,
        updatedSurvey
      );
      setIsUpdateModalOpen(false);
      const userId = sessionStorage.getItem("userId");
      fetchSurveys(userId);
    } catch (error) {
      console.error("Error updating survey:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openUpdateModal = (surveyId) => {
    setSelectedSurveyId(surveyId);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedSurveyId(null);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const userId = sessionStorage.getItem("userId");
  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dash-parent">
      <div className="header">
        <div className="header-left">
          <div className="logo">
            <img src={Logo} alt="Insightify" />
          </div>
          <div className="site-name">Insightify</div>
        </div>
        <div className="header-right">
          <div className="welcome">Welcome, {user?.userName || "Guest"}</div>
          <Clerk />
        </div>
      </div>

      <div className="dashboard">
        <div className="dash-heading">
          <div className="dash">Dashboard</div>
          <div className="create-btn">
            <button onClick={openModal}>Create</button>
          </div>
        </div>
        <div className="survey-list">
          <div className="sur">Survey</div>
          <div className="sur-text">Manage all your surveys at one place.</div>

          <div className="head">
            <div className="title">Survey Title</div>
            <div className="head-status">Status</div>
            <div className="head-right">
              <div>Update</div>
              <div className="del">Delete</div>
              <div>Response</div>
            </div>
          </div>

          {surveys.map((survey) => (
            <div key={survey._id} className="survey-list list">
              <div className="survey-name">
                <Link to={`/dashboard/${survey._id}`}>
                  {truncateText(survey.title, 25)}
                </Link>{" "}
              </div>
              <div className="status">
                <button
                  onClick={() => handleToggleStatus(survey._id, survey.status)}
                >
                  {survey.status}
                </button>
              </div>
              <div className="survey-list-right">
                <div className="update">
                  <button onClick={() => openUpdateModal(survey._id)}>
                    Update
                  </button>
                </div>
                <div className="delete">
                  <button onClick={() => handleDeleteSurvey(survey._id)}>
                    Delete
                  </button>
                </div>
                <div className="response">
                  <Link to={`/${survey._id}/responses`}>
                    <button>Link</button>
                  </Link>
                </div>
                <div className="view-response">
                  <Link to={`/dashboard/${survey._id}/responses`}>
                    <button>View All</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        handleCreateSurvey={handleCreateSurvey}
        newSurvey={newSurvey}
        setNewSurvey={setNewSurvey}
      />

      <UpdateForm
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        surveyId={selectedSurveyId}
        handleUpdateSurvey={handleUpdateSurvey}
      />
    </div>
  );
};

export default Dashboard;
