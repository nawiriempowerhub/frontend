import React, { useState } from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { donationsService } from '../../services/donationsService';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    donor_name: '',
    donor_email: '',
    message: '',
    payment_method: 'card',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const predefinedAmounts = [25, 50, 100, 250, 500];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAmountSelect = (amount) => {
    setFormData({
      ...formData,
      amount: amount.toString(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const donationData = {
        amount: parseFloat(formData.amount),
        donor_name: formData.donor_name || null,
        donor_email: formData.donor_email || null,
        message: formData.message || null,
      };

      await donationsService.createDonation(donationData);
      setSuccess(true);
      setFormData({
        amount: '',
        donor_name: '',
        donor_email: '',
        message: '',
        payment_method: 'card',
      });
    } catch (err) {
      setError(err.message || 'Failed to process donation. Please try again.');
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
        <h3 className="h4 fw-semibold text-dark mb-3">Thank You!</h3>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '400px' }}>
          Your donation has been received. Thank you for supporting our mission to empower communities.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="btn btn-outline-primary px-4 py-2 fw-medium"
          style={{ transition: 'all 0.3s ease' }}
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4 p-md-5">
        <h2 className="h4 fw-semibold text-dark mb-3">Make a Donation</h2>
        <p className="text-muted mb-4">
          Your contribution helps us expand our programs and reach more communities in need.
        </p>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger d-flex align-items-start gap-3 mb-4 fade-in" role="alert">
              <AlertCircle className="text-danger flex-shrink-0 mt-1" style={{ width: '20px', height: '20px' }} />
              <div className="small">{error}</div>
            </div>
          )}

          {/* Predefined Amounts */}
          <div className="mb-4">
            <label className="block text-muted mb-3">Select Amount (USD)</label>
            <div className="row g-3 mb-4">
              {predefinedAmounts.map((amount) => (
                <div key={amount} className="col-6 col-md-3 col-lg-2">
                  <button
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`btn w-100 ${
                      formData.amount === amount.toString()
                        ? 'btn-primary'
                        : 'btn-outline-secondary'
                    } py-2 fw-medium`}
                    style={{ transition: 'all 0.3s ease' }}
                  >
                    ${amount}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="mb-4">
            <div className="form-floating">
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="1"
                step="0.01"
                className="form-control form-control-lg border-2"
                placeholder="0.00"
                style={{ 
                  transition: 'all 0.3s ease',
                  borderColor: '#e9ecef',
                  paddingLeft: '2rem'
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
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted">$</span>
              <label htmlFor="amount" className="text-muted">
                Or Enter Custom Amount <span className="text-danger">*</span>
              </label>
            </div>
          </div>

          {/* Donor Information */}
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  id="donor_name"
                  name="donor_name"
                  value={formData.donor_name}
                  onChange={handleChange}
                  className="form-control form-control-lg border-2"
                  placeholder="Enter your name"
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
                <label htmlFor="donor_name" className="text-muted">
                  Full Name (Optional)
                </label>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="email"
                  id="donor_email"
                  name="donor_email"
                  value={formData.donor_email}
                  onChange={handleChange}
                  className="form-control form-control-lg border-2"
                  placeholder="Enter your email"
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
                <label htmlFor="donor_email" className="text-muted">
                  Email Address (Optional)
                </label>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mb-4">
            <div className="form-floating">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control border-2"
                placeholder="Leave a message with your donation"
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
              <label htmlFor="message" className="text-muted">
                Message (Optional)
              </label>
            </div>
          </div>

          {/* Impact Info */}
          <div className="alert alert-info mb-4" role="alert">
            <h4 className="fw-medium text-info mb-2">Your Impact</h4>
            <p className="small text-info">
              100% of your donation goes directly to our programs. We are committed to transparency and will provide updates on how your contribution is making a difference.
            </p>
          </div>

          {/* Payment Details */}
          <div className="alert alert-warning mb-4" role="alert">
            <h4 className="fw-semibold text-warning mb-1">Payment Details</h4>
            <p className="small text-warning">
              <strong>Paybill:</strong> 522533<br />
              <strong>Account Number:</strong> 7964728
            </p>
          </div>

          {/* Submit Button */}
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
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-donate me-2"></i>
                  Donate ${formData.amount || '0'}
                </>
              )}
            </button>
          </div>

          <p className="text-muted small text-center mb-0">
            <i className="fas fa-shield-alt me-1"></i>
            By submitting this form, you agree to our 
            <a href="#" className="text-primary text-decoration-none ms-1">privacy policy</a>.
            <br />
            This is a demo form. In a real implementation, this would integrate with a payment processor.
          </p>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;