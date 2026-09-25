import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Media from './pages/Media';
import GetInvolved from './pages/GetInvolved';
import Contact from './pages/Contact';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import TeamMembers from './pages/TeamMembers';

// Admin Portal pages & layout
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMediaUpload from './pages/admin/AdminMediaUpload';
import AdminLayout from './components/admin/AdminLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (wrapped in public Layout) */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/programs" element={<Layout><Programs /></Layout>} />
        <Route path="/programs/:id" element={<Layout><ProgramDetail /></Layout>} />
        <Route path="/media" element={<Layout><Media /></Layout>} />
        <Route path="/get-involved" element={<Layout><GetInvolved /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/events/:id" element={<Layout><EventDetail /></Layout>} />
        <Route path="/team" element={<Layout><TeamMembers /></Layout>} />

        {/* Admin Authentication Routes (Standalone) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* Admin Protected Routes (wrapped in AdminLayout) */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/media-upload"
          element={
            <AdminLayout>
              <AdminMediaUpload />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/upload"
          element={
            <AdminLayout>
              <AdminMediaUpload />
            </AdminLayout>
          }
        />
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        {/* Catch-all redirect to homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;