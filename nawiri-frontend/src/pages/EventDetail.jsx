
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Alert, Button } from 'react-bootstrap';
import { Loader2, AlertCircle } from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', event_id: id });
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(null);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/events/register`, formData);
      setFormStatus({ type: 'success', message: 'Registration submitted successfully! We will contact you soon.' });
      setFormData({ name: '', email: '', event_id: id });
    } catch (error) {
      setFormStatus({ type: 'danger', message: 'Failed to register. Please try again.' });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Loader2 className="animate-spin text-primary" style={{ width: '40px', height: '40px' }} />
        <p className="text-muted mt-2">Loading event details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <Alert variant="danger" className="d-flex align-items-center gap-2">
          <AlertCircle className="text-danger" style={{ width: '24px', height: '24px' }} />
          {error}
        </Alert>
      </div>
    );
  }

  return (
    <div className="event-detail">
      {/* Hero Section */}
      <section className="bg-primary text-white py-5 mb-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">{event.title}</h1>
          <p className="lead mb-0">
            Join us on {new Date(event.date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {event.location}
          </p>
        </div>
      </section>

      {/* Event Details and Registration Form */}
      <div className="container my-5">
        <div className="row g-5">
          {/* Event Details */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm p-4">
              <h2 className="h3 fw-semibold mb-4">Event Details</h2>
              <p className="text-muted lead mb-4">{event.description}</p>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-start">
                  <i className="fas fa-calendar-alt text-primary me-3 mt-1"></i>
                  <div>
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {new Date(event.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <i className="fas fa-map-marker-alt text-primary me-3 mt-1"></i>
                  <div>
                    <strong>Location:</strong> {event.location}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Registration Form */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h3 className="h4 fw-semibold mb-4">Register for the Event</h3>
                {formStatus && (
                  <Alert variant={formStatus.type} className="d-flex align-items-start gap-2 mb-4">
                    <AlertCircle className={`text-${formStatus.type}`} style={{ width: '20px', height: '20px' }} />
                    <div className="small">{formStatus.message}</div>
                  </Alert>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-control form-control-lg border-2"
                        placeholder="John Doe"
                        style={{ 
                          transition: 'all 0.3s ease',
                          borderColor: '#e9ecef'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#0d6efd';
                          e.target.style.boxShadow = '0 0 0 0.2rem rgba(13, 110, 253, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e9ecef';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <label htmlFor="name" className="text-muted">
                        Full Name <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="form-floating">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-control form-control-lg border-2"
                        placeholder="your@email.com"
                        style={{ 
                          transition: 'all 0.3s ease',
                          borderColor: '#e9ecef'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#0d6efd';
                          e.target.style.boxShadow = '0 0 0 0.2rem rgba(13, 110, 253, 0.25)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e9ecef';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <label htmlFor="email" className="text-muted">
                        Email Address <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                  <div className="d-grid mb-3">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="py-3 fw-medium"
                      style={{ 
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(13, 110, 253, 0.2)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(13, 110, 253, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(13, 110, 253, 0.2)';
                      }}
                    >
                      <i className="fas fa-ticket-alt me-2"></i>
                      Register Now
                    </Button>
                  </div>
                  <p className="text-muted small text-center mb-0">
                    <i className="fas fa-shield-alt me-1"></i>
                    By registering, you agree to our 
                    <a href="/privacy-policy" className="text-primary text-decoration-none ms-1">privacy policy</a>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;