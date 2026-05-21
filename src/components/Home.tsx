import React, { useEffect, useState } from 'react';
import AddCandidate from '../components/AddCandidate';
import BulkUpload from '../components/BulkUpload';
import CandidateList from '../components/CandidateList';
import type { Candidate } from '../types/candidate';
import { candidateApi } from '../services/candidateService';

const HomePage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'add' | 'bulk'>('add');

  // Define the fetch logic directly in useEffect to avoid dependency issues
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const data = await candidateApi.getAll();
        setCandidates(data);
        setError('');
      } catch (error) {
        console.error(error);
        setError('Failed to load candidates');
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
      setError('');
    } catch (error) {
      console.error(error);
      setError('Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <header className="app-header">
        <h1>Candidate Notes App</h1>
        <p>Manage recruitment candidates and interview notes</p>
      </header>
      <div className="main-content">
        <section className="action-section">
          <div className="tabs">
            <button
              className={activeTab === 'add' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('add')}
            >
              Add Candidate
            </button>
            <button
              className={activeTab === 'bulk' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('bulk')}
            >
              Bulk Upload
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'add' ? (
              <AddCandidate onCandidateAdded={handleRefresh} />
            ) : (
              <BulkUpload onUploadComplete={handleRefresh} />
            )}
          </div>
        </section>
        <section className="list-section">
          {loading && <p>Loading candidates...</p>}
          {!loading && error && (
            <div className="error-state">
              <p>{error}</p>
            </div>
          )}
          {!loading && !error && (
            <CandidateList candidates={candidates} />
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;