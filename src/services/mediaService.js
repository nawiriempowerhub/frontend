import api from "./api";

export const mediaService = {
  // Get all media
  getMedia: async () => {
    const response = await api.get("/media");
    const data = response.data;

    if (Array.isArray(data)) {
      return data;
    } else if (Array.isArray(data.media)) {
      return data.media;
    } else {
      console.warn("Unexpected media response shape:", data);
      return [];
    }
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
    const response = await api.post("/media", mediaData);
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
    const response = await api.patch(`/media/${mediaId}/program`, {
      program_id: programId,
    });
    return response.data;
  },

  // Upload batch media (admin multi-file upload with automatic single-file fallback)
  uploadBatchMedia: async (formData) => {
    try {
      const response = await api.post("/media/batch", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      if (err.response?.status === 405 || err.response?.status === 404) {
        console.warn("/media/batch endpoint returned 405/404, performing fallback sequential upload.");
        
        const files = formData.getAll("files");
        const programId = formData.get("program_id");
        const titlePrefix = formData.get("title_prefix") || "Media Item";
        const type = formData.get("type") || "PHOTO";
        const description = formData.get("description");

        const results = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const singleData = new FormData();
          singleData.append("title", files.length > 1 ? `${titlePrefix} #${i + 1}` : titlePrefix);
          singleData.append("type", type);
          if (description) singleData.append("description", description);
          if (programId) singleData.append("program_id", programId);
          singleData.append("file_url", file);

          const res = await api.post("/media", singleData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          results.push(res.data);
        }
        return results;
      }
      throw err;
    }
  },
};

