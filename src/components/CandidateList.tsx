import React from "react";
import { useNavigate } from "react-router-dom";
import type { Candidate } from "../types/candidate";
import { Calendar, User } from "lucide-react";

interface CandidateListProps {
  candidates: Candidate[];
}

const CandidateList: React.FC<CandidateListProps> = ({ candidates }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (candidates.length === 0) {
    return (
      <div className="empty-state">
        <p>No candidates yet. Add your first candidate above!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        All Candidates ({candidates.length})
      </h2>
      <div className="candidates-grid grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {candidates.map((candidate) => (
          <div
            key={candidate._id}
            className="relative border-[#F94C04] border-2 bg-[#F94C04]/50 p-4 rounded-xl text-white shadow cursor-pointer hover:bg-[#F94C04]/80 transition"
            onClick={() => navigate(`/candidate/${candidate._id}`)}
          >
            <div className="text-center text-lg mb-2">
              <h3>{candidate.name}</h3>
              <span className="text-center text-md font-extralight flex items-center justify-center gap-2">
                <User size={18} /> {candidate.role}
              </span>
            </div>
            <div className="text-[0.8rem] ">
              <span className="flex items-center justify-center gap-2">
                <Calendar size={12} /> Added: {formatDate(candidate.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateList;
