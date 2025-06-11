import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-900">
      <div className="container-fluid section-padding">
        <div className="row g-4">
          {/* Logo and Description */}
          <div className="col-12 col-md-6 col-lg-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              {/* <div className="bg-primary rounded p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <Heart className="text-white" style={{ width: '24px', height: '24px' }} />
              </div> */}
              <div>
                <h3 className="fs-4 fw-bold">Nawiri EmpowerHub</h3>
                <p className="small text-gray-100">Empowering Communities</p>
              </div>
            </div>
            <p className="mb-3">
              Empowering communities through education, healthcare, and sustainable development programs.
              Together, we build a brighter future for all.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-gray-100 hover-text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/NEmpowerhub" className="text-gray-100 hover-text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-100 hover-text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-100 hover-text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-6 col-lg-3">
            <h4 className="fs-5 fw-semibold mb-3">Quick Links</h4>
            <ul className="d-flex flex-column gap-2">
              <li>
                <Link to="/about" className="hover-text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover-text-white transition-colors">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link to="/media" className="hover-text-white transition-colors">
                  Media & Impact
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="hover-text-white transition-colors">
                  Get Involved
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover-text-white transition-colors">
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
                <span className="">info@nawiri.org</span>
              </li>
              <li className="d-flex align-items-center gap-3">
                <Phone className="text-primary" style={{ width: '16px', height: '16px' }} />
                <span className="">+254 700 000 000</span>
              </li>
              <li className="d-flex align-items-start gap-3">
                <MapPin className="text-primary mt-1" style={{ width: '16px', height: '16px' }} />
                <span className="">
                  Nairobi, Kenya<br />
                  P.O. Box 12345-00100
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-top border-gray-800 mt-4 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-gray-100 small">
            © 2024 Nawiri EmpowerHub. All rights reserved.
          </p>
          <div className="d-flex gap-3 mt-3 mt-md-0">
            <a href="#" className="text-gray-100 hover-text-white small transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-100 hover-text-white small transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
