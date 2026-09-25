import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Heart, ArrowRight } from "lucide-react";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Media", href: "/media" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Contact", href: "/contact" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="header-sticky" ref={menuRef}>
      <div className="container-max px-3">
        <div className="d-flex justify-content-between align-items-center py-2 py-md-3">
          {/* Logo & Brand Name */}
          <NavLink 
            to="/" 
            className="d-flex align-items-center gap-2 gap-sm-3 text-decoration-none"
            aria-label="Nawiri Empower Hub Homepage"
          >
            <div className="position-relative flex-shrink-0">
              <img
                src="/images/nawiri_logo.png"
                alt="Nawiri Empower Hub Logo"
                className="rounded-circle"
                style={{ 
                  height: "44px", 
                  width: "44px",
                  objectFit: "cover",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  border: "2px solid #ecfdf5"
                }}
              />
            </div>

            <div>
              <span className="fs-5 fw-bold d-block text-dark lh-sm">
                Nawiri Empower Hub
              </span>
              <span className="text-success small fw-semibold d-none d-sm-block" style={{ letterSpacing: "0.5px" }}>
                Empowering Communities
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation (visible on lg and above) */}
          <nav className="d-none d-lg-flex align-items-center gap-1" aria-label="Main Navigation">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `nav-link-custom ${isActive ? "active" : ""}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button (visible below lg) */}
          <button
            className="mobile-toggle-btn d-lg-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="mobile-menu-wrapper d-lg-none rounded-bottom-4 px-3 py-3 mb-2">
            <nav className="d-flex flex-column gap-1" aria-label="Mobile Navigation">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `mobile-nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <span>{item.name}</span>
                  <ArrowRight size={16} className="opacity-50" />
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
