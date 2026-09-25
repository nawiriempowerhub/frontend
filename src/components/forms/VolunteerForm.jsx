import React, { useState } from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { volunteersService } from '../../services/volunteersService';

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    availability: '',
    motivation: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await volunteersService.submitVolunteerApplication(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        availability: '',
        motivation: '',
      });
    } catch (err) {
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-5 fade-in">
        <div 
          className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
          style={{ width: '80px', height: '80px' }}
        >
          <Check className="text-success" style={{ width: '40px', height: '40px', strokeWidth: 2 }} />
        </div>
        <h3 className="h4 fw-semibold text-dark mb-3">Application Submitted Successfully!</h3>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '400px' }}>
          Thank you for your interest in volunteering with us. We'll review your application and get back to you soon.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="btn btn-outline-primary px-4 py-2 fw-medium"
          style={{ transition: 'all 0.3s ease' }}
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4 p-md-5">
        <h2 className="h4 fw-semibold text-dark mb-3">Volunteer Application</h2>
        <p className="text-muted mb-4">
          Fill out this form to apply as a volunteer. We'll review your application and contact you with next steps.
        </p>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger d-flex align-items-start gap-3 mb-4 fade-in" role="alert">
              <AlertCircle className="text-danger flex-shrink-0 mt-1" style={{ width: '20px', height: '20px' }} />
              <div className="small">{error}</div>
            </div>
          )}

          <div className="row g-4 mb-4">
            <div className="col-12 col-md-6">
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

            <div className="col-12 col-md-6">
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
          </div>

          <div className="mb-4">
            <div className="form-floating">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control form-control-lg border-2"
                placeholder="Enter your phone number"
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
              <label htmlFor="phone" className="text-muted">
                Phone Number
              </label>
            </div>
          </div>

          <div className="mb-4">
            <div className="form-floating">
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="form-control form-control-lg border-2"
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
              >
                <option value="">Select your availability</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="both">Both weekdays and weekends</option>
                <option value="flexible">Flexible</option>
              </select>
              <label htmlFor="availability" className="text-muted">
                Availability
              </label>
            </div>
          </div>

          <div className="mb-4">
            <div className="form-floating">
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                required
                className="form-control border-2"
                placeholder="Share your motivation for volunteering"
                style={{ 
                  height: '150px',
                  resize: 'none',
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
              <label htmlFor="motivation" className="text-muted">
                Why do you want to volunteer with us? <span className="text-danger">*</span>
              </label>
            </div>
          </div>

          <div className="d-grid gap-2 mb-3">
            <button 
              type="submit" 
              disabled={loading} 
              className="btn btn-primary btn-lg fw-medium py-3"
              style={{ 
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(13, 110, 253, 0.2)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(13, 110, 253, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(13, 110, 253, 0.2)';
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="me-2 animate-spin" style={{ width: '20px', height: '20px' }} />
                  Submitting Application...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane me-2"></i>
                  Submit Application
                </>
              )}
            </button>
          </div>

          <p className="text-muted small text-center mb-0">
            <i className="fas fa-shield-alt me-1"></i>
            By submitting this form, you agree to our 
            <a href="#" className="text-primary text-decoration-none ms-1">privacy policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;