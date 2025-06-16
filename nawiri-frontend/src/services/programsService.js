import api from "./api";

export const programsService = {
  // Get all programs
  getPrograms: async () => {
    const response = await api.get("/programs");
    const data = response.data;

    if (Array.isArray(data)) {
      return data;
    } else if (Array.isArray(data.programs)) {
      return data.programs;
    } else {
      console.warn("Unexpected response shape:", data);
      return [];
    }
  },

  // Get program by ID
  getProgram: async (id) => {
    const response = await api.get(`/programs/${id}`);
    return response.data;
  },

  // Create program (admin only)
  createProgram: async (programData) => {
    const response = await api.post("/programs", programData);
    return response.data;
  },

  // Update program (admin only)
  updateProgram: async (id, programData) => {
    const response = await api.put(`/programs/${id}`, programData);
    return response.data;
  },

  // Delete program (admin only)
  deleteProgram: async (id) => {
    const response = await api.delete(`/programs/${id}`);
    return response.data;
  },
};
