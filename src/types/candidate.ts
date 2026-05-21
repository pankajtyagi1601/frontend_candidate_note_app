import type { Note } from "./note";

export interface Candidate {
  _id: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CandidateWithNotes {
  candidate: Candidate;
  notes: Note[];
}