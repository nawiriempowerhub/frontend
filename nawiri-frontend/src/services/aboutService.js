import api from './api';

export const aboutService = {
  // Get about content
  getAbout: async () => {
    const response = await api.get('/about/');
    return response.data;
  },

  // Update about content (admin only)
  updateAbout: async (aboutData) => {
    const response = await api.put('/about/', aboutData);
    return response.data;
  },

  // Get team members
  getTeam: async () => {
    const response = await api.get('/about/team');
    return response.data;
  },

  // Add team member (admin only)
  addTeamMember: async (memberData) => {
    const response = await api.post('/about/team', memberData);
    return response.data;
  },

  // Update team member (admin only)
  updateTeamMember: async (id, memberData) => {
    const response = await api.put(`/about/team/${id}`, memberData);
    return response.data;
  },

  // Delete team member (admin only)
  deleteTeamMember: async (id) => {
    const response = await api.delete(`/about/team/${id}`);
    return response.data;
  },

  // Get impact events
  getImpact: async () => {
    const response = await api.get('/about/impact');
    return response.data;
  },

  // Add impact event (admin only)
  addImpactEvent: async (impactData) => {
    const response = await api.post('/about/impact', impactData);
    return response.data;
  },

  // Update impact event (admin only)
  updateImpactEvent: async (id, impactData) => {
    const response = await api.put(`/about/impact/${id}`, impactData);
    return response.data;
  },

  // Delete impact event (admin only)
  deleteImpactEvent: async (id) => {
    const response = await api.delete(`/about/impact/${id}`);
    return response.data;
  },
};

