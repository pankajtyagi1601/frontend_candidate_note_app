import type { ApiResponse } from "../types/api";
import type { Note } from "../types/note";
import api from "./api";

// Note API calls
export const noteApi = {
  getAll: async (): Promise<Note[]> => {
    const response = await api.get<ApiResponse<Note[]>>("/notes/create");
    return response.data.data || [];
  },

  getByCandidate: async (candidateId: string): Promise<Note[]> => {
    const response = await api.get<ApiResponse<Note[]>>(
      `/notes/candidate/${candidateId}`,
    );
    return response.data.data || [];
  },

  create: async (candidateId: string, content: string): Promise<Note> => {
    const response = await api.post<ApiResponse<Note>>("/notes", {
      candidateId,
      content,
    });
    return response.data.data!;
  },
};
