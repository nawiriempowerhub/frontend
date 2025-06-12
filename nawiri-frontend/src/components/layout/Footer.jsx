import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light position-relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>

      <div className="container-fluid py-5 position-relative">
        <div className="row g-5">
          {/* Logo and Description */}
          <div className="col-12 col-lg-4">
            <div className="mb-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-primary rounded-circle p-2 d-flex align-items-center justify-content-center">
                  <Heart className="text-white" style={{ width: '24px', height: '24px' }} />
                </div>
                <div>
                  <h3 className="fs-3 fw-bold mb-1 text-white">Nawiri EmpowerHub</h3>
                  <p className="small text-primary mb-0 fw-medium">Empowering Communities</p>
                </div>
              </div>
              <p className="text-light mb-4 lh-lg">
                Empowering communities through education, healthcare, and sustainable development programs.
                Together, we build a brighter future for all.
              </p>
              
              {/* Social Media Links with Hover Effects */}
              <div className="d-flex gap-3">
                <a 
                  href="#" 
                  className="btn btn-outline-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center social-link"
                  style={{ width: '40px', height: '40px', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#1877f2';
                    e.target.style.borderColor = '#1877f2';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#ffffff';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <Facebook style={{ width: '18px', height: '18px' }} />
                </a>
                <a 
                  href="https://x.com/NEmpowerhub" 
                  className="btn btn-outline-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center social-link"
                  style={{ width: '40px', height: '40px', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#1da1f2';
                    e.target.style.borderColor = '#1da1f2';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#ffffff';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <Twitter style={{ width: '18px', height: '18px' }} />
                </a>
                <a 
                  href="#" 
                  className="btn btn-outline-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center social-link"
                  style={{ width: '40px', height: '40px', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e4405f';
                    e.target.style.borderColor = '#e4405f';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#ffffff';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <Instagram style={{ width: '18px', height: '18px' }} />
                </a>
                <a 
                  href="#" 
                  className="btn btn-outline-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center social-link"
                  style={{ width: '40px', height: '40px', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#0077b5';
                    e.target.style.borderColor = '#0077b5';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#ffffff';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <Linkedin style={{ width: '18px', height: '18px' }} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-6 col-lg-3">
            <h4 className="fs-5 fw-bold mb-4 text-white position-relative">
              Quick Links
              <div className="bg-primary" style={{ width: '30px', height: '3px', marginTop: '8px' }}></div>
            </h4>
            <ul className="list-unstyled d-flex flex-column gap-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-light text-decoration-none d-flex align-items-center gap-2 footer-link"
                  style={{ transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#0d6efd';
                    e.target.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#f8f9fa';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  <span>→</span> About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/programs" 
                  className="text-light text-decoration-none d-flex align-items-center gap-2 footer-link"
                  style={{ transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#0d6efd';
                    e.target.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#f8f9fa';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  <span>→</span> Our Programs
                </Link>
              </li>
              <li>
                <Link 
                  to="/media" 
                  className="text-light text-decoration-none d-flex align-items-center gap-2 footer-link"
                  style={{ transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#0d6efd';
                    e.target.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#f8f9fa';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  <span>→</span> Media & Impact
                </Link>
              </li>
              <li>
                <Link 
                  to="/get-involved" 
                  className="text-light text-decoration-none d-flex align-items-center gap-2 footer-link"
                  style={{ transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#0d6efd';
                    e.target.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#f8f9fa';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  <span>→</span> Get Involved
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-light text-decoration-none d-flex align-items-center gap-2 footer-link"
                  style={{ transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#0d6efd';
                    e.target.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#f8f9fa';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  <span>→</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-md-6 col-lg-3">
            <h4 className="fs-5 fw-bold mb-4 text-white position-relative">
              Contact Info
              <div className="bg-primary" style={{ width: '30px', height: '3px', marginTop: '8px' }}></div>
            </h4>
            <ul className="list-unstyled d-flex flex-column gap-4">
              <li className="d-flex align-items-start gap-3">
                <div className="bg-primary bg-opacity-25 rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0">
                  <Mail className="text-primary" style={{ width: '16px', height: '16px' }} />
                </div>
                <div>
                  <p className="mb-1 small text-primary fw-medium">Email</p>
                  <a href="mailto:info@nawiri.org" className="text-light text-decoration-none">
                    info@nawiri.org
                  </a>
                </div>
              </li>
              <li className="d-flex align-items-start gap-3">
                <div className="bg-primary bg-opacity-25 rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0">
                  <Phone className="text-primary" style={{ width: '16px', height: '16px' }} />
                </div>
                <div>
                  <p className="mb-1 small text-primary fw-medium">Phone</p>
                  <a href="tel:+254700000000" className="text-light text-decoration-none">
                    +254 700 000 000
                  </a>
                </div>
              </li>
              <li className="d-flex align-items-start gap-3">
                <div className="bg-primary bg-opacity-25 rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0">
                  <MapPin className="text-primary" style={{ width: '16px', height: '16px' }} />
                </div>
                <div>
                  <p className="mb-1 small text-primary fw-medium">Address</p>
                  <span className="text-light">
                    Nairobi, Kenya<br />
                    P.O. Box 12345-00100
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="col-12 col-lg-2">
            <h4 className="fs-5 fw-bold mb-4 text-white position-relative">
              Stay Updated
              <div className="bg-primary" style={{ width: '30px', height: '3px', marginTop: '8px' }}></div>
            </h4>
            <p className="text-light mb-3 small">
              Subscribe to our newsletter for updates on our programs and impact.
            </p>
            <div className="d-flex flex-column gap-2">
              <input 
                type="email" 
                className="form-control bg-dark border-secondary text-light" 
                placeholder="Your email"
                style={{ fontSize: '14px' }}
              />
              <button className="btn btn-primary btn-sm fw-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-top border-secondary mt-5 pt-4">
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <p className="text-light mb-2 mb-md-0 small">
                © 2024 Nawiri EmpowerHub. All rights reserved. Made with 
                <Heart className="text-danger mx-1" style={{ width: '14px', height: '14px' }} />
                for communities.
              </p>
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex gap-4 justify-content-md-end">
                <a 
                  href="#" 
                  className="text-light text-decoration-none small"
                  style={{ transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => e.target.style.color = '#0d6efd'}
                  onMouseLeave={(e) => e.target.style.color = '#f8f9fa'}
                >
                  Privacy Policy
                </a>
                <a 
                  href="#" 
                  className="text-light text-decoration-none small"
                  style={{ transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => e.target.style.color = '#0d6efd'}
                  onMouseLeave={(e) => e.target.style.color = '#f8f9fa'}
                >
                  Terms of Service
                </a>
                <a 
                  href="#" 
                  className="text-light text-decoration-none small"
                  style={{ transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => e.target.style.color = '#0d6efd'}
                  onMouseLeave={(e) => e.target.style.color = '#f8f9fa'}
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle p-3 d-flex align-items-center justify-content-center"
        style={{ 
          width: '50px', 
          height: '50px', 
          zIndex: 1000,
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(13, 110, 253, 0.3)'
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 20px rgba(13, 110, 253, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 12px rgba(13, 110, 253, 0.3)';
        }}
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;

