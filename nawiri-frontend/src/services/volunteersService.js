import api from './api';

export const volunteersService = {
  // Submit volunteer application
  submitVolunteerApplication: async (volunteerData) => {
    const response = await api.post('/volunteers', volunteerData);
    return response.data;
  },

  // Get volunteer applications (admin only)
  getVolunteerApplications: async () => {
    const response = await api.get('/volunteers');
    return response.data;
  },

  // Update volunteer application status (admin only)
  updateVolunteerApplication: async (id, applicationData) => {
    const response = await api.put(`/volunteers/${id}`, applicationData);
    return response.data;
  },

  // Delete volunteer application (admin only)
  deleteVolunteerApplication: async (id) => {
    const response = await api.delete(`/volunteers/${id}`);
    return response.data;
  },
};

