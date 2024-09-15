import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { UserProvider } from './components/UserContext';
import SurveyDetails from './components/SurveyDetails';
import SurveyResponse from './components/SurveyResponse';
import ViewResponse from './components/ViewResponse';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:surveyId" element={<SurveyDetails />} />
        <Route path="/dashboard/:surveyId/responses" element={<ViewResponse />} />
        <Route path="/:surveyId/responses" element={<SurveyResponse />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
