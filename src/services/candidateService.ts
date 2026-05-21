import type { ApiResponse } from "../types/api";
import type { Candidate, CandidateWithNotes } from "../types/candidate";
import api from "./api";

export const candidateApi = {
  getAll: async (): Promise<Candidate[]> => {
    const response = await api.get<ApiResponse<Candidate[]>>("/candidates");
    return response.data.data || [];
  },

  getById: async (id: string): Promise<CandidateWithNotes> => {
    const response = await api.get<ApiResponse<CandidateWithNotes>>(
      `/candidates/${id}`,
    );
    return response.data.data!;
  },

  create: async (name: string, role: string): Promise<Candidate> => {
    const response = await api.post<ApiResponse<Candidate>>("/candidates", {
      name,
      role,
    });
    return response.data.data!;
  },

  bulkUpload: async (
    candidates: { name: string; role: string }[],
  ): Promise<Candidate[]> => {
    const response = await api.post<ApiResponse<Candidate[]>>(
      "/candidates/bulk-upload",
      candidates,
    );
    return response.data.data || [];
  },
};
