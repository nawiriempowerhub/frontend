import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/' },
    { name: 'Programs', href: '/programs' },
    { name: 'Media', href: '/media' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-green-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <NavLink to="/" className="flex items-center space-x-2">
            <img
              src="/nawiri-logo.png"
              alt="Nawiri Empower Hub Logo"
              className="h-10 w-auto"
              // onError={(e) => (e.target.src = 'https://via.placeholder.com/150x40?text=Nawiri+Logo')}
            />
            <span className="text-lg font-semibold hidden sm:inline">Nawiri Empower Hub</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-green-100 border-b-2 border-green-100'
                      : 'text-white hover:text-green-100 hover:border-b-2 hover:border-green-100'
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
            className="block md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-green-600 border-t border-green-700 transition-all duration-300 ease-in-out`}>
          <nav className="flex flex-col py-4 space-y-3 px-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-green-100' : 'text-white hover:text-green-100'
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