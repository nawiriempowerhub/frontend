import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import nawiriLogo from "../../assets/nawiri-logo.jpg"; // Adjust path as needed

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/home" },
    { name: "About", href: "/" },
    { name: "Programs", href: "/programs" },
    { name: "Media", href: "/media" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-green-600 text-white sticky-top z-50 shadow">
      <div className="container px-3">
        <div className="d-flex justify-content-between align-items-center py-3">
        <NavLink 
            to="/" 
            className="d-flex align-items-center gap-3 text-decoration-none group"
            style={{ transition: 'all 0.3s ease' }}
          >
            <div className="position-relative">
              <img
                src={nawiriLogo}
                alt="Nawiri Empower Hub Logo"
                className="rounded-circle object-fit-cover border-3 border-white shadow-sm"
                style={{ 
                  height: "50px", 
                  width: "50px",
                  transition: 'all 0.3s ease',
                  filter: 'brightness(1.1)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              />
              {/* Subtle glow effect */}
              <div 
                className="position-absolute top-0 start-0 rounded-circle"
                style={{
                  height: "50px",
                  width: "50px",
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}
              ></div>
            </div>

            <div className="d-none d-sm-block">
              <h2 
                className="fs-4 fw-bold mb-0 text-white"
                style={{ 
                  fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
                  letterSpacing: '0.5px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.textShadow = '0 4px 8px rgba(0,0,0,0.2)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.textShadow = '0 2px 4px rgba(0,0,0,0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Nawiri Empower Hub
              </h2>
              <div 
                className="text-green-100 fs-6 fw-light"
                style={{ 
                  marginTop: '-2px',
                  letterSpacing: '1px',
                  opacity: '0.9'
                }}
              >
                Empowering Communities
              </div>
            </div>
          </NavLink>

       
          {/* Desktop Navigation */}
          <nav className="d-none d-md-flex gap-3">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `fs-6 fw-medium transition-colors duration-200 ${
                    isActive
                      ? "text-green-100 border-bottom border-green-100"
                      : "text-white hover-text-green-100 hover-border-green-100"
                  }`
                }
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="d-block d-md-none text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`d-md-none ${
            isMenuOpen ? "d-block" : "d-none"
          } bg-green-600 border-top border-green-700 transition-all duration-300 ease-in-out`}
        >
          <nav className="d-flex flex-column py-3 gap-2 px-3">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `fs-6 fw-medium transition-colors duration-200 ${
                    isActive
                      ? "text-green-100"
                      : "text-white hover-text-green-100"
                  }`
                }
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
