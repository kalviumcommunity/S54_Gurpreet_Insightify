import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <>
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </UserProvider>
    </>
  );
}

export default App;
