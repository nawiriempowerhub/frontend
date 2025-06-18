
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Star, Clock } from 'lucide-react';
import ContactForm from '../components/forms/ContactForm';

const Contact = () => {
  return (
    <div className="w-100">
      {/* Hero Section with Background Image */}
      <section 
        className="text-white section-padding w-100 position-relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh',
        }}
        aria-label="Hero section with community background"
      >
        <div className="container-fluid px-3">
          <div className="text-center py-5">
            <h1 className="display-4 fw-bold mb-4">
              Contact Us
              <span className="d-block text-warning">We’re Here to Help</span>
            </h1>
            <p className="fs-4 text-white opacity-75 mb-5 mx-auto" style={{ maxWidth: '800px' }}>
              Get in touch with us to learn more about our programs, volunteer opportunities, or how you can support our mission.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link 
                to="/get-involved" 
                className="btn btn-light text-primary fw-medium px-4 py-2"
              >
                Get Involved
              </Link>
              <Link 
                to="/programs" 
                className="btn btn-outline-light fw-medium px-4 py-2"
              >
                View Our Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
        <div className="container-fluid px-3">
          <div className="row g-5">
            {/* Enhanced Contact Information */}
            <div className="col-12 col-lg-6">
              <div 
                className="mb-5"
                style={{
                  animation: 'slideInLeft 0.8s ease-out'
                }}
              >
                <h2 
                  className="h3 fw-bold mb-4"
                  style={{
                    color: '#059669',
                    position: 'relative'
                  }}
                >
                  Get in Touch
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: '0',
                      width: '60px',
                      height: '4px',
                      background: 'linear-gradient(135deg, #059669, #10b981)',
                      borderRadius: '2px'
                    }}
                  ></div>
                </h2>
                <p className="fs-5 text-muted mb-5" style={{ lineHeight: '1.6' }}>
                  We'd love to hear from you. Whether you have questions about our programs, want to get involved, or need support, we're here to help.
                </p>
              </div>

              <div className="d-flex flex-column gap-4">
                {/* Enhanced Email Card */}
                <div 
                  className="card border-0 shadow-sm"
                  style={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                  }}
                >
                  <div className="card-body d-flex align-items-center gap-4 p-4">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center position-relative"
                      style={{ 
                        width: '60px', 
                        height: '60px',
                        background: 'linear-gradient(135deg, #059669, #10b981)',
                        boxShadow: '0 8px 20px rgba(5, 150, 105, 0.3)'
                      }}
                    >
                      <Mail className="text-white" style={{ width: '28px', height: '28px' }} />
                      <div 
                        className="position-absolute top-0 start-0 w-100 h-100 rounded-circle"
                        style={{
                          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
                        }}
                      ></div>
                    </div>
                    <div className="flex-grow-1">
                      <h3 className="fw-semibold text-dark mb-1" style={{ fontSize: '1.2rem' }}>Email</h3>
                      <a 
                        href="mailto:nawiriempowerhub@gmail.com" 
                        className="text-decoration-none"
                        style={{ 
                          color: '#059669',
                          transition: 'color 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.color = '#047857'}
                        onMouseOut={(e) => e.target.style.color = '#059669'}
                      >
                        nawiriempowerhub@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Enhanced Phone Card */}
                <div 
                  className="card border-0 shadow-sm"
                  style={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                  }}
                >
                  <div className="card-body d-flex align-items-center gap-4 p-4">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center position-relative"
                      style={{ 
                        width: '60px', 
                        height: '60px',
                        background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                        boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)'
                      }}
                    >
                      <Phone className="text-white" style={{ width: '28px', height: '28px' }} />
                      <div 
                        className="position-absolute top-0 start-0 w-100 h-100 rounded-circle"
                        style={{
                          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
                        }}
                      ></div>
                    </div>
                    <div className="flex-grow-1">
                      <h3 className="fw-semibold text-dark mb-1" style={{ fontSize: '1.2rem' }}>Phone</h3>
                      <p className="text-dark mb-1 fw-medium">+254 116353925</p>
                      <p className="small text-muted mb-0">Mon-Fri, 9AM-5PM EAT</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Location Card */}
                <div 
                  className="card border-0 shadow-sm"
                  style={{
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                  }}
                >
                  <div className="card-body d-flex align-items-start gap-4 p-4">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center position-relative"
                      style={{ 
                        width: '60px', 
                        height: '60px',
                        background: 'linear-gradient(135deg, #059669, #10b981)',
                        boxShadow: '0 8px 20px rgba(5, 150, 105, 0.3)'
                      }}
                    >
                      <MapPin className="text-white" style={{ width: '28px', height: '28px' }} />
                      <div 
                        className="position-absolute top-0 start-0 w-100 h-100 rounded-circle"
                        style={{
                          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
                        }}
                      ></div>
                    </div>
                    <div className="flex-grow-1">
                      <h3 className="fw-semibold text-dark mb-1" style={{ fontSize: '1.2rem' }}>Office</h3>
                      <p className="text-muted mb-0" style={{ lineHeight: '1.5' }}>
                        Nairobi, Kenya<br />
                        P.O. Box 12345-00100
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Office Hours */}
              <div 
                className="card border-0 shadow-sm mt-5"
                style={{
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  overflow: 'hidden'
                }}
              >
                <div 
                  className="card-header border-0 p-4"
                  style={{
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    color: 'white'
                  }}
                >
                  <h5 className="card-title mb-2 d-flex align-items-center gap-2">
                    <Clock style={{ width: '24px', height: '24px' }} />
                    Office Hours
                  </h5>
                  <p className="card-text mb-0" style={{ opacity: '0.9' }}>
                    Our team is available during these hours to assist you.
                  </p>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between align-items-center p-2 rounded" style={{ backgroundColor: '#f8fafc' }}>
                      <span className="text-muted">Monday - Friday</span>
                      <span className="fw-semibold text-dark">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-2 rounded" style={{ backgroundColor: '#f8fafc' }}>
                      <span className="text-muted">Saturday</span>
                      <span className="fw-semibold text-dark">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-2 rounded" style={{ backgroundColor: '#f8fafc' }}>
                      <span className="text-muted">Sunday</span>
                      <span className="fw-semibold text-dark">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div className="col-12 col-lg-6">
              <div 
                className="card border-0 shadow-lg"
                style={{
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  overflow: 'hidden',
                  animation: 'slideInRight 0.8s ease-out'
                }}
              >
                <div 
                  className="card-header border-0 p-4"
                  style={{
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    color: 'white'
                  }}
                >
                  <h5 className="card-title mb-2 d-flex align-items-center gap-2">
                    <Send style={{ width: '24px', height: '24px' }} />
                    <span>Send us a Message</span>
                  </h5>
                  <p className="card-text mb-0" style={{ opacity: '0.9' }}>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>
                <div className="card-body p-4">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
     <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container-fluid px-3">
          <div 
            className="text-center mb-5"
            style={{
              animation: 'fadeInUp 0.8s ease-out'
            }}
          >
            <h2 
              className="h3 fw-bold mb-4"
              style={{
                color: '#059669',
                position: 'relative'
              }}
            >
              Frequently Asked Questions
              <div 
                style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(135deg, #059669, #10b981)',
                  borderRadius: '2px'
                }}
              ></div>
            </h2>
            <p className="fs-5 text-muted">
              Find answers to common questions about our programs and how to get involved.
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                question: "How can I volunteer?",
                answer: "You can apply to volunteer through our Get Involved page. We have opportunities for various skills and time commitments.",
                delay: "0s"
              },
              {
                question: "Where do donations go?",
                answer: "All donations directly support our programs in education, healthcare, and community development across Kenya.",
                delay: "0.1s"
              },
              {
                question: "Can I visit your programs?",
                answer: "Yes! We welcome visitors to see our programs in action. Please contact us to arrange a visit.",
                delay: "0.2s"
              },
              {
                question: "How do I stay updated?",
                answer: "Follow us on social media or contact us to join our newsletter for regular updates on our programs and impact.",
                delay: "0.3s"
              }
            ].map((faq, index) => (
              <div key={index} className="col-12 col-md-6">
                <div 
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: '16px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `slideInUp 0.8s ease-out ${faq.delay} both`,
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                  }}
                >
                  <div 
                    className="card-header border-0 p-4"
                    style={{
                      background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)'
                    }}
                  >
                    <h5 className="card-title fs-5 mb-0 d-flex align-items-center gap-2" style={{ color: '#059669' }}>
                      <Star style={{ width: '20px', height: '20px' }} />
                      {faq.question}
                    </h5>
                  </div>
                  <div className="card-body p-4">
                    <p className="text-muted mb-0" style={{ lineHeight: '1.6' }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="hero-primary text-gray-700 section-padding w-100">
        <div className="container-fluid px-3">
          <div className="text-center">
            <h2 className="h3 fw-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="fs-5 text-gray-600 mb-4">
              Don't wait to get involved. Contact us today and start your journey of creating positive change in communities across Kenya.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link to="/get-involved" className="btn btn-primary text-white fw-medium px-4 py-2">
                Get Involved Now
              </Link>
              <Link to="/programs" className="btn btn-outline-primary fw-medium px-4 py-2">
                Learn About Our Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
