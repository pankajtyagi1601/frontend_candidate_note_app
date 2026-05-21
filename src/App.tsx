import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import CandidateDetail from "./components/CandidateDetails";
import HomePage from "./components/Home";

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/candidate/:id" element={<CandidateDetail />} />
      </Routes>
    </div>
  );
};

export default App;
