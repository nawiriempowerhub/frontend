import api from './api';

export const donationsService = {
  // Create donation
  createDonation: async (donationData) => {
    const response = await api.post('/donations', donationData);
    return response.data;
  },

  // Get donations (admin only)
  getDonations: async () => {
    const response = await api.get('/donations');
    return response.data;
  },

  // Get donation by ID (admin only)
  getDonation: async (id) => {
    const response = await api.get(`/donations/${id}`);
    return response.data;
  },
};

