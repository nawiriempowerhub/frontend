import api from './api';

export const mediaService = {
  // Get all media
  getMedia: async () => {
    const response = await api.get('/media');
    return response.data;
  },

  // Get media by program
  getMediaByProgram: async (programId) => {
    const response = await api.get(`/media/by-program/${programId}`);
    return response.data;
  },

  // Get media by ID
  getMediaById: async (id) => {
    const response = await api.get(`/media/${id}`);
    return response.data;
  },

  // Create media (admin only)
  createMedia: async (mediaData) => {
    const response = await api.post('/media', mediaData);
    return response.data;
  },

  // Update media (admin only)
  updateMedia: async (id, mediaData) => {
    const response = await api.patch(`/media/${id}`, mediaData);
    return response.data;
  },

  // Delete media (admin only)
  deleteMedia: async (id) => {
    const response = await api.delete(`/media/${id}`);
    return response.data;
  },

  // Get program for media
  getMediaProgram: async (mediaId) => {
    const response = await api.get(`/media/${mediaId}/program`);
    return response.data;
  },

  // Update media's program (admin only)
  updateMediaProgram: async (mediaId, programId) => {
    const response = await api.patch(`/media/${mediaId}/program`, { program_id: programId });
    return response.data;
  },
};

