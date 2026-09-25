import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100 w-100 position-relative">
      <Header />
      <main className="flex-grow-1 w-100">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
