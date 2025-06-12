import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-dark w-900"> {/* Removed bg-gray-900 and changed text to dark */}
      <div className="container-fluid section-padding">
        <div className="row g-4">
          {/* Logo and Description */}
          <div className="col-12 col-md-6 col-lg-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div>
                <h3 className="fs-4 fw-bold">Nawiri EmpowerHub</h3>
                <p className="small text-muted">Empowering Communities</p> {/* Changed text-gray-100 to text-muted */}
              </div>
            </div>
            <p className="mb-3">
              Empowering communities through education, healthcare, and sustainable development programs.
              Together, we build a brighter future for all.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-muted hover-text-primary transition-colors"> {/* Changed text colors */}
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/NEmpowerhub" className="text-muted hover-text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted hover-text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted hover-text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-6 col-lg-3">
            <h4 className="fs-5 fw-semibold mb-3">Quick Links</h4>
            <ul className="d-flex flex-column gap-2">
              <li>
                <Link to="/about" className="text-muted hover-text-primary transition-colors"> {/* Changed text colors */}
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-muted hover-text-primary transition-colors">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link to="/media" className="text-muted hover-text-primary transition-colors">
                  Media & Impact
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="text-muted hover-text-primary transition-colors">
                  Get Involved
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted hover-text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-md-6 col-lg-3">
            <h4 className="fs-5 fw-semibold mb-3">Contact Info</h4>
            <ul className="d-flex flex-column gap-3">
              <li className="d-flex align-items-center gap-3">
                <Mail className="text-primary" style={{ width: '16px', height: '16px' }} />
                <span className="text-muted">info@nawiri.org</span> {/* Changed text color */}
              </li>
              <li className="d-flex align-items-center gap-3">
                <Phone className="text-primary" style={{ width: '16px', height: '16px' }} />
                <span className="text-muted">+254 700 000 000</span> {/* Changed text color */}
              </li>
              <li className="d-flex align-items-start gap-3">
                <MapPin className="text-primary mt-1" style={{ width: '16px', height: '16px' }} />
                <span className="text-muted"> {/* Changed text color */}
                  Nairobi, Kenya<br />
                  P.O. Box 12345-00100
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-top border-gray-300 mt-4 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center"> {/* Changed border color */}
          <p className="text-muted small"> {/* Changed text color */}
            © 2024 Nawiri EmpowerHub. All rights reserved.
          </p>
          <div className="d-flex gap-3 mt-3 mt-md-0">
            <a href="#" className="text-muted hover-text-primary small transition-colors"> {/* Changed text colors */}
              Privacy Policy
            </a>
            <a href="#" className="text-muted hover-text-primary small transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;