import React, { useEffect, useState } from "react";
import AddCandidate from "../components/AddCandidate";
import BulkUpload from "../components/BulkUpload";
import CandidateList from "../components/CandidateList";
import type { Candidate } from "../types/candidate";
import { candidateApi } from "../services/candidateService";

const HomePage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"add" | "bulk">("add");

  // Define the fetch logic directly in useEffect to avoid dependency issues
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const data = await candidateApi.getAll();
        setCandidates(data);
        setError("");
      } catch (error) {
        console.error(error);
        setError("Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []); // Empty dependency array - runs once on mount

  // Create a separate function for child components to call
  const handleRefresh = async () => {
    try {
      setLoading(true);
      const data = await candidateApi.getAll();
      setCandidates(data);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to load candidates");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-[90%] bg-gray-100">
      <header className="header text-center py-6 bg-[#F94C04]/90 text-white">
        <h1 className="text-4xl font-semibold mb-1">Candidate Notes App</h1>
        <p className="text font-light">
          Manage recruitment candidates and interview notes
        </p>
      </header>
      <div className="main-content container mx-auto py-8">
        <section className="action-section mb-8 bg-white p-6 rounded shadow">
          <div className="tabs mb-4 flex text-white space-x-4 justify-center">
            <button
              className={`${activeTab === "add" ? "bg-[#F94C04]" : "bg-[#F94C04]/50"} px-4  py-2 rounded-md cursor-pointer`}
              onClick={() => setActiveTab("add")}
            >
              Add Candidate
            </button>
            <button
              className={`${activeTab === "bulk" ? "bg-[#F94C04]" : "bg-[#F94C04]/50"} px-4 py-2 rounded-md cursor-pointer`}
              onClick={() => setActiveTab("bulk")}
            >
              Bulk Upload
            </button>
          </div>
          <div className="tab-content bg-gray-50 border rounded-lg p-2">
            {activeTab === "add" ? (
              <AddCandidate onCandidateAdded={handleRefresh} />
            ) : (
              <BulkUpload onUploadComplete={handleRefresh} />
            )}
          </div>
        </section>

        <section className="list-section bg-white text-lg text-center p-6 rounded shadow">
          {loading && <p>Loading candidates...</p>}
          {!loading && error && (
            <div className="error-state">
              <p>{error}</p>
            </div>
          )}
          {!loading && !error && <CandidateList candidates={candidates} />}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
