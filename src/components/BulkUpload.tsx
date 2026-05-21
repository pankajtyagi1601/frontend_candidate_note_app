import React, { useState, useRef } from 'react';
import { candidateApi } from '../services/candidateService';

interface BulkUploadProps {
  onUploadComplete: () => void;
}

const BulkUpload: React.FC<BulkUploadProps> = ({ onUploadComplete }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (text: string): { name: string; role: string }[] => {
    const lines = text.trim().split('\n');
    const candidates: { name: string; role: string }[] = [];

    // Check if first line is a header
    const firstLine = lines[0].toLowerCase();
    const hasHeader = firstLine.includes('name') || firstLine.includes('role');
    const startIndex = hasHeader ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const [name, role] = line.split(',').map((item) => item.trim());
      if (name && role) {
        candidates.push({ name, role });
      }
    }

    return candidates;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');
    setSuccess('');

    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }

    setLoading(true);
    try {
      const text = await file.text();
      const candidates = parseCSV(text);

      if (candidates.length === 0) {
        setError('No valid candidates found in CSV file');
        setLoading(false);
        return;
      }

      await candidateApi.bulkUpload(candidates);
      setSuccess(`Successfully uploaded ${candidates.length} candidates`);
      onUploadComplete();

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Failed to upload candidates. Please check your CSV format.');
      console.error('Error uploading candidates:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bulk-upload-container">
      <h2>Bulk Upload Candidates</h2>
      <div className="upload-info">
        <p>Upload a CSV file with the following format:</p>
        <pre>
          name,role{'\n'}
          John Doe,Software Engineer{'\n'}
          Jane Smith,Product Manager
        </pre>
      </div>

      <div className="file-upload">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={loading}
          className="file-input"
        />
        {loading && <div className="loading">Uploading...</div>}
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default BulkUpload;