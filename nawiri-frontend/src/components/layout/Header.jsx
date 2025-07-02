import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import nawiriLogo from "../../assets/nawiri-logo.jpg"; // Adjust path as needed
import "./Header.css"; // 👈 External CSS (see below)

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Media", href: "/media" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white text-dark sticky-top shadow-sm border-bottom">
      <div className="container px-3">
        <div className="d-flex justify-content-between align-items-center py-3">
          <NavLink 
            to="/" 
            className="d-flex align-items-center gap-3 text-decoration-none"
            aria-label="Navigate to homepage"
          >
            <div className="position-relative">
              <img
                src={nawiriLogo}
                alt="Nawiri Empower Hub Logo"
                className="rounded-circle shadow-sm"
                style={{ 
                  height: "50px", 
                  width: "50px",
                  border: "3px solid #28a745",
                  objectFit: "cover",
                  transition: "all 0.3s ease",
                  filter: "brightness(1.1)"
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.boxShadow = "0 8px 25px rgba(40, 167, 69, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                }}
              />
              <div 
                className="position-absolute top-0 start-0 rounded-circle"
                style={{
                  height: "50px",
                  width: "50px",
                  background: "radial-gradient(circle, rgba(40, 167, 69, 0.1) 0%, transparent 70%)",
                  pointerEvents: "none"
                }}
              ></div>
            </div>

            <div className="d-none d-sm-block">
              <h2 
                className="fs-4 fw-bold mb-0 text-dark"
                style={{ 
                  fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
                  letterSpacing: "0.5px",
                  textShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.target.style.color = "#28a745";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "#212529";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Nawiri Empower Hub
              </h2>
              <div className="text-success fs-6 fw-medium" style={{ marginTop: "-2px", letterSpacing: "1px", opacity: "0.8" }}>
                Empowering Communities
              </div>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="d-none d-md-flex gap-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `nav-link-custom px-3 py-2 rounded-pill text-decoration-none position-relative ${isActive ? "active" : ""}`
                }
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="d-block d-md-none btn btn-outline-success border-0 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#28a745";
              e.target.style.color = "#ffffff";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#28a745";
              e.target.style.transform = "scale(1)";
            }}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ transition: "all 0.3s ease" }}
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
        <div className={`d-md-none ${isMenuOpen ? "menu-slide-down" : "d-none"} bg-light border-top`}>
          <nav className="d-flex flex-column py-3 gap-1 px-3">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `mobile-nav-link px-3 py-2 rounded text-decoration-none ${isActive ? "active" : ""}`
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
