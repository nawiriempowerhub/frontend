import React, { useState, useEffect } from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-white text-dark position-relative overflow-hidden border-top">
      {/* Background Pattern */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none'
        }}
      />

      <div className="container-max px-3 py-5 position-relative">
        <div className="row g-4 g-lg-5">
          {/* Logo and Description */}
          <div className="col-12 col-lg-4">
            <div className="mb-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-primary rounded-circle p-2 d-flex align-items-center justify-content-center">
                  <Heart className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="fs-4 fw-bold mb-0 text-dark">Nawiri EmpowerHub</h3>
                  <p className="small text-primary mb-0 fw-semibold">Empowering Communities</p>
                </div>
              </div>
              <p className="text-muted mb-4 lh-base small">
                Empowering communities through education, healthcare, and sustainable development programs.
                Together, we build a brighter future for all.
              </p>
              
              {/* Social Media Links */}
              <div className="d-flex gap-2">
                <a 
                  href="#" 
                  aria-label="Facebook"
                  className="btn btn-outline-secondary btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: '38px', height: '38px' }}
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://x.com/NEmpowerhub" 
                  aria-label="X / Twitter"
                  className="btn btn-outline-secondary btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: '38px', height: '38px' }}
                >
                  <Twitter size={18} />
                </a>
                <a 
                  href="https://www.instagram.com/nawiri_empowerhub/" 
                  aria-label="Instagram"
                  className="btn btn-outline-secondary btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: '38px', height: '38px' }}
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://www.linkedin.com/company/nawiri-empowerhub" 
                  aria-label="LinkedIn"
                  className="btn btn-outline-secondary btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: '38px', height: '38px' }}
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-sm-6 col-lg-4">
            <h4 className="fs-5 fw-bold mb-3 text-dark position-relative">
              Quick Links
              <div className="bg-primary rounded" style={{ width: '28px', height: '3px', marginTop: '6px' }}></div>
            </h4>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link to="/about" className="text-muted text-decoration-none d-inline-flex align-items-center gap-2 py-1">
                  <span>&rarr;</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-muted text-decoration-none d-inline-flex align-items-center gap-2 py-1">
                  <span>&rarr;</span> Our Programs
                </Link>
              </li>
              <li>
                <Link to="/media" className="text-muted text-decoration-none d-inline-flex align-items-center gap-2 py-1">
                  <span>&rarr;</span> Media & Impact
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="text-muted text-decoration-none d-inline-flex align-items-center gap-2 py-1">
                  <span>&rarr;</span> Get Involved
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted text-decoration-none d-inline-flex align-items-center gap-2 py-1">
                  <span>&rarr;</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-sm-6 col-lg-4">
            <h4 className="fs-5 fw-bold mb-3 text-dark position-relative">
              Contact Info
              <div className="bg-primary rounded" style={{ width: '28px', height: '3px', marginTop: '6px' }}></div>
            </h4>
            <ul className="list-unstyled d-flex flex-column gap-3 small">
              <li className="d-flex align-items-start gap-3">
                <div className="bg-primary-subtle rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0">
                  <Mail className="text-primary" size={16} />
                </div>
                <div>
                  <p className="mb-0 text-muted fw-semibold">Email</p>
                  <a href="mailto:nawiriempowerhub@gmail.com" className="text-dark text-decoration-none">
                    nawiriempowerhub@gmail.com
                  </a>
                </div>
              </li>
              <li className="d-flex align-items-start gap-3">
                <div className="bg-primary-subtle rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0">
                  <Phone className="text-primary" size={16} />
                </div>
                <div>
                  <p className="mb-0 text-muted fw-semibold">Phone</p>
                  <a href="tel:+254116353925" className="text-dark text-decoration-none">
                    +254 116 353 925
                  </a>
                </div>
              </li>
              <li className="d-flex align-items-start gap-3">
                <div className="bg-primary-subtle rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0">
                  <MapPin className="text-primary" size={16} />
                </div>
                <div>
                  <p className="mb-0 text-muted fw-semibold">Address</p>
                  <span className="text-dark">
                    Nairobi, Kenya
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div> 

        {/* Bottom Bar */}
        <div className="border-top mt-5 pt-4">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
              <p className="text-muted mb-0 small">
                © {new Date().getFullYear()} Nawiri EmpowerHub. All rights reserved.
              </p>
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex gap-3 justify-content-center justify-md-end small">
                <Link to="/contact" className="text-muted text-decoration-none">
                  Privacy Policy
                </Link>
                <span className="text-muted">•</span>
                <Link to="/contact" className="text-muted text-decoration-none">
                  Terms of Service
                </Link>
                <span className="text-muted">•</span>
                <Link to="/contact" className="text-muted text-decoration-none">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="btn btn-primary position-fixed bottom-0 end-0 m-3 m-md-4 rounded-circle p-0 d-flex align-items-center justify-content-center shadow-lg"
          style={{ 
            width: '46px', 
            height: '46px', 
            zIndex: 1050,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top"
        >
          <ArrowUp size={20} className="text-white" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
