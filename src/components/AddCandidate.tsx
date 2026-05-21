import React, { useState } from 'react';
import { candidateApi } from '../services/candidateService';

interface AddCandidateProps {
  onCandidateAdded: () => void;
}

const AddCandidate: React.FC<AddCandidateProps> = ({ onCandidateAdded }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !role.trim()) {
      setError('Both name and role are required');
      return;
    }

    setLoading(true);
    try {
      await candidateApi.create(name.trim(), role.trim());
      setName('');
      setRole('');
      onCandidateAdded();
    } catch (err) {
      setError('Failed to add candidate. Please try again.');
      console.error('Error adding candidate:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-candidate-container">
      <h2>Add New Candidate</h2>
      <form onSubmit={handleSubmit} className="add-candidate-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter candidate name"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role (e.g., Software Engineer)"
            disabled={loading}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Candidate'}
        </button>
      </form>
    </div>
  );
};

export default AddCandidate;