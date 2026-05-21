import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Candidate } from '../types/candidate';

interface CandidateListProps {
  candidates: Candidate[];
}

const CandidateList: React.FC<CandidateListProps> = ({ candidates }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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
    <div className="candidate-list">
      <h2>All Candidates ({candidates.length})</h2>
      <div className="candidates-grid">
        {candidates.map((candidate) => (
          <div
            key={candidate._id}
            className="candidate-card"
            onClick={() => navigate(`/candidate/${candidate._id}`)}
          >
            <div className="candidate-header">
              <h3>{candidate.name}</h3>
              <span className="role-badge">{candidate.role}</span>
            </div>
            <div className="candidate-footer">
              <span className="date">Added: {formatDate(candidate.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateList;