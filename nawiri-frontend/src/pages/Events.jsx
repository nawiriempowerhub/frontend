import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, CalendarDays, MapPin, Clock } from 'lucide-react';
import { eventsService } from '../services/eventsService';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await eventsService.getEvents();
        setEvents(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch events. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Function to format date with day name
  const formatEventDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to format time
  const formatEventTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Upcoming Events
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join us for these exciting upcoming events and be part of our community
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3 mb-8 animate-fade-in max-w-2xl mx-auto">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-gray-600">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Scheduled</h3>
          <p className="text-gray-600 mb-4">Check back later for upcoming events</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Event Image Placeholder */}
              <div className="h-48 bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <span className="text-white text-xl font-semibold">Event Image</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-sm font-medium text-primary">{event.category || 'General'}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {event.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p className="text-gray-900">{formatEventDate(event.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Time</p>
                      <p className="text-gray-900">{formatEventTime(event.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-gray-900">{event.location}</p>
                    </div>
                  </div>
                </div>
                
                <button className="mt-6 w-full py-2.5 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary/20 transition-colors">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;