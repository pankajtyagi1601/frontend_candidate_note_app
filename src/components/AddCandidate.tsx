import React, { useState } from "react";
import { candidateApi } from "../services/candidateService";

interface AddCandidateProps {
  onCandidateAdded: () => void;
}

const AddCandidate: React.FC<AddCandidateProps> = ({ onCandidateAdded }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !role.trim()) {
      setError("Both name and role are required");
      return;
    }

    setLoading(true);
    try {
      await candidateApi.create(name.trim(), role.trim());
      setName("");
      setRole("");
      onCandidateAdded();
    } catch (err) {
      setError("Failed to add candidate. Please try again.");
      console.error("Error adding candidate:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-candidate-container p-2">
      <h2 className="text-center text-2xl">Add New Candidate</h2>
      <form
        onSubmit={handleSubmit}
        className="add-candidate-form max-w-md flex flex-col gap-4 justify-center mx-auto mt-4"
      >
        <div className="form-group flex flex-row">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter candidate name"
            autoFocus
            className="flex-row w-full mx-2 px-2 rounded focus:outline-none focus:ring-1 focus:ring-[#F94C04]"
            disabled={loading}
          />
        </div>

        <div className="form-group flex flex-row">
          <label htmlFor="role">Role: </label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role (e.g., Software Engineer)"
            className="flex-row w-full ml-5 px-2 rounded focus:outline-none focus:ring-1 focus:ring-[#F94C04]"
            disabled={loading}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          className="btn px-2 py-1 rounded-lg bg-[#F94C04] text-white hover:bg-[#F94C04]/80"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Candidate"}
        </button>
      </form>
    </div>
  );
};

export default AddCandidate;
