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
        <button onClick={() => navigate("/")} className="cursor-pointer">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-[90%] bg-gray-100 rounded-lg p-6 mt-6">
      <div className="flex flex-col justify-between items-center mb-4">
        <button
          onClick={() => navigate("/")}
          className="mb-4 bg-[#F94C04] text-white px-4 py-2 rounded hover:bg-[#F94C04]/80 transition cursor-pointer"
        >
          ← Back to Candidates
        </button>
        <div className="text-center mb-4 p-4 rounded-lg shadow bg-white max-w-2xl border-l-4 border-r-4 border-[#F94C04] ">
          <h1 className="text-2xl font-semibold">{candidate.name}</h1>
          <p className="text-lg text-gray-600">{candidate.role}</p>
          <p className="text-sm text-gray-500">
            Added on {formatDate(candidate.createdAt)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow min-w-2xl mb-6">
          <h2 className="text-4xl text-center font-light mb-4">Notes</h2>
          <form
            onSubmit={handleAddNote}
            className="add-note-form mb-4 flex flex-col gap-2"
          >
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              autoFocus 
              className="w-full p-2 rounded focus:outline-none focus:ring-1 border border-[#F94C04] focus:ring-[#F94C04]"
              placeholder="Add your notes about this candidate..."
              rows={4}
              disabled={submitting}
            />
            <button
              type="submit"
              className="btn btn-primary bg-[#F94C04] text-white px-4 py-2 rounded hover:bg-[#F94C04]/80 transition cursor-pointer"
              disabled={submitting || !newNote.trim()}
            >
              {submitting ? "Adding..." : "Add Note"}
            </button>
          </form>
        </div>
        <div className="notes-list bg-[#F94C04]/50 text-white p-4 rounded-lg shadow min-w-2xl w-full">
          {notes.length === 0 ? (
            <div className="empty-notes">
              <p>No notes yet. Add your first note above!</p>
            </div>
          ) : (
            <div className="notes-grid w-full p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {notes.map((note, idx) => (
                <div
                  key={note._id}
                  className="bg-[#F94C04]/80 rounded-xl p-4 flex flex-col justify-between gap-2 shadow"
                >
                  <p className="text-md text-left wrap-break-word">
                    {idx + 1}. {note.content}
                  </p>
                  <hr className="white" />
                  <span className="text-sm font-extralight block">
                    Created At: {formatDate(note.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;
