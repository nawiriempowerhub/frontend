import api from './api';

export const contactService = {
  // Submit contact form
  submitContact: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },

  // Get contact submissions (admin only)
  getContactSubmissions: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  // Delete contact submission (admin only)
  deleteContactSubmission: async (id) => {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  },
};

