import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
// Commented out imports for non-public features
// import { AdminAuthProvider } from './context/AdminAuthContext';
// import { UserAuthProvider } from './context/UserAuthContext';
// import AdminLayout from './components/admin/layout/AdminLayout';
// import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
// import UserProtectedRoute from './components/auth/ProtectedRoute';
// import LandingPage from './pages/LandingPage';
// import UserLogin from './pages/auth/UserLogin';
// import UserRegister from './pages/auth/UserRegister';
// import UserDashboard from './pages/UserDashboard';
// import AdminLogin from './pages/admin/AdminLogin';
// import AdminRegister from './pages/admin/AdminRegister';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (accessible to all) */}
        <Route path="/" element={
          <Layout>
            <About />
          </Layout>
        } />
        <Route path="/home" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <About />
          </Layout>
        } />
        <Route path="/programs" element={
          <Layout>
            <Programs />
          </Layout>
        } />
        <Route path="/programs/:id" element={
          <Layout>
            <ProgramDetail />
          </Layout>
        } />
        <Route path="/media" element={
          <Layout>
            <Media />
          </Layout>
        } />
        <Route path="/get-involved" element={
          <Layout>
            <GetInvolved />
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout>
            <Contact />
          </Layout>
        } />
        <Route path="/events" element={
          <Layout>
            <Events />
          </Layout>
        } />
         <Route path="/events/:id" element={
          <Layout>
            <EventDetail />
          </Layout>
          } />

        {/* Commented out non-public routes */}
        {/* Landing Page */}
        {/* <Route path="/" element={<LandingPage />} /> */}
        {/* User Authentication Routes */}
        {/* <Route path="/auth/login" element={<UserLogin />} /> */}
        {/* <Route path="/auth/register" element={<UserRegister />} /> */}
        {/* User Protected Routes */}
        {/* <Route path="/dashboard" element={
          <UserProtectedRoute>
            <UserDashboard />
          </UserProtectedRoute>
        } /> */}
        {/* Admin Routes */}
        {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
        {/* <Route path="/admin/register" element={<AdminRegister />} /> */}
        {/* <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        } /> */}
        {/* <Route path="/admin/*" element={
          <AdminProtectedRoute>
            <AdminLayout>
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Feature Coming Soon</h2>
                <p className="text-gray-600">This admin feature is currently under development.</p>
              </div>
            </AdminLayout>
          </AdminProtectedRoute>
        } /> */}
      </Routes>
    </Router>
  );
}

export default App;