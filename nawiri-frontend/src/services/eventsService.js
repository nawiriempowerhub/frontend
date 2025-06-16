import api from './api';

export const eventsService = {
  // Get all events
  getEvents: async () => {
    const response = await api.get('/events');
    const data = response.data;

     // Safely return an array
    if (Array.isArray(data)) {
      return data;
    } else if (Array.isArray(data.events)) {
      return data.events;
    } else {
      console.warn('Unexpected response shape:', data);
      return [];
    }
  },
  // Create event (admin only)
  createEvent: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  // Update event (admin only)
  updateEvent: async (id, eventData) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },

  // Delete event (admin only)
  deleteEvent: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  // Register user for event
  registerForEvent: async (registrationData) => {
    const response = await api.post('/events/register', registrationData);
    return response.data;
  },
};
