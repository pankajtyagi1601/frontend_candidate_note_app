import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Candidate } from "../types/candidate";
import type { Note } from "../types/note";
import { candidateApi } from "../services/candidateService";
import { noteApi } from "../services/notesService";

const CandidateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Move fetchCandidateData logic directly into useEffect
  useEffect(() => {
    const fetchCandidateData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await candidateApi.getById(id);
        setCandidate(data.candidate);
        setNotes(data.notes);
        setError("");
      } catch (err) {
        setError("Failed to load candidate data");
        console.error("Error fetching candidate:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateData();
  }, [id]); // Only depends on id parameter

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !id) return;

    setSubmitting(true);
    try {
      await noteApi.create(id, newNote.trim());
      setNewNote("");
      
      // Fetch updated data
      const data = await candidateApi.getById(id);
      setCandidate(data.candidate);
      setNotes(data.notes);
    } catch (err) {
      alert("Failed to add note. Please try again.");
      console.error("Error adding note:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <div className="loading-state">Loading...</div>;
  }

  if (error || !candidate) {
    return (
      <div className="error-state">
        <p>{error || "Candidate not found"}</p>
        <button onClick={() => navigate("/")} className="btn btn-secondary">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="candidate-detail-page">
      <button onClick={() => navigate("/")} className="btn btn-back">
        ← Back to Candidates
      </button>
      <div className="candidate-info">
        <h1>{candidate.name}</h1>
        <p className="role">{candidate.role}</p>
        <p className="added-date">Added on {formatDate(candidate.createdAt)}</p>
      </div>
      <div className="notes-section">
        <h2>Interview Notes</h2>
        <form onSubmit={handleAddNote} className="add-note-form">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add your notes about this candidate..."
            rows={4}
            disabled={submitting}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting || !newNote.trim()}
          >
            {submitting ? "Adding..." : "Add Note"}
          </button>
        </form>
        <div className="notes-list">
          {notes.length === 0 ? (
            <div className="empty-notes">
              <p>No notes yet. Add your first note above!</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note._id} className="note-card">
                <p className="note-content">{note.content}</p>
                <span className="note-date">{formatDate(note.createdAt)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;